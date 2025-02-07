import { useState } from "react";

const ProductModal = ({ onClose, open, onSubmit }) => {
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    data: {
      color: "",
      capacity: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => {
      if (name === "name") {
        return { ...prevData, name: value };
      } else if (name === "color") {
        return { ...prevData, data: { ...prevData.data, color: value } };
      } else if (name === "capacity") {
        return { ...prevData, data: { ...prevData.data, capacity: value } };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a random UID using crypto.randomUUID()
    const id = crypto.randomUUID();
    const newProduct = { ...productData, id }; // Add the ID to the product data

    // POST request to the API
    try {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      // Handle success
      const data = await response.json();
      alert("Data added successfully");
      onSubmit(data); // Pass the created product back to the parent to show the data on UI
      onClose(); // Close modal after submitting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold mb-4">Submit New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="product-name">
              Product Name
            </label>
            <input
              id="product-name"
              name="name"
              type="text"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="product-color">
              Color
            </label>
            <input
              id="product-color"
              name="color"
              type="text"
              value={productData.data.color}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label
              className="block font-medium mb-1"
              htmlFor="product-capacity"
            >
              Capacity
            </label>
            <input
              id="product-capacity"
              name="capacity"
              type="text"
              value={productData.data.capacity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>
        </form>

        <button
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
