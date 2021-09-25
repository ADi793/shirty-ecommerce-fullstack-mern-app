import React, { useState } from "react";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrder } from "../services/orderService";
import { getPaymentIntentSecret } from "../services/paymentService";
import { deleteCartProducts } from "../services/cartService";

function PaymentCard({ cartProducts, history }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  let cartProductsCount = 0;
  let totalAmount = 0;
  cartProducts.forEach((cartProduct) => {
    cartProductsCount = parseInt(cartProduct.quantity) + cartProductsCount;
    totalAmount += cartProduct.quantity * cartProduct.amount;
  });

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleBuy = async () => {
    const products = cartProducts.map((p) => ({
      _id: p._id,
      quantity: p.quantity,
    }));

    const order = { products, address };
    setProcessing(true);

    try {
    const { data: clientSecret } = await getPaymentIntentSecret(order);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }

    order.transaction_id = payload.paymentIntent.id;

    await createOrder(order);
    deleteCartProducts();
    history.replace('/orders');
    } catch(ex) {
      if (ex.response && ex.response.status === 400) 
      toast.error(ex.response.data);
      history.push('/cart');
      setProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="list-group">
      <div className="list-group-item">
        <h2 className="fs-4 text-muted text-center letter-spacing">
          SUBTOTAL <span className="text-primary">{cartProductsCount}</span>{" "}
          ITEMS
        </h2>
      </div>
      <div className="list-group-item">
        <h2 className="fs-4 text-muted">
          Your bill is: <span className="text-primary">{totalAmount} Rs.</span>
        </h2>
      </div>
      <div className="list-group-item">
        <div className="my-1">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="form-control"
            id="email"
            placeholder="Enter your email..."
          />
        </div>
      </div>
      <div className="list-group-item">
        <div className="my-1">
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            className="form-control"
            id="address"
            placeholder="Enter your adress..."
          />
        </div>
      </div>
      <div className="list-group-item">
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </div>
      <div className="list-group-item">
        <button
          className="btn btn-primary w-100"
          onClick={handleBuy}
          disabled={
            processing || disabled || succeeded || !(address.length > 5)
          }
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Buy"}
          </span>
        </button>
        {error && (
          <div className="card-error text-danger" role="alert">
            {error}
          </div>
        )}
        {/* <button onClick={handleBuy} className="btn btn-primary w-100">Buy</button> */}
      </div>
    </div>
  );
}

export default PaymentCard;
