// app/customer/[id]/page.js
import dbConnect from "../../../lib/db"; // Ensure this path is correct
import Customer from "../../../models/Customer"; // Ensure this path is correct

async function getCustomerById(id) {
    await dbConnect(); // Ensure the DB is connected
    const customer = await Customer.findById(id);
    return customer;
}

export default async function CustomerPage({ params }) {
    const { id } = params; // Get the customer ID from the URL params
    const customer = await getCustomerById(id);

    if (!customer) {
        return <div>Customer not found</div>; // Handle not found
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{customer.name}</h1>
            <p>Date of Birth: {new Date(customer.dob).toLocaleDateString()}</p>
            <p>Member Number: {customer.memberNumber}</p>
            <p>Interest: {customer.interest}</p>
            {/* Add any additional customer details you need */}
        </div>
    );
}
