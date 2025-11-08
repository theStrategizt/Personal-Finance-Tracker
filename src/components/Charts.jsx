import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#6366f1",
];

const Charts = ({ categoryData = [], monthlyData = [] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Monthly Overview */}
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-bold mb-4">Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#10b981" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Expense by Category */}
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-bold mb-4">Expense by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            outerRadius={80}
            label
            isAnimationActive={false}
          >
            {(categoryData ?? []).map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Charts;
