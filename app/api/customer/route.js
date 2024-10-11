import dbConnect from "../../../lib/db";
import Customer from "../../../models/Customer";

export async function GET(request) {
    await dbConnect();

    try {
        const customers = await Customer.find();
        return new Response(JSON.stringify(customers), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    
    const data = await request.json();

    try {
        const customer = new Customer(data);
        await customer.save();
        return new Response(JSON.stringify(customer), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
