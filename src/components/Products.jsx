import { useEffect,  useState } from "react";
import { PRODUCTS_API_BASE_URL } from "../assets/config";
import { useApi } from "../hooks";

import Loader from "./Loader";
import ReusableTable from "./ReuseableTable";

const Products = () => {
  const { data: products, loading, error } = useApi(PRODUCTS_API_BASE_URL);
  
  //this part is unnecessary if the api allowed "DELETE method"
  const [localProducts, setLocalProducts] = useState([]);
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
  const handleDelete = async(item) => {
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
      setLocalProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== item.id)
      );
      
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product');
    }
  }
  const productColumn = [
    {key: "product", header:"Product Name",
      render: (item) => item?.name
    },
    {key: "color", header:'Color',
      render: (item) => item?.data?.color || "N/A"
    },
    {key: 'storage', header:'Storage', render:(item) =>item?.data?.storage || 'N/A'},
    {key: 'itemActions', header: 'Delete',
      render: (item) =>
        <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 cursor-pointer" onClick={() => handleDelete(item)}>
          Delete
        </button>
      
    }
  ]
  return (
    <div>
      <div>section for title, sort, search</div>
      <div>
        <ReusableTable data={localProducts} columns={productColumn}  />
      </div>
    </div>
  );
};

export default Products;
