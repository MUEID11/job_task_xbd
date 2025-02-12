import { useEffect, useState } from "react";
import { PRODUCTS_API_BASE_URL } from "../assets/config";
import { useApi } from "../hooks";

import Loader from "./Loader";
import ReusableTable from "./ReuseableTable";
import useDebounce from "../assets/useDebounce";
import ProductModal from "./ProductModal";
import { sortProducts } from "../assets/utils";

const Products = () => {
  const { data: products, loading, error } = useApi(PRODUCTS_API_BASE_URL);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
    }
  }, [products]);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleAddProduct = (newProduct) => {
    setLocalProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  //this part is unnecessary if the api allowed "DELETE method"
  const [localProducts, setLocalProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilter = useDebounce((term) => {
    if (term.trim() === "") {
      setLocalProducts(products);
    } else {
      const filteredItems = products.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setLocalProducts(filteredItems);
    }
  }, 500);

  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
    }
  }, [products]);

  if (loading?.state) {
    return <Loader />;
  }
  if (error) {
    return <div>Error component</div>;
  }
  const handleDelete = async (item) => {
    try {
      // DELETE METHOD IS NOT ALLOWED THAT'S WHY THIS PART IS COMMENTED
      // const response = await fetch(`https://api.restful-api.dev/objects/${item.id}`, {
      //   method: 'DELETE',
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to delete the product');
      // }

      // deletion is unsuccessful, because the api doesn't allow the "DELETE METHOD"
      //locally data fetched and deletion applied
      if (confirm(`are you sure you want to delete?`)) {
        setLocalProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== item.id)
        );
      } else {
        console.log("Cancel delete");
      }
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product");
    }
  };

  const handleSort = (e) => {
    const order = e.target.value;
    const sortedProducts = sortProducts(products, order);
    setLocalProducts(sortedProducts);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
    console.log(searchTerm);
  };

  //dynamic columns for data loading though it makes the code hard to read I just tried it out

  const productColumn = [
    { key: "name", header: "Name" },
    {
      key: "color",
      header: "Color",
      render: (item) => item?.data?.color || "N/A",
    },
    {
      key: "storage",
      header: "Storage",
      render: (item) => item?.data?.capacity || item?.data?.Capacity || "N/A",
    },
    {
      key: "itemActions",
      header: "Delete",
      render: (item) => (
        <button
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 cursor-pointer"
          onClick={() => handleDelete(item)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">
        Welcome to the Products Page
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-8 w-36 rounded-md bg-yellow-500 py-2 text-white cursor-pointer"
      >
        + New Product
      </button>
      {/* modal */}
      <ProductModal
        onClose={handleClose}
        open={showModal}
        onSubmit={handleAddProduct}
      />
      <div className="flex justify-around sm:justify-between items-center sm:mr-12 w-full space-x-4">
        <div className="flex items-center rounded-lg sm:text-sm lg:font-semibold p-1">
          <label className="mr-4">Search Products:</label>
          <input
            type="text"
            placeholder="Search product"
            onChange={handleInputChange}
            className="w-32 sm:w-60 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="text-sm lg:font-semibold p-1">
          <label className=" mr-4">Sort Products:</label>
          <select name="Sort by name" id="sorter" onChange={handleSort}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div>
        <ReusableTable data={localProducts} columns={productColumn} />
      </div>
    </div>
  );
};

export default Products;
