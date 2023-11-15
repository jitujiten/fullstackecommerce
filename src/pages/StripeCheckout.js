import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectcurrentOrderPlaced } from "../features/order/orderSlice";
import PageNotFound from "./404";
import { BallTriangle } from "react-loader-spinner";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OBA3FSIDQB38awG8xmu8ZeTeGSKymjHtRVYPanNDbtQHs3Ee9biofveEKISgEcmW49rpk7Xx7VNB8uSwxuX8WYS00DT1q5tEB"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectcurrentOrderPlaced);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder?.totalAmount,
        OrderId: currentOrder?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false); // Set loading to false after fetching data
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe ">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#600AFF"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}
