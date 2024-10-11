// app/api/customer/[id]/route.js
import dbConnect from "../../../lib/db"; // Ensure this path is correct
import Customer from "../../../models/Customer"; // Ensure this path is correct

export async function GET(request, { params }) {
    await dbConnect(); // Ensure the DB is connected

    const { id } = params; // Get the customer ID from the URL params

    try {
        const customer = await Customer.findById(id); // Query the customer by ID
        if (!customer) {
            return new Response("Customer not found", { status: 404 });
        }
        return new Response(JSON.stringify(customer), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
