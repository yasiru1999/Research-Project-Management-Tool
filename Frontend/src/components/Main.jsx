import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";


function Main() {
    return (
            <BrowserRouter>
                <NavBar />

                <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 60px)' }}>
                    <Switch >
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>


    );
}

export default Main;