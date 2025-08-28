import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bike, Battery, Car } from "lucide-react";
import {MetricCard} from "../../components/ui/metriccard";

const orders = [
  {
    id: 1,
    customer: "John Doe",
    status: "Delivered",
    deliveryMethod: "bike",
    pickupAddress: "123 Green St",
    deliveryAddress: "456 Eco Rd",
    amount: 25.0,
    ecoFriendlyScore: 10,
  },
  {
    id: 2,
    customer: "John Doe",
    status: "Pending",
    deliveryMethod: "ebike",
    pickupAddress: "789 Solar Ave",
    deliveryAddress: "321 Windy Ln",
    amount: 30.0,
    ecoFriendlyScore: 5,
  },
  {
    id: 3,
    customer: "John Doe",
    status: "Delivered",
    deliveryMethod: "bike",
    pickupAddress: "101 Tree Blvd",
    deliveryAddress: "202 Leafy Lane",
    amount: 20.0,
    ecoFriendlyScore: 10,
  },
  {
    id: 4,
    customer: "John Doe",
    status: "Cancelled",
    deliveryMethod: "evehicle",
    pickupAddress: "303 River Rd",
    deliveryAddress: "404 Lakeside Dr",
    amount: 15.0,
    ecoFriendlyScore: 5,
  },
];

const MyImpactDashboard = () => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const averageEcoScore =
    orders.reduce((sum, order) => sum + order.ecoFriendlyScore, 0) /
    totalOrders;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const deliveryMethodCounts = orders.reduce((acc, order) => {
    acc[order.deliveryMethod] = (acc[order.deliveryMethod] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(deliveryMethodCounts).map(
    ([method, count]) => ({
      method,
      count,
    })
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-green-600">
          Environmental Impact Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Orders" value={totalOrders} />
          <MetricCard title="Completed Orders" value={completedOrders} />
          <MetricCard
            title="Average Eco Score"
            value={averageEcoScore.toFixed(2)}
          />
          <MetricCard
            title="Total Spend"
            value={`$${totalRevenue.toFixed(2)}`}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Delivery Methods</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold p-6">Recent Orders</h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Eco Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.deliveryMethod === "bike" ? (
                      <Bike
                        className="inline-block mr-2 text-green-500"
                        size={20}
                      />
                    ) : order.deliveryMethod === "ebike" ? (
                      <Battery
                        className="inline-block mr-2 text-blue-500"
                        size={20}
                      />
                    ) : (
                      <Car
                        className="inline-block mr-2 text-red-500"
                        size={20}
                      />
                    )}
                    {order.deliveryMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${order.ecoFriendlyScore * 10}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {order.ecoFriendlyScore}/10
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default MyImpactDashboard;
