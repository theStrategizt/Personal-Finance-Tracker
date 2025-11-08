import React from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const SummaryCards = ({ totalIncome, totalExpense, balance }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-5 text-white">
      <div className="flex justify-between mb-2">
        <span>Total Income</span>
        <TrendingUp />
      </div>
      <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
    </div>
    <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-5 text-white">
      <div className="flex justify-between mb-2">
        <span>Total Expense</span>
        <TrendingDown />
      </div>
      <p className="text-3xl font-bold">${totalExpense.toFixed(2)}</p>
    </div>
    <div
      className={`bg-gradient-to-br ${
        balance >= 0
          ? "from-blue-400 to-blue-600"
          : "from-orange-400 to-orange-600"
      } rounded-xl p-5 text-white`}
    >
      <div className="flex justify-between mb-2">
        <span>Balance</span>
        <DollarSign />
      </div>
      <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
    </div>
  </div>
);

export default SummaryCards;
