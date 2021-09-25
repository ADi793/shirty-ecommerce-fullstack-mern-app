import React, { useEffect, useState } from "react";
import { getUserOrder } from "../services/orderService";
import { getProductImageUrl } from "../utils/image";
import TwoColumnRow from "./common/TwoColumnRow";

function Order({ match, history }) {
  const [order, setOrder] = useState({});
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: savedOrder} = await getUserOrder(match.params.id);
        let itemsCount = 0;
        let totalPrice = 0;
        savedOrder.products.forEach(product => {
          itemsCount = product.quantity + itemsCount;
          totalPrice = product.quantity * product.unit_price;
        })
        
        setOrder(savedOrder);
        setItemsCount(itemsCount);
        setItemsPrice(totalPrice);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          history.replace("/not-found");
      }
  
    }

    fetchData();
  }, [history, match.params.id]);

  return (
    <div className="container my-3">
      <h1 className="fs-3 fw-normal letter-spacing">
        ORDER <span className="text-primary">{order._id}</span>
      </h1>
      <div className="row mt-5 text-muted">
        <div className="col-lg-8">
          <h2 className="letter-spacing fs-4 py-3">SHIPPING</h2>
          <p>
            <strong>Name:</strong> {order.user && order.user.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user && order.user.email}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong className="text-primary">Status:</strong> {order.status}
          </p>
          <hr />
          <h2 className="letter-spacing fs-4 py-3">PAYMENT METHOD</h2>
          <p>
            <strong className="text-primary">Method:</strong> Card
          </p>
          <hr />
          <h2 className="letter-spacing fs-4 py-3">ORDER ITEMS</h2>
          {order.products &&
            order.products.map((product) => (
              <div key={product._id} className="row mb-3">
                <div className="col-lg-2">
                  <img
                    className="img-fluid"
                    src={getProductImageUrl(product._id)}
                    alt=""
                  />
                </div>
                <div className="col-lg-5">
                  <strong>{product.name}.</strong>
                </div>
                <div className="col-lg-5">
                  <strong>
                    {product.quantity} x {product.unit_price} ={" "}
                    {product.quantity * product.unit_price} Rs.
                  </strong>
                </div>
              </div>
            ))}
        </div>
        <div className="col-lg-4 my-4 my-lg-0">
          <div className="list-group">
            <div className="list-group-item">
              <h2 className="letter-spacing fs-4 text-muted my-0 my-2">
                ORDER SUMMARY
              </h2>
            </div>
            <div className="list-group-item">
              <TwoColumnRow label="Items" value={itemsCount} />
            </div>
            <div className="list-group-item">
              <TwoColumnRow label="Shipping" value="0" />
            </div>
            <div className="list-group-item">
              <TwoColumnRow label="Tax" value="0" />
            </div>
            <div className="list-group-item">
              <TwoColumnRow label="Total" value={itemsPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Order;
