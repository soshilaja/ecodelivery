import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useGoogleMapsApi } from "../../hooks/useGoogleMaps";

const EcoDeliveryDashboard = () => {
  const { isLoaded, loadError } = useGoogleMapsApi();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [ecoScore, setEcoScore] = useState(0);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && !loadError) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 44.6488, lng: -63.5752 },
        zoom: 11,
        mapId: "51063b86a2139060",
      });
      setMap(mapInstance);
    }
  }, [isLoaded, loadError]);

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve({ lat, lng });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    if (map && orders.length > 0) {
      orders.forEach(async (order) => {
        try {
          const pickupCoords = await geocodeAddress(order.pickupAddress);
          const deliveryCoords = await geocodeAddress(order.deliveryAddress);

          new window.google.maps.Marker({
            position: pickupCoords,
            map: map,
            title: `Pickup: ${order.pickupAddress}`,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          });

          new window.google.maps.Marker({
            position: deliveryCoords,
            map: map,
            title: `Delivery: ${order.deliveryAddress}`,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          });
        } catch (error) {
          console.error("Error placing markers:", error);
        }
      });
    }
  }, [map, orders]);

  const handleOrderSelect = async (order) => {
    setSelectedOrder(order);
    if (map) {
      const deliveryCoords = await geocodeAddress(order.deliveryAddress);
      map.setCenter(deliveryCoords);
      map.setZoom(14);
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const carbonData = {
    labels: ["This Week", "This Month", "This Year"],
    datasets: [
      {
        label: "Carbon Saved (kg)",
        data: [50, 200, 2400],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">
            Eco-Friendly Delivery Dashboard
          </h1>
          <Link to="/account/order">
            <Button type="submit" className="w-full sm:w-auto">
              Place A New Order
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="w-full">
            <CardHeader className="text-lg font-semibold">
              Active Orders
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    onClick={() => handleOrderSelect(order)}
                    className="cursor-pointer hover:bg-gray-100 p-3 transition-colors"
                  >
                    {order.id} - {order.status}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div
            ref={mapRef}
            className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden"
          ></div>

          <Card className="w-full">
            <CardHeader className="text-lg font-semibold">
              Order Details
            </CardHeader>
            <CardContent>
              {selectedOrder ? (
                <div className="space-y-2">
                  <p>
                    <strong>Order ID:</strong> {selectedOrder.id}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Customer:</strong> {selectedOrder.customer}
                  </p>
                  <p className="break-words">
                    <strong>Pickup:</strong> {selectedOrder.pickupAddress}
                  </p>
                  <p className="break-words">
                    <strong>Delivery:</strong> {selectedOrder.deliveryAddress}
                  </p>
                  <p>
                    <strong>Delivery Method:</strong>{" "}
                    {selectedOrder.deliveryMethod}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${selectedOrder.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Eco-Score:</strong> {selectedOrder.ecoFriendlyScore}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Select an order to view details
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="text-lg font-semibold">
              Carbon Footprint Impact
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <Bar
                  data={carbonData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="font-bold">
                  Total Carbon Saved: {carbonSaved} kg
                </p>
                <p className="font-bold">
                  Total Eco-Friendly Score: {ecoScore}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoDeliveryDashboard;
