import React from "react";
import { PlusCircle, Download, DollarSign } from "lucide-react";

const Header = ({ onAddTransaction, onExport, onManageCategories }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <DollarSign className="w-8 h-8 text-indigo-600" />
      <h1 className="text-3xl font-bold text-gray-800">
        Personal Finance Tracker
      </h1>
    </div>
    <div className="flex gap-3">
      <button
        onClick={onManageCategories}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Manage Categories
      </button>
      <button
        onClick={onExport}
        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
      >
        <Download className="w-4 h-4" /> Export CSV
      </button>
      <button
        onClick={onAddTransaction}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" /> Add Transaction
      </button>
    </div>
  </div>
);

export default Header;
