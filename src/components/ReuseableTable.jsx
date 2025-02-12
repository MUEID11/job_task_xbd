/* eslint-disable react/prop-types */
const ReusableTable = ({ data, columns }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border-b-2 p-2 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item?.id}
              className="hover:bg-gray-100 border-b border-gray-300"
            >
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {col.render ? col.render(item) : item[col.key.split(".")[0]]}
                </td>
              ))}
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
};

export default ReusableTable;
