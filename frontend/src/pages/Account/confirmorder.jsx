import { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import PricingDetails from "../../components/PricingDetails";
import ErrorMessage from "../../components/ErrorMessage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [myData, setMyData] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [vehicleType, setVehicleType] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("myData");
    if (!storedData) {
      navigate("*");
    } else {
      setMyData(JSON.parse(storedData));
    }
  }, [navigate]);

  if (!myData) {
    return <div>Loading...</div>;
  }

  const handleVehicleType = (selectedVehicle) => {
    setVehicleType(selectedVehicle);
    // console.log(selectedVehicle);
  };

  const handleConfirm = async () => {
    try {
      // Convert price to cents as Stripe expects amounts in smallest currency unit
      const amountInCents = Math.round(price * 100);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`,
        {
          items: [
            {
              id: "delivery-service",
              amount: amountInCents,
            },
          ],
        }
      );

      setClientSecret(response.data.clientSecret);
      setShowPayment(true);

      //Create Order in Database while payment is processing
      await addDoc(collection(db, "orders"), {
        ...myData,
        price: price,
        distance: distance.toFixed(2),
        duration: duration.toFixed(2),
        userId: !user ? "Guest" : user?.uid,
        vehicleType: vehicleType,
        paymentId: null,
      });
      // console.log("Order created successfully!", user?.uid || "Guest");
      //remove stored data
      // sessionStorage.removeItem("myData");
    } catch (err) {
      setError("Failed to initialize payment. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.error("Payment initialization error:", err);
    }
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#10B981",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {showPayment ? "Complete Payment" : "Check Out"}
          </h1>

          {showPayment && clientSecret ? (
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
              <Elements
                options={{ clientSecret, appearance }}
                stripe={stripePromise}
              >
                <CheckoutForm />
              </Elements>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2">Pickup Information</h2>
                  <p>
                    <span className="font-semibold">Sender:</span>{" "}
                    {myData.sender}
                  </p>
                  <p>
                    <span className="font-semibold">Sender Phone:</span>{" "}
                    {myData.senderPhone}
                  </p>
                  <p>
                    <span className="font-semibold">Sender Address:</span>{" "}
                    {myData.pickupAddress.address1},{" "}
                    {myData.pickupAddress.address2}
                  </p>
                  <p>
                    {myData.pickupAddress.city}, {myData.pickupAddress.province}{" "}
                    {myData.pickupAddress.postalCode}
                  </p>
                  <p>{myData.pickupAddress.country}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-700">
                    Delivery Information
                  </h2>
                  <p>
                    <span className="font-semibold">Receiver:</span>{" "}
                    {myData.receiver}
                  </p>
                  <p>
                    <span className="font-semibold">Receiver Phone:</span>{" "}
                    {myData.receiverPhone}
                  </p>
                  <p>
                    <span className="font-semibold">Receiver Address:</span>{" "}
                    {myData.deliveryAddress.address1},{" "}
                    {myData.deliveryAddress.address2}
                  </p>
                  <p>
                    {myData.deliveryAddress.city},{" "}
                    {myData.deliveryAddress.province}{" "}
                    {myData.deliveryAddress.postalCode}
                  </p>
                  <p>{myData.deliveryAddress.country}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-700">
                    Shipping Details
                  </h2>
                  <p>
                    <span className="font-semibold">Item:</span>{" "}
                    {myData.shippingItem}
                  </p>
                  <p>
                    <span className="font-semibold">Weight:</span>{" "}
                    {myData.shippingWeight} kg
                  </p>
                  <p>
                    <span className="font-semibold">No. of packages:</span>{" "}
                    {myData.numberOfItems}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping Date:</span>{" "}
                    {myData.shippingDate}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping Note:</span>{" "}
                    {myData.shippingNote}
                  </p>
                  <p>
                    <span className="font-semibold">Peak Hour:</span>{" "}
                    {myData.isPeak ? "Yes" : "No"}
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-700">
                    Order Created At
                  </h2>
                  <p>
                    {moment(myData.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded">
                <PricingDetails
                  pickupAddress={myData.pickupAddress}
                  deliveryAddress={myData.deliveryAddress}
                  setDeliveryMethod={handleVehicleType}
                  // vehicleType={myData.vehicleType}
                  // setSelectedVehicle={setSelectedVehicle}
                  // combineDeliveries={myData.combineDeliveries}
                  isPeak={myData.isPeak}
                  itemWeight={myData.shippingWeight}
                  setDistance={setDistance}
                  setDuration={setDuration}
                  setPrice={setPrice}
                />
                <div className="flex justify-center mb-4">
                  {price ? (
                    <Button
                      type="button"
                      onClick={handleConfirm}
                      className="w-full bg-green-500 text-white mx-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Proceed to Payment
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

                {error && <ErrorMessage message={error} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
