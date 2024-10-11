"use client";
import { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import Link from "next/link";

export default function CustomerPage() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Ensure this is set correctly
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, [refresh]);

    const fetchCustomers = async () => {
        const response = await fetch(`${API_BASE}/customer`);
        const data = await response.json();
        setCustomers(data);
    };

    const handleAddUpdateCustomer = async (data) => {
        if (selectedCustomer) {
            // Update existing customer
            await fetch(`${API_BASE}/customer/${selectedCustomer._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } else {
            // Add new customer
            await fetch(`${API_BASE}/customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }
        setSelectedCustomer(null); // Reset form
        setRefresh(prev => !prev); // Trigger refresh
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleDelete = async (id) => {
        await fetch(`${API_BASE}/customer/${id}`, {
            method: "DELETE",
        });
        setRefresh(prev => !prev); // Trigger refresh
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Customer Management</h1>
            <CustomerForm onSubmit={handleAddUpdateCustomer} initialData={selectedCustomer} />
            <h2 className="text-2xl font-bold mt-8 mb-4">Customer List</h2>
            <ul className="space-y-4">
                {customers.map(customer => (
                    <li key={customer._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                        <div>
                            <p className="font-bold">{customer.name}</p>
                            <p>{customer.dob.split('T')[0]}</p>
                            <p>Members #: {customer.memberNumber}</p>
                            <p>Interest: {customer.interest}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white py-1 px-2 rounded-md">Edit</button>
                            <button onClick={() => handleDelete(customer._id)} className="bg-red-600 text-white py-1 px-2 rounded-md">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
