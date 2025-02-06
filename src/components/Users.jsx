import { useState } from "react";
import { useUsers } from "../hooks";
import Loader from "./Loader";
import BasicTable from "./UsersTable";
import Modal from "./modal";

const Users = () => {
  const { users, loading, error } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  if (loading.state) {
    return <Loader />;
  }
  if (error) {
    return <div className="text-xl items-center">{error}</div>;
  }
  const handleOnClickUsers = (user) => {
    setSelectedUser(user)
    setShowModal(true);
  }
  return (
    <div className="m-2 p-4 space-y-4">
      <div className="text-xl font-bold">View users data:</div>
      <BasicTable users={users} onSmash={handleOnClickUsers} />
      {/* Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
