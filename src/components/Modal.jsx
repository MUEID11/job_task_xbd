const Modal = ({user, onClose,open}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-transparent  bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p className="mb-2">
          <strong>Name:</strong> {user?.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="mb-2">
          <strong>UserName:</strong> {user?.username}
        </p>
          <p className="mb-2"><strong>Address:</strong></p>
          <div className="ml-2 font-medium">
          <p>Street: {user?.address?.street}</p>
          <p>Suite: {user?.address?.suite}</p>
          <p>City: {user?.address?.city}</p>
          <p>Zipcode: {user?.address?.zipcode}</p>
          </div>
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;