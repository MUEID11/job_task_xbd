import DetailsIcon from "../assets/detailsIcon";

export default function BasicTable({ users, onSmash }) {
  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border">ID</th>
            <th className="px-4 py-2 text-left border">Name</th>
            <th className="px-4 py-2 text-left border">Email</th>
            <th className="px-4 py-2 text-left border">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => onSmash(user)}
                  className="cursor-pointer"
                >
                  <DetailsIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
