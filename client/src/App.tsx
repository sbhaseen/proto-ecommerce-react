import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { AuthProvider } from "./contexts/AuthContext";
import TopNav from "./components/TopNav";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

library.add(fab);

function App() {
  return (
    <Container fluid className="px-0">
      <AuthProvider>
        <Router>
          <TopNav />
          <Container className="mt-4 min-vh-100">
            <Switch>
              <Route path="/items/:id" component={ItemDetails} />
              <Route path="/items" component={Items} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" exact component={Home} />
              <Route path="/*" component={ErrorPage} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </AuthProvider>
    </Container>
  );
}

export default App;
