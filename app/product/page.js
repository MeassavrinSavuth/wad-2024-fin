// app/home/page.js (or the relevant component for managing products)
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Make sure this is set in .env.local
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Function to start editing a product
  const startEdit = (product) => async () => {
    setEditMode(true);
    reset(product); // Reset the form with the product data
  };

  // Fetch products from the API
  async function fetchProducts() {
    try {
      const response = await fetch(`${API_BASE}/product`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const p = await response.json();
      const p2 = p.map((product) => {
        product.id = product._id; // Use _id as id for consistency
        return product;
      });
      setProducts(p2);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to fetch products');
    }
  }

  // Fetch categories from the API
  async function fetchCategories() {
    try {
      const response = await fetch(`${API_BASE}/category`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const c = await response.json();
      setCategories(c);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to fetch categories');
    }
  }

  // Create or update a product
  const createProductOrUpdate = async (data) => {
    try {
      if (editMode) {
        const response = await fetch(`${API_BASE}/product`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error(`Failed to update product: ${response.status}`);

        alert("Product updated successfully");
      } else {
        const response = await fetch(`${API_BASE}/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error(`Failed to add product: ${response.status}`);

        alert("Product added successfully");
      }

      reset({ code: "", name: "", description: "", price: "", category: "" });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Delete a product by ID
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`${API_BASE}/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Failed to delete product: ${response.status}`);

      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64">
          <form onSubmit={handleSubmit(createProductOrUpdate)}>
            <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
              <div>Code:</div>
              <div>
                <input
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Description:</div>
              <div>
                <textarea
                  name="description"
                  {...register("description", { required: false })}
                  className="border border-black w-full"
                />
              </div>
              <div>Price:</div>
              <div>
                <input
                  name="price" // Make sure this name is unique
                  type="number"
                  {...register("price", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Category:</div>
              <div>
                <select
                  name="category"
                  {...register("category", { required: true })}
                  className="border border-black w-full"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                {editMode ? (
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Add"
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                )}
                {editMode && (
                  <button
                    onClick={() => {
                      reset({ code: "", name: "", description: "", price: "", category: "" });
                      setEditMode(false);
                    }}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <h1 className="text-2xl">Products ({products.length})</h1>
          <ul className="list-disc ml-8">
            {products.map((p) => (
              <li key={p._id}>
                <button className="border border-black p-1/2" onClick={startEdit(p)}>
                  📝
                </button>{" "}
                <button className="border border-black p-1/2" onClick={deleteById(p._id)}>
                  ❌
                </button>{" "}
                <Link href={`/product/${p._id}`} className="font-bold">
                  {p.name}
                </Link>{" "}
                - {p.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
