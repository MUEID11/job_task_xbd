/* eslint-disable react/prop-types */
const Modal = ({ user, onClose, open }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <div>
            <strong>Address:</strong>
            <div className="ml-4 font-medium text-gray-700">
              <p>Street: {user?.address?.street}</p>
              <p>Suite: {user?.address?.suite}</p>
              <p>City: {user?.address?.city}</p>
              <p>Zipcode: {user?.address?.zipcode}</p>
            </div>
          </div>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`https://${user?.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user?.website}
            </a>
          </p>
          <div>
            <strong>Company:</strong>
            <div className="ml-4 font-medium text-gray-700">
              <p>Name: {user?.company?.name}</p>
              <p>CatchPhrase: {user?.company?.catchPhrase}</p>
              <p>BS: {user?.company?.bs}</p>
            </div>
          </div>
        </div>

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

export default Modal;
