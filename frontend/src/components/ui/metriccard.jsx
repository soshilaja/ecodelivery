import React from "react";

export const MetricCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <p className="text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);


