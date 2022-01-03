import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import Axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sweetAlert, setSweetAlert] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length === 0) return alert("โปรดกรอกชื่อผู้ใช่");
    if (password.length === 0) return alert("โปรดกรอกรหัสผ่าน");
    try {
      // http://159.223.40.188:5000/api/v1/admins
      await Axios.post("http://159.223.40.188:5000/api/v1/admins/login", {
        username,
        password,
      })
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status) {
            Cookies.set("accessToken", res.data.accessToken, { expires: 7 });
            history.push("/dashboard");
          } else {
            console.log("Please check your username and password.");
            setSweetAlert(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="container ">
        <div className="row justify-content-center d-flex  ">
          <div className="col-6 align-self-center mt-5 pt-5">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12 mx-auto">
                  <div className="auth-form">
                    <h4 className="text-center mb-4 text-white">LOGIN</h4>
                    <form
                      onSubmit={(e) => {
                        Cookies.remove("name")
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-danger text-primary btn-block"
                        >
                          Sign Me In
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="text-white">
                        Don't have an account?{" "}
                        <Link className="text-danger" to="./page-register">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SweetAlert
          show={sweetAlert}
          // title="Please check your username and password"
          text="*** โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านให้ถูกต้อง ***"
          onConfirm={() => setSweetAlert(false)}
        />
      </div>
    </div>
  );
}
