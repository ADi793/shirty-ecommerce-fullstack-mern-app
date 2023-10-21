import React, { useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { getOrders, updateOrderStatus } from "../services/orderService";
import Table from "./common/Table";

const socket = io.connect("https://shirty-ecommerce-services.onrender.com");

function ManageOrders(props) {
  const [orders, setOrders] = useState([]);
  socket.emit("join", `adminRoom`);

  useEffect(() => {
    async function fetchData() {
      const { data: savedOrders } = await getOrders();

      setOrders(savedOrders);

      socket.on("orderPlaced", (order) => {
        setOrders([order, ...savedOrders]);
        toast.success("New order placed...");
      });
    }

    fetchData();
  }, []);

  const columns = [
    { label: "ID", path: "_id" },
    {
      label: "Date",
      key: "time",
      path: "createdAt",
      content: (item) => moment(item.createdAt).format("YYYY-MM-DD"),
    },
    { label: "User", path: "user.name" },
    { label: "Amount", path: "amount" },
    { label: "Address", path: "address" },
    {
      label: "Paid",
      path: "transaction_id",
      content: (item) => item.transaction_id && "Paid.",
    },
    { label: "Status", path: "status", content: (item) => renderSelect(item) },
  ];

  const renderSelect = (item) => {
    const options = [
      "Cancelled",
      "Delivered",
      "Shipped",
      "Processing",
      "Recieved",
    ];
    return (
      <select
        className="form-select bg-light select-width"
        value={item.status}
        onChange={async ({ currentTarget: input }) => {
          const originalOrders = orders;
          try {
            const updatedOrders = [...originalOrders];
            const index = updatedOrders.indexOf(item);
            updatedOrders[index] = { ...orders[index] };
            updatedOrders[index].status = input.value;

            setOrders(updatedOrders);
            await updateOrderStatus(item._id, { status: input.value });
            toast.success("Order status changed.");
          } catch (ex) {
            setOrders(originalOrders);
            toast.success("An unexpected error occured.");
          }
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="container text-muted vw-100 userorder-container">
      <h2 className="py-5">All Orders</h2>
      <Table columns={columns} data={orders} />
    </div>
  );
}

export default ManageOrders;
