// app/customer/page.js
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
    console.log("Form Data Submitted: ", data); // Log the submitted data
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
    setRefresh((prev) => !prev); // Trigger refresh
  };

  const handleDeleteCustomer = async (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await fetch(`${API_BASE}/customer/${id}`, {
        method: "DELETE",
      });
      setRefresh((prev) => !prev); // Trigger refresh
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Customer Management</h1>
      <CustomerForm onSubmit={handleAddUpdateCustomer} initialData={selectedCustomer} />
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Customer List</h2>
        <ul className="space-y-2">
          {customers.map((customer) => (
            <li key={customer._id} className="flex justify-between items-center p-2 border-b border-gray-200">
              <Link href={`/customer/${customer._id}`} className="text-blue-600 hover:underline">
                {customer.name}
              </Link>
              <div>
                <button
                  onClick={() => handleEditCustomer(customer)}
                  className="mr-2 text-yellow-500 hover:text-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
