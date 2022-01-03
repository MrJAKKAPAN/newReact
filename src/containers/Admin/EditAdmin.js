import React, { Fragment,useState, useEffect, useRef  } from "react";
import { Link, useHistory  } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import Axios from "axios";
import Cookies from "js-cookie";

 const  EditAdmin = (props) => {

  let history = useHistory();
  let url = props.location.pathname
  let id = url.split('/').slice(-1).toString()

  const [isLoading, setLoading] = useState(false);
  const isValidPasswordRegex = /^[0-9]+/;

  const [sweetAlert, setSweetAlert] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [card_id, setCardId] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  
  const [ dataAll ,setDataAll ] = useState([])

  useEffect (() => {
    let tokens = Cookies.get('accessToken');
      if(!tokens){
        setTimeout(()=>{
          history.push('/page-login')
        })
      }
      
    if(!dataAll || dataAll.length === 0 || dataAll === []){
      const getUsers = async () => {
        await Axios.get('http://159.223.40.188:5000/api/v1/admins/'+id).then((res)=> {setDataAll(res.data[0]) }).catch(err => console.log(err))
      }
      getUsers();
    }
  }, [dataAll])

  const submitAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await Axios.put("http://159.223.40.188:5000/api/v1/admins/", {
        id,
        first_name :first_name ? first_name :dataAll.firstName,
        last_name : last_name ? last_name : dataAll.lastName,
        phone : phone ? phone : dataAll.phone, 
        status: status ? status : dataAll.statud,
        card_id : card_id ? card_id : dataAll.card_id,
      }).then((res) => {
          setSweetAlert(true)
          setTimeout(()=> {
            history.push('/admin')
          },1500) 
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidateCradID = (value) => {
    if (!isValidPasswordRegex.test(value)) {
      setCardId("");
    }
  };
  function onChangeCardId(e) {
    setCardId(e.target.value);
    handleValidateCradID(e.target.value);
  }

  const handleValidatePhone= (value) => {
    if (!isValidPasswordRegex.test(value)) {
      setPhone("");
    }
  };
  function onChangePhone(e) {
    setPhone(e.target.value);
    handleValidatePhone(e.target.value);
  }


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
                          placeholder={dataAll.firstName}
                          value={first_name}
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
                          placeholder={dataAll.lastName}
                          value={last_name}
                          onChange={(e) => setLast_name(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                    <div className="form-group row">
                    <label
                        className="col-lg-1 col-form-label"
                        htmlFor="card_id"
                      >
                        เลขบัตรปปช <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="card_id"
                          name="card_id"
                          placeholder={dataAll.card_id}
                          value={card_id}
                          maxLength={13}
                          onChange={onChangeCardId}
                        />
                      </div>
                      <label
                        className="col-lg-1 col-form-label"
                        htmlFor="status"
                      >
                        เบอร์โทร
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="status"
                          name="status"
                          placeholder={dataAll.phone}
                          value={phone}
                          maxLength={10}
                          onChange={onChangePhone}
                        />
                      </div>

                    </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="form-group row">
                    <label
                        className="col-lg-1 col-form-label"
                        htmlFor="note"
                      >
                        Username
                      </label>
                      <div className="col-lg-5">
                      <input
                          disabled
                          type="text"
                          className="form-control"
                          id="status"
                          name="status"
                          value={dataAll.username}
                        />
                      </div>
                      <label
                        className="col-lg-1 col-form-label"
                        htmlFor="note"
                      >
                        สถานะ
                      </label>
                      <div className="col-lg-5">
                        <select className="form-control" id="note" name="note" onChange={(e) => setStatus(e.target.value)}>
                          <option value="">{dataAll.statud}</option>
                          <option value="admin"> admin </option>
                          <option value="superAdmin"> superAdmin </option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-11 ml-auto">
                        <button type="submit" className="btn btn-primary">
                          Submit
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
        text="เเก้ไขข้อมูลสำเร็จ"
        onConfirm={() => setSweetAlert(false)}
      />
  </Fragment>
  );
}
export default EditAdmin;