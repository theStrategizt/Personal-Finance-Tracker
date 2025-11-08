import React from "react";
import { X } from "lucide-react";

const TransactionForm = ({
  formData,
  setFormData,
  handleSubmit,
  setShowForm,
  editingId,
  categories,
}) => {
  // ✅ Default fallback to prevent undefined errors
  const defaultForm = {
    type: "income",
    amount: "",
    date: "",
    category: "",
    notes: "",
  };
  const safeFormData = formData || defaultForm;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {editingId ? "Edit Transaction" : "New Transaction"}
        </h2>
        <button
          onClick={() => setShowForm(false)}
          className="hover:bg-gray-100 p-2 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <select
          value={safeFormData.type}
          onChange={(e) =>
            setFormData({ ...safeFormData, type: e.target.value, category: "" })
          }
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={safeFormData.amount}
          onChange={(e) =>
            setFormData({ ...safeFormData, amount: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        />

        {/* Date */}
        <input
          type="date"
          value={safeFormData.date}
          onChange={(e) =>
            setFormData({ ...safeFormData, date: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        />

        {/* Category */}
        <select
          value={safeFormData.category}
          onChange={(e) =>
            setFormData({ ...safeFormData, category: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories?.[safeFormData.type]?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Notes */}
        <textarea
          value={safeFormData.notes}
          onChange={(e) =>
            setFormData({ ...safeFormData, notes: e.target.value })
          }
          placeholder="Notes (optional)"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 md:col-span-2"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition md:col-span-2"
        >
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
