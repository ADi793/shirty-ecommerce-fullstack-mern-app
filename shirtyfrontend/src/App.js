import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import AdminDashboard from "./components/AdminDashboard";
import Cart from "./components/Cart";
import CategoryForm from "./components/CategoryForm";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ManageCategories from "./components/ManageCategories";
import ManageOrders from "./components/ManageOrders";
import ManageProducts from "./components/ManageProducts";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import Orders from "./components/Orders";
import ProductForm from "./components/ProductForm";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Signup from "./components/Signup";
import Product from "./components/Product";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();

    setUser(user);
  }, []);

  const settingUser = (user) => {
    setUser(user);

    auth.setJwt();
  };

  return (
    <React.Fragment>
      <Navbar user={user} />
      <ToastContainer />
      <main>
        <Switch>
          <ProtectedRoute path="/orders/:id" component={Order} />
          <ProtectedRoute
            path="/orders"
            render={(props) => (
              <Orders {...props} user={user === null ? {} : user} />
            )}
          />
          <AdminRoute path="/manage-orders" component={ManageOrders} />
          <Route
            path="/cart"
            render={(props) => <Cart {...props} user={user} />}
          />
          <Route path="/product/:id" component={Product} />
          <AdminRoute path="/products/:id" component={ProductForm} />
          <AdminRoute path="/manage-products" component={ManageProducts} />
          <AdminRoute path="/categories/:id" component={CategoryForm} />
          <AdminRoute path="/manage-categories" component={ManageCategories} />
          <AdminRoute path="/admindashboard" component={AdminDashboard} />
          <Route
            path="/signout"
            render={(props) => <Signout {...props} settingUser={settingUser} />}
          />
          <Route
            path="/signin"
            render={(props) => <Signin {...props} settingUser={settingUser} />}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
