const Lead = require('../models/Lead');
const paginate = require('../utils/pagination');



exports.createLead = async (req, res, next) => {
  try {
    const payload = req.body;
    const lastLead = await Lead.findOne().sort({ leadId: -1 });
    payload.leadId = lastLead ? lastLead.leadId + 1 : 1;

    const lead = await Lead.create(payload);
    return res.status(201).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.getLead = async (req, res, next) => {
  try {
    const leadId = Number(req.params.id); // convert to number
    if (isNaN(leadId)) return res.status(400).json({ success: false, message: 'Invalid leadId' });

    const lead = await Lead.findOne({ leadId });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    return res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};
exports.updateLead = async (req, res, next) => {
  try {
    const leadId = Number(req.params.id);
    const lead = await Lead.findOneAndUpdate({ leadId }, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    return res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const leadId = Number(req.params.id);
    const lead = await Lead.findOneAndDelete({ leadId });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    return res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    next(err);
  }
};


exports.listLeads = async (req, res, next) => {
try {
const { page = 1, limit = 10, q, status, source } = req.query;


const filter = {};
if (status) filter.status = status;
if (source) filter.source = source;
if (q) {
filter.$or = [
{ firstName: new RegExp(q, 'i') },
{ lastName: new RegExp(q, 'i') },
{ email: new RegExp(q, 'i') },
{ phone: new RegExp(q, 'i') }
];
}


const total = await Lead.countDocuments(filter);
const leads = await Lead.find(filter)
.sort({ createdAt: -1 })
.skip((page - 1) * limit)
.limit(Number(limit));


const meta = paginate(Number(page), Number(limit), total);


return res.json({ success: true, data: leads, meta });
} catch (err) {
next(err);
}
};