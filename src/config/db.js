const mongoose = require('mongoose');


const connectDB = async () => {
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/task';
try {
await mongoose.connect(uri, {
serverSelectionTimeoutMS: 5000
});
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};


module.exports = connectDB;
