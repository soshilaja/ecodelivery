import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  // getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";
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
import {
  AlertCircle,
  Package,
  Truck,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import PropTypes from "prop-types";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    activeDrivers: 0,
    totalRevenue: 0,
    pendingDeliveries: 0,
    completedDeliveries: 0,
  });
  const [deliveryTrends, setDeliveryTrends] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ordersPerPage = 5;

  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);

  useEffect(() => {
    // Set up real-time listeners
    const unsubscribeOrders = setupOrdersListener();
    const unsubscribeDrivers = setupDriversListener();

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeOrders();
      unsubscribeDrivers();
    };
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    const filteredOrders = allOrders.filter((order) =>
      Object.values(order).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Update displayed orders based on current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    setDisplayedOrders(
      filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    );
  }, [searchTerm, currentPage, allOrders]);

  // const fetchDashboardData = async () => {
  //   try {
  //     const ordersQuery = query(
  //       collection(db, "orders"),
  //       orderBy("createdAt", "desc")
  //     );
  //     const ordersSnapshot = await getDocs(ordersQuery);

  //     let revenue = 0;
  //     const orders = [];
  //     ordersSnapshot.forEach((doc) => {
  //       const order = { id: doc.id, ...doc.data() };
  //       revenue += order.price;
  //       orders.push(order);
  //     });

  //     const driversQuery = query(
  //       collection(db, "drivers"),
  //       where("status", "==", "Online")
  //     );
  //     const driversSnapshot = await getDocs(driversQuery);
      
  //     setAllOrders(orders);
      
      
  //     setDisplayedOrders(orders.slice(0, ordersPerPage));
      
  //     setMetrics({
  //       totalOrders: ordersSnapshot.size,
  //       activeDrivers: driversSnapshot.size,
  //       totalRevenue: revenue,
  //       pendingDeliveries: orders.filter((o) => o.status === "pending").length,
  //       completedDeliveries: orders.filter((o) => o.status === "completed").length,
  //     });
  //     const trends = prepareTrendsData(orders);
  //     setDeliveryTrends(trends);
  //   } catch (error) {
  //     console.error("Error fetching dashboard data:", error);
  //   }
  // };

    const setupOrdersListener = () => {
      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      return onSnapshot(
        ordersQuery,
        (snapshot) => {
          let revenue = 0;
          const orders = [];

          snapshot.forEach((doc) => {
            const order = { id: doc.id, ...doc.data() };
            revenue += order.price;
            orders.push(order);
          });

          setAllOrders(orders);
          setMetrics((prev) => ({
            ...prev,
            totalOrders: snapshot.size,
            totalRevenue: revenue,
            pendingDeliveries: orders.filter((o) => o.status === "pending")
              .length,
            completedDeliveries: orders.filter((o) => o.status === "completed")
              .length,
          }));

          const trends = prepareTrendsData(orders);
          setDeliveryTrends(trends);
        },
        (error) => {
          console.error("Error setting up orders listener:", error);
        }
      );
    };

    const setupDriversListener = () => {
      const driversQuery = query(
        collection(db, "drivers"),
        where("status", "==", "Online")
      );

      return onSnapshot(
        driversQuery,
        (snapshot) => {
          setMetrics((prev) => ({
            ...prev,
            activeDrivers: snapshot.size,
          }));
        },
        (error) => {
          console.error("Error setting up drivers listener:", error);
        }
      );
    };

  const prepareTrendsData = (orders) => {
    const last7Days = [...Array(90)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
      .reverse();

    return last7Days.map((date) => ({
      date,
      orders: orders.filter(
        (order) =>
          new Date(order.createdAt).toISOString().split("T")[0] === date
      ).length,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const totalPages = Math.ceil(
    allOrders.filter((order) =>
      Object.values(order).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).length / ordersPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-2 space-y-2 h-screen bg-gray-50">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders}
          icon={<Package className="h-6 w-6" />}
          color="text-blue-600"
        />
        <MetricCard
          title="Active Drivers"
          value={metrics.activeDrivers}
          icon={<Users className="h-6 w-6" />}
          color="text-green-600"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon={<AlertCircle className="h-6 w-6" />}
          color="text-purple-600"
        />
        <MetricCard
          title="Pending Deliveries"
          value={metrics.pendingDeliveries}
          icon={<Truck className="h-6 w-6" />}
          color="text-orange-600"
        />
        <MetricCard
          title="Completed Deliveries"
          value={metrics.completedDeliveries}
          icon={<Star className="h-6 w-6" />}
          color="text-orange-600"
        />
      </div>

      {/* Delivery Trends Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Order Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deliveryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-64 p-2 border border-gray-300"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender e-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(order.createdAt).toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.senderEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.paymentId || "Payment pending"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.driverId
                      || "Unassigned"
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center justify-end space-x-2">
            <button
              // variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              {/* Previous */}
            </button>
            <button
              // variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {/* Next */}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className={`${color} mr-4`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default Dashboard;