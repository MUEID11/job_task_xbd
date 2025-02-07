import { useState } from "react";

import Loader from "./Loader";

import Modal from './Modal'
import { useApi } from "../hooks";
import { USERS_API_URL } from "../assets/config";
import ReusableTable from "./ReuseableTable";

const Users = () => {
  const { data: users, loading, error } = useApi(USERS_API_URL);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  if (loading.state) {
    return <Loader />;
  }
  if (error) {
    return <div className="text-xl items-center">{error}</div>;
  }
  const handleOnClickUsers = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "address.city",
      header: "City",
      render: (user) => user?.address?.city || "N/A",
    },
    {
      key: "actions",
      header: "User Details",
      render: (user) => (
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 cursor-pointer"
          onClick={() => handleOnClickUsers(user)}
        >
          View Details
        </button>
      ),
    },
  ];
  return (
    <div className="m-2 p-4 space-y-4 ">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the User Page</h1>
      <div className="text-xl font-bold">
        View users data:
        
      </div>
      {/* <BasicTable users={users} onSmash={handleOnClickUsers} /> */}
      <ReusableTable
        data={users}
        columns={userColumns}
        // actions={handleOnClickUsers}
      />
      {/* Modal */}
      <Modal 
      open={showModal}
      onClose={() => setShowModal(false)}
      user={selectedUser}/>
    </div>
  );
};

export default Users;
