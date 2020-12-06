import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </main>
        <footer className="row center">2020 Copyright Waway LTD</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
