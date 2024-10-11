// app/customer/CustomerForm.js
"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerForm({ onSubmit, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      dob: '',
      memberNumber: '',
      interest: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">
        {initialData ? "Update Customer" : "Add New Customer"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Member Number:</label>
          <input
            type="number"
            {...register("memberNumber", { required: "Member Number is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {errors.memberNumber && <span className="text-red-500">{errors.memberNumber.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interest:</label>
          <input
            type="text"
            {...register("interest")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
