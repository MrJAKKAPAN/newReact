import React, { useEffect, useState } from "react";
/// React router dom
import { BrowserRouter as Router, Switch, Route , Redirect,useHistory} from "react-router-dom";
import Cookies from "js-cookie";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

import DashBoard from "../containers/Deshboard";
import DashBoardAdmin from "../containers/Deshboard/dashboard-admin";

import Home from "../containers/Detail/index";
import AddDetail from "../containers/Detail/AddDetail";
import EditDetail from "../containers/Detail/EditDetail";

import Admin from "../containers/Admin/index"
import AddAdmin from "../containers/Admin/AddAdmin";
import EditAdmin from "../containers/Admin/EditAdmin";


import Login from "../containers/Login"
import History from "../containers/History"
import Nav from "../layout/nav/index";
import Footer from "../layout/Footer";

const Routes = () => {
  
  let history = useHistory();

  const [accessToken, setAccessToken] = useState(true)
  const routes = [
    {url:"page-login", component:Login},
    {url:"dashboard", component:DashBoard},
    {url:"dashboard-admin", component:DashBoardAdmin},
    { url: "detail", component: Home },
    { url: "add-detail", component: AddDetail },
    { url: "edit-detail/:id", component: EditDetail },
    { url: "admin", component: Admin },
    { url: "add-admin", component: AddAdmin },
    { url: "edit-admin/:id", component: EditAdmin },
    { url: "history", component: History },
  ];

  useEffect(() => {
    let tokens = Cookies.get('accessToken');
    if(!tokens){
      setTimeout(()=>{
        setAccessToken(false)
      },3000)
    }
  }, [])

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");
  return (
    <Router basename="/">
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"} ${
          !path ? "right-profile" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 1024 }}
          >
            <Switch>
            <Route exact path='/'> {accessToken ? <Redirect push to="/page-login"/> : <Redirect push to="/dashboard"/>}</Route>

              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
              <Route exact path='*'>{accessToken ? <Redirect push to="/page-login"/> : <Redirect push to="/dashboard"/>}</Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default Routes;
