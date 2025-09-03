const Lead = require('../models/Lead');
const paginate = require('../utils/pagination');


// Create lead
exports.createLead = async (req, res, next) => {
try {
const payload = req.body;
const lead = await Lead.create(payload);
return res.status(201).json({ success: true, data: lead });
} catch (err) {
next(err);
}
};
// Get single lead
exports.getLead = async (req, res, next) => {
try {
const lead = await Lead.findById(req.params.id);
if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
return res.json({ success: true, data: lead });
} catch (err) {
next(err);
}
};


// Update lead
exports.updateLead = async (req, res, next) => {
try {
const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
return res.json({ success: true, data: lead });
} catch (err) {
next(err);
}
};


// Delete lead
exports.deleteLead = async (req, res, next) => {
try {
const lead = await Lead.findByIdAndDelete(req.params.id);
if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
return res.json({ success: true, message: 'Lead deleted' });
} catch (err) {
next(err);
}
};


// List leads with filtering & pagination
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