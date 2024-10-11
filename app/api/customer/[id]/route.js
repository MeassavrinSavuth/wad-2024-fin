// app/api/customer/[id]/route.js
const Customer = require('../../../../models/Customer');
import connectDB from '../../../../middleware/mongodb';

export const GET = async (request, { params }) => {
  await connectDB();
  const customer = await Customer.findById(params.id);
  return customer
    ? new Response(JSON.stringify(customer), { status: 200 })
    : new Response("Customer not found", { status: 404 });
};

export const PUT = async (request, { params }) => {
  await connectDB();
  const customerData = await request.json();
  const updatedCustomer = await Customer.findByIdAndUpdate(params.id, customerData, { new: true });
  return updatedCustomer
    ? new Response(JSON.stringify(updatedCustomer), { status: 200 })
    : new Response("Customer not found", { status: 404 });
};

export const DELETE = async (request, { params }) => {
  await connectDB();
  const deletedCustomer = await Customer.findByIdAndDelete(params.id);
  return deletedCustomer
    ? new Response("Customer deleted", { status: 200 })
    : new Response("Customer not found", { status: 404 });
};
