import { useEffect, useState } from "react";
import { USERS_API_URL } from "../assets/config";


const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    state: false,
    message: ''
  })
  const [error, setError] = useState(null);
  const fetchUserData = async() => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: 'loading users'
      })
     const response = await fetch(USERS_API_URL);
     if(!response.ok){
      const errorMessage = `Fetching users data failed: ${response.status}`;
      throw new Error(errorMessage)
     }
     const data = await response.json();
     setUsers(data);
    } catch (error) {
      setError(error)
    }finally{
      setLoading({
        ...loading,
        state: false,
        message: ''
      })
    }
  };
  useEffect(()=> {
    fetchUserData();
  },[])

  return {users, error, loading}
    
};

export default useUsers;