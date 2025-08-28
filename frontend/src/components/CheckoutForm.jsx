import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { db } from "../services/firebase";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { sendOrderConfirmationEmail } from "../services/emailService";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("myData");

    const idData = JSON.parse(storedData);
    setOrderId(idData.orderId);
  }, []);

  if (!orderId) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payId = {
      paymentId: elements._commonOptions.clientSecret.id,
    };

    // console.log("PayId", payId);

    try {
      const orderDocRef = collection(db, "orders");
      const q = query(orderDocRef, where("orderId", "==", orderId));
      // console.log(orderId);
      const orderDocSnap = await getDocs(q);
      // console.log(orderDocSnap);
      const firestoreOrder = orderDocSnap.docs[0];
      // console.log(firestoreOrder);
      const firestoreOrderId = firestoreOrder.id;
      // console.log(firestoreOrderId);

      const docRef = doc(db, "orders", firestoreOrderId);
      await updateDoc(docRef, payId);

      // console.log("Order updated successfully!", payId);
      sessionStorage.clear();
    } catch (error) {
      console.error("Error updating document:", error);
    }

    const getReturnURL = () => {
      if (window.location.hostname === "localhost") {
        return "http://localhost:5173/success";
      }
      return "https://ecodelivery-app.vercel.app/success";
    };

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: getReturnURL(),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          className="w-full bg-green-500 text-white mt-4 rounded-lg hover:bg-green-600 transition duration-300"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner">
                Processing...
              </div>
            ) : (
              `Pay now`
            )}
          </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  );
}
