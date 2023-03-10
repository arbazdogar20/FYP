import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from './pages/login/Login';
import { useContext } from "react";
import { Context } from "./context/Context";
import Settings from "./pages/settings/Settings";
import Contact from "./pages/Contact/Contact";


function App() {
  const {user} = useContext(Context);
  
  return (
    <Router>
      {user ? <Topbar /> : null}
      <div className="container">
        {user ? <Sidebar /> : <Login />}
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : null}
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            {user ? <ProductList /> : null}
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            {user ? <NewProduct /> : null}
          </Route>
          <Route path="/setting">
            {user ? <Settings /> : null}
          </Route>
          <Route path="/contact">
            {user ? <Contact /> : null}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
