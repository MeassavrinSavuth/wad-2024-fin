// app/home/page.js (Assuming this is where the Home component resides)
export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Fetch the product data
    const response = await fetch(`${API_BASE}/product/${params.id}`, { cache: "no-store" });

    // Check if the response is OK
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const product = await response.json();

    // Log the product data for debugging
    console.log({ product, category: product.category });

    return (
      <div className="m-4">
        <h1>Product</h1>
        <p className="font-bold text-xl text-blue-800">{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price} Baht</p>
        <p>Category: {product.category.name}</p>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return <div>Error fetching product data.</div>;
  }
}
