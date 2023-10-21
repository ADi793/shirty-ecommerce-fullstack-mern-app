import React, { useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { getUserOrders } from "../services/orderService";
import { Link } from "react-router-dom";
import Table from "./common/Table";

const socket = io.connect("https://shirty-ecommerce-services.onrender.com");

function Orders({ user = {} }) {
  const [orders, setOrders] = useState([]);
  socket.emit("join", `${user._id}_orders`);

  useEffect(() => {
    async function fetchData() {
      const { data: orders } = await getUserOrders();

      setOrders(orders);

      socket.on(`orderUpdated`, (updatedOrder) => {
        toast.success("Order status changed!");
        const index = orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        const updatedOrders = [...orders];
        updatedOrders[index] = updatedOrder;

        setOrders(updatedOrders);
      });
    }

    fetchData();
  }, []);

  const columns = [
    { label: "ID", path: "_id" },
    {
      label: "Date",
      key: "date",
      path: "createdAt",
      content: (item) => moment(item.createdAt).format("YYYY-MM-DD"),
    },
    {
      label: "Time",
      key: "time",
      path: "createdAt",
      content: (item) => moment(item.createdAt).format("HH:mm A"),
    },
    { label: "Total", path: "amount" },
    {
      label: "Paid",
      path: "transaction_id",
      content: (item) => "Paid",
    },
    { label: "Status", path: "status" },
    {
      key: "details",
      content: (item) => (
        <Link to={`/orders/${item._id}`} className="btn btn-primary">
          Details
        </Link>
      ),
    },
  ];

  return (
    <div className="container text-muted vw-100 userorder-container">
      <h2 className="py-5">My Orders</h2>
      <Table columns={columns} data={orders} />
    </div>
  );
}

export default Orders;
