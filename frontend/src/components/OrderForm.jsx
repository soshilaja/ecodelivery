// src/components/OrderForm.js
import { useState, useEffect } from "react";
import PickupInfo from "./PickupInfo";
import ShippingInfo from "./ShippingInfo";
import DeliveryDetails from "./DeliveryDetails";
import { Button } from "./ui/button";
import { getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  // Pickup Address State
  const [sender, setSender] = useState("");
  const [senderEmail, setSenderEmail] = useState(user?.email || "");
  const [senderPhone, setSenderPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    error: "",
  });
  const [pickupAddress2, setPickupAddress2] = useState("");

  // Shipping Address State
  const [receiver, setReceiver] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [shipAddress, setShipAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    error: "",
  });
  const [shipAddress2, setShipAddress2] = useState("");

  // Delivery Details State
  // const [deliveryMethod, setDeliveryMethod] = useState("bike");
  const [deliveryItem, setDeliveryItem] = useState("");
  const [itemWeight, setItemWeight] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [shipDate, setShipDate] = useState();
  const [deliveryNote, setDeliveryNote] = useState("");

  // Pricing State
  // const [combineDeliveries, setCombineDeliveries] = useState(false);
  const [isPeak, setIsPeak] = useState(false);

  // Error Handling
  const [error, setError] = useState({});

  const navigate = useNavigate();

  // Determine if current time is peak hours
  const determinePeakHours = () => {
    const currentHour = new Date().getHours();
    // Peak hours: 7 AM - 10 AM and 5 PM - 8 PM
    return (
      (currentHour >= 7 && currentHour < 10) ||
      (currentHour >= 17 && currentHour < 20)
    );
  };

  useEffect(() => {
    setIsPeak(determinePeakHours());
  }, []);


   const validateForm = () => {
     const newErrors = {};

     if (!sender) newErrors.sender = "Sender Name is required";
     if (!senderEmail) newErrors.senderEmail = "Sender Email is required";
     if (senderPhone.length <= 2) newErrors.senderPhone = "Sender Phone is required";
     if (!receiver) newErrors.receiver = "Receiver Name is required";
     if (receiverPhone.length <= 2) newErrors.receiverPhone = "Receiver Phone is required";
    //  if (!deliveryMethod) newErrors.deliveryMethod = "Delivery method is required";
     if (!deliveryItem) newErrors.deliveryItem = "Delivery Item is required";
     if (!itemWeight) newErrors.itemWeight = "Item weight is required";
     if (!totalItems) newErrors.totalItems = "Number of items is required";
     if (!shipDate) newErrors.shipDate = "Shipping date is required";
     if (pickupAddress.address1.length <= 0) newErrors.pickupAddress = "Pick-up address is required";
     if (shipAddress.address1.length <= 0)
       newErrors.shipAddress = "Delivery address is required";

     setError(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError(""); // Reset error message

    // Validate Google Autocomplete Addresses
    if (pickupAddress.error || shipAddress.error) {
      setError("Please resolve address errors before submitting.");
      return;
    }

    // Construct Pickup and Shipping Address Objects
    const pickup = {
      address1: pickupAddress.address1,
      address2: pickupAddress2,
      city: pickupAddress.city,
      province: pickupAddress.state,
      postalCode: pickupAddress.postal,
      country: pickupAddress.country,
    };

    const shipping = {
      address1: shipAddress.address1,
      address2: shipAddress2,
      city: shipAddress.city,
      province: shipAddress.state,
      postalCode: shipAddress.postal,
      country: shipAddress.country,
    };

    const generateOrderId = (pickupAddress, shipAddress) => {
      const pickupCode = pickupAddress.substring(0, 3).toUpperCase();
      const deliveryCode = shipAddress.substring(0, 3).toUpperCase();
      const dateTime = new Date()
        .toISOString()
        .replace(/[-:.TZ]/g, "")
        .slice(0, 14);
      const randomStr = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      return `${pickupCode}-${deliveryCode}-${dateTime}-${randomStr}`;
    };

    const orderId = generateOrderId(pickupAddress.postal, shipAddress.postal);

    const orderData = {
      sender: sender,
      senderEmail: senderEmail,
      senderPhone: senderPhone,
      pickupAddress: pickup,
      receiver: receiver,
      receiverPhone: receiverPhone,
      deliveryAddress: shipping,
      // vehicleType: deliveryMethod,
      shippingNote: deliveryNote,
      shippingItem: deliveryItem,
      shippingWeight: itemWeight,
      numberOfItems: totalItems,
      shippingDate: shipDate,
      // combineDeliveries: combineDeliveries,
      orderId: orderId,
      isPeak: isPeak,
      status: "pending",
      createdAt: new Date().toISOString(), // Optional: To track when the order was created
    };

    try {
      sessionStorage.setItem("myData", JSON.stringify(orderData));
      console.log("Order successfully added:", orderData);
      navigate("/account/confirm-order"); // Redirect after successful order
      handleReset();
    } catch (error) {
      console.error(error);
      setError("Failed to place the order. Please try again.", error);
    }
  };

  const handleReset = () => {
    // Reset all form fields
    setSender("");

    setSenderEmail("");

    setSenderPhone("");

    setPickupAddress({
      address1: "",
      address2: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      error: "",
    });
    setPickupAddress2("");

    setReceiver("");

    setReceiverPhone("");

    setShipAddress({
      address1: "",
      address2: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      error: "",
    });
    setShipAddress2("");

    // setDeliveryMethod("bike");
    setDeliveryNote("");
    setDeliveryItem("");
    setItemWeight(0);
    setTotalItems(0);
    setShipDate("");

    setIsPeak(false);

    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="address-form"
      className="space-y-6"
      autoComplete="off"
    >
      {/* Pickup Address Section */}
      <PickupInfo
        sender={sender}
        setSender={setSender}
        senderEmail={senderEmail}
        setSenderEmail={setSenderEmail}
        senderPhone={senderPhone}
        setSenderPhone={setSenderPhone}
        address={pickupAddress}
        setAddress={setPickupAddress}
        address2={pickupAddress2}
        setAddress2={setPickupAddress2}
        error={error}
        setError={setError}
      />
      {/* Divider */}
      <hr className="border-gray-300" />
      {/* Shipping Address Section */}
      <ShippingInfo
        receiver={receiver}
        setReceiver={setReceiver}
        receiverPhone={receiverPhone}
        setReceiverPhone={setReceiverPhone}
        address={shipAddress}
        setAddress={setShipAddress}
        address2={shipAddress2}
        setAddress2={setShipAddress2}
        error={error}
        setError={setError}
      />
      {/* Divider */}
      <hr className="border-gray-300" />
      {/* Delivery Details Section */}
      <DeliveryDetails
        // deliveryMethod={deliveryMethod}
        // setDeliveryMethod={setDeliveryMethod}
        deliveryItem={deliveryItem}
        setDeliveryItem={setDeliveryItem}
        itemWeight={itemWeight}
        setItemWeight={setItemWeight}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        shipDate={shipDate}
        setShipDate={setShipDate}
        deliveryNote={deliveryNote}
        setDeliveryNote={setDeliveryNote}
        error={error}
        setError={setError}
      />
      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Combine Deliveries Checkbox */}
      {/* <div className="flex items-center">
      //   <input
      //     type="checkbox"
      //     id="combineDeliveries"
      //     checked={combineDeliveries}
      //     onChange={(e) => setCombineDeliveries(e.target.checked)}
      //     className="form-checkbox h-5 w-5 text-green-600"
      //   />
      //   <label htmlFor="combineDeliveries" className="ml-2">
      //     Combine deliveries in the same area (10% discount)
      //   </label>
      // </div> */}

      {/* Submit and Reset Buttons */}
      <div className="flex space-x-4">
        <Button type="submit" className="flex-1">
          Confirm Order
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600"
        >
          Clear Form
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
