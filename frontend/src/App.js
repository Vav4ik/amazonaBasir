import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">amazona</a>
                    </div>
                    <div>
                        <a href="/cart">Cart</a>
                        <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route path="/" component={HomeScreen} exact />
                        <Route path="/product/:id" component={ProductScreen} />
                    </Switch>
                </main>
                <footer className="row center">2020 Copyright Waway LTD</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
