import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
// import calendar from "../../../images/calendar.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    //  this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");

    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }

    handleheartBlast.addEventListener("click", heartBlast);
  }
  render() {
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    /// Active menu
    let dashBoard = ["dashboard", "dashboard-admin"],
      detail = ["detail", "add-detail"],
      app = ["admin", "add-admin"],
      history = ["history"];

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">

            <li className={`${dashBoard.includes(path) ? "" : ""}`}>
              <Link  to="/dashboard" aria-expanded="false">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              {/* <ul aria-expanded="false">
                <li>
                  <Link
                    className={`${path === "" ? "mm-active" : ""}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "dashboard-admin" ? "mm-active" : ""
                    }`}
                    to="/dashboard-admin"
                  >
                    DashboardAdmin
                  </Link>
                </li>
              </ul> */}
            </li>


            <li className={`${detail.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">ข้อมูลบุคคล</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link
                    className={`${path === "detail" ? "mm-active" : ""}`}
                    to="/detail"
                  >
                    ข้อมูลบุคคล
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "add-detail" ? "mm-active" : ""
                    }`}
                    to="/add-detail"
                  >
                    เพิ่มข้อมูลส่วนบุคคล
                  </Link>
                </li>
              </ul>
            </li>




            <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                <i className="flaticon-381-television"></i>
                <span className="nav-text">ข้อมูลผู้ดูแล</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link
                    className={`${path === "admin" ? "mm-active" : ""}`}
                    to="/admin"
                  >
                    ผู้ดูแล
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "add-admin" ? "mm-active" : ""}`}
                    to="/add-admin"
                  >
                    เพิ่มข้อมูลผู้ดูแล
                  </Link>
                </li>
              </ul>
            </li>




            <li className={`${history.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                <i className="flaticon-381-controls-3"></i>
                <span className="nav-text">ประวัติการเข้าใช้งาน</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link
                    className={`${path === "history" ? "mm-active" : ""}`}
                    to="/history"
                  >
                    history
                  </Link>
                </li>
              </ul>
            </li>
          </MM>
          <div className="copyright">
            <p>
              <strong>Gymove Fitness Admin Dashboard</strong> © 2021 All Rights
              Reserved
            </p>
            <p>
              Made with <span className="heart" /> by DexignZone
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
