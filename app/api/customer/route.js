// app/api/customer/[id]/route.js

import Customer from "@/models/Customer"; // Adjust this import based on your model location

export async function GET(request, { params }) {
  const { id } = params; // Extract the customer ID from the route parameters

  try {
    const customer = await Customer.findById(id); // Find customer by ID
    if (!customer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 }); // Return customer data
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching customer" }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params; // Extract the customer ID from the route parameters
  const body = await request.json();

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
    if (!updatedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedCustomer), { status: 200 }); // Return updated customer
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating customer" }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params; // Extract the customer ID from the route parameters

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
    }
    return new Response(null, { status: 204 }); // No content to return on successful deletion
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting customer" }), { status: 500 });
  }
}
