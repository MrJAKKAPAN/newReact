import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import Axios from "axios";
import Cookies from "js-cookie";


function AddAdmin() {
  
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [card_id, setCardId] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const isValidPasswordRegex = /^[0-9]+/;
  
  useEffect(()=> {
    let tokens = Cookies.get('accessToken');
    if(!tokens){
      setTimeout(()=>{
        history.push('/page-login')
      })
    }
  },[])

  const submitAddAdmin = async (e) => {
    e.preventDefault();
    if (first_name.length === 0) alert("โปรดระบุชื่อ");
    else if (last_name.length === 0) alert("โปรดระบุนามสกุล");
    else if (phone.length <= 8) alert("โปรดตรวจสอบหรือระบุเบอร์โทรให้ครบถ้วน");
    else if (card_id.length <= 12) alert("โปรดระบุรหัสประจำตัว");
    else if (username.length === 0) alert("โปรดระบุชื่อผู้ใช้");
    else if (password.length === 0) alert("โปรดระบุรหัสผ่าน");
    else if (status.length === 0) alert("โปรดระบุสถานะ");
    try {
      setLoading(true)
      await Axios.post("http://159.223.40.188:5000/api/v1/admins/add/", {
        first_name,
        last_name,
        phone,
        status,
        username,
        password,
        card_id,
      })
        .then((res) => {
          setLoading(false)
          setSweetAlert(true)
          setTimeout(() => {
            history.push('/admin')
          },1500)
        })
        .catch((err) => console.log(err));
        setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };


  const handleValidatePhone = (value) => {
    if (!isValidPasswordRegex.test(value)) {
      setPhone("");
    }
  };
  function onChangePhone(e) {
    setPhone(e.target.value);
    handleValidatePhone(e.target.value);
  }

  const handleValidateCradID = (value) => {
    if (!isValidPasswordRegex.test(value)) {
      setCardId("");
    }
  };
  function onChangeCardId(e) {
    setCardId(e.target.value);
    handleValidateCradID(e.target.value);
  }


  function onBlur(e) {}


  if (isLoading)
  return (
    
    <div style={{ marginTop: "25%", height: "100vh" }}>
      <h1>Loading</h1>
        {console.log('Loding')}
      {/* <Spinner /> */}
    </div>
  );
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => submitAddAdmin(e)}
                >
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="first_name"
                        >
                          ชื่อ
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-5">
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="firstName"
                            value={first_name.toString()}
                            onChange={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="last_name"
                        >
                          นามสกุล
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-5">
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="lastName"
                            value={last_name.toString()}
                            onChange={(e) => setLast_name(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="phone"
                        >
                          เบอร์โทร <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-5">
                          <input
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="phone"
                            value={phone}
                            maxLength={10}
                            onBlur={onBlur}
                            onChange={onChangePhone}
                          />
                        </div>
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="card_id"
                        >
                          เลขประจำตัว <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                          <input
                            className="form-control"
                            id="card_id"
                            name="card_id"
                            placeholder="cardId"
                            value={card_id}
                            maxLength={13}
                            onBlur={onBlur}
                            onChange={onChangeCardId}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="username"
                        >
                          Username
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-5">
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="username"
                            value={username.toString()}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="password"
                        >
                          Password
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-5">
                          <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password.toString()}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="status"
                        >
                          {" "}
                          สถานะ
                          {/* <span className="text-danger">*</span> */}
                        </label>
                        <div className="col-lg-5">
                          <select
                            className="form-control"
                            id="status"
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="admin">Please select</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super AddAdmin</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-lg-11 ml-auto">
                          <button type="submit" className="btn btn-primary">
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SweetAlert
          show={sweetAlert}
          text="เพิ่มข้อมูลสำเร็จ"
          onConfirm={() => setSweetAlert(false)}
        />
    </Fragment>
  );
};
export default AddAdmin;
// export default AddAdmin;
