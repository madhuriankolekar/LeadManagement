const mongoose = require('mongoose');


const LeadSchema = new mongoose.Schema(
{
firstName: { type: String, required: true, trim: true },
lastName: { type: String, trim: true },
email: { type: String, required: true, lowercase: true, trim: true },
phone: { type: String, trim: true },
source: { type: String, enum: ['Website', 'Referral', 'Cold Call', 'Other'], default: 'Website' },
status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
notes: { type: String },
UTM: { type: Object },
createdAt: { type: Date, default: Date.now }
},
{ timestamps: true }
);


module.exports = mongoose.model('Lead', LeadSchema);