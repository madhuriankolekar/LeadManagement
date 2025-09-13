const Joi = require('joi');

const leadSchema = Joi.object({
  leadId: Joi.number().integer().positive().optional(),
  firstName: Joi.string().trim().min(1).max(80).required(),
  lastName: Joi.string().trim().max(80).allow('', null),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().allow('', null),
  source: Joi.string().valid('Website', 'Referral', 'Cold Call', 'Other').optional(),
  status: Joi.string().valid('New', 'Contacted', 'Qualified', 'Lost').optional(),
  notes: Joi.string().allow('', null),
  UTM: Joi.object().optional()
});

exports.validateLead = (req, res, next) => {
  const { error } = leadSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const details = error.details.map(d => ({ message: d.message, path: d.path }));
    return res.status(400).json({ success: false, errors: details });
  }
  next();
};
