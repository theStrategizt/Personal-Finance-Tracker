import React from "react";

const TransactionList = ({ filteredTransactions, onEdit, onDelete }) => {
  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Type</th>
            <th className="px-4 py-3 text-left font-semibold">Category</th>
            <th className="px-4 py-3 text-left font-semibold">Amount</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
            <th className="px-4 py-3 text-left font-semibold">Date</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr
              key={t.id}
              className={`border-b hover:bg-gray-50 transition ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              <td className="px-4 py-2 capitalize">{t.type}</td>
              <td className="px-4 py-2">{t.category}</td>
              <td className="px-4 py-2 font-semibold">₦{t.amount}</td>
              <td className="px-4 py-2">{t.description}</td>
              <td className="px-4 py-2">{t.date}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(t.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
