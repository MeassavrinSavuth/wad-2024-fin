import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    memberNumber: {
        type: Number,
        required: true,
    },
    interest: String,
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
