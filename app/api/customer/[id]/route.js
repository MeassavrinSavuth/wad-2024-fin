import dbConnect from "../../../lib/db";
import Customer from "../../../models/Customer";

export async function GET(request, { params }) {
    await dbConnect();
    
    const { id } = params;

    try {
        const customer = await Customer.findById(id);
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

export async function PUT(request, { params }) {
    await dbConnect();
    
    const { id } = params;
    const data = await request.json();

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCustomer) {
            return new Response("Customer not found", { status: 404 });
        }
        return new Response(JSON.stringify(updatedCustomer), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    
    const { id } = params;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return new Response("Customer not found", { status: 404 });
        }
        return new Response("Customer deleted", { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
