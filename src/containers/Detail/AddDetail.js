import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import Cookies from "js-cookie";
import Axios from "axios";

const setLists = (length) => {
  let data = new Array(length);
  for (let i = 0; i < length; i++) {
    data[i] = i + 1;
  }
  return data;
};

const generateArrayOfYears = () => {
  var max = new Date().getFullYear();
  var min = max - 100;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const AddDetail = () => {

  let history = useHistory();

  const [years] = useState(generateArrayOfYears());
  const [months] = useState(setLists(12));
  const [day] = useState(setLists(31));
  const [unicId, setUnicId]= useState(false)
  const [isLoading, setLoading] = useState(false);
  const isValidPasswordRegex = /^[0-9]+/;

  const [sweetAlert, setSweetAlert] = useState(false);

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [card_id, setCardId] = useState("");
  const [status, setStatus] = useState("");
  const [prefix, setPrefix ] = useState("");
  const [address, setAddress] = useState("");

  const [old, setAge] = useState();
  const [note, setNote] = useState("");


  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [date, setDate] = useState();
  const birthday =  year + "-" + month + "-" + date ;
  
  useEffect(() => {
    let tokens = Cookies.get('accessToken');
    if(!tokens){
      setTimeout(()=>{
        history.push('/page-login')
      })
    }
  }, [])

  const submitAddAdmin = async (e) => {
    e.preventDefault();

    if (prefix.length === 0) alert("โปรดระบุคำนำหน้าชื่อ");
    else if (first_name.length === 0) alert("โปรดระบุชื่อ");
    else if (last_name.length === 0) alert("โปรดระบุนามสกุล");
    else if (note.length === 0) alert("โปรดระบุหมายเหตุ");
    else if (card_id.length <= 12) alert("โปรดระบุรหัสประจำตัว");
    else if (address.length === 0) alert("โปรดระบุที่อยู่");
    else if (status.length === 0) alert("โปรดระบุสถานะ");
    try {
      await Axios.get('http://159.223.40.188:5000/api/v1/information/card/' + card_id).then((res) => {
        if(res.data.status){
          checkCard()
        }else{
          alert('เลขบัตรนี้มีในระบบแล้ว')
        }
      }).catch((err) => console.log(err))
    } catch (error) {
      console.log(error);
    }
  };

  const checkCard = async() => {
      await Axios.post("http://159.223.40.188:5000/api/v1/information/", { 
        prefix,
        first_name, 
        last_name, 
        note, 
        status, 
        birthday,
        card_id,
        old,
        address 
      })
        .then((res) => {
          setSweetAlert(true)
          setTimeout(()=>{
            history.push('/detail')
          },1500)
        })
        .catch((err) => console.log(err));
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

  const handleValidateAge = (value) => {
    if (!isValidPasswordRegex.test(value)) {
      setAge("");
    }
  };
  
  function onChangeAge(e) {
    setAge(e.target.value);
    handleValidateAge(e.target.value);
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
                          htmlFor="prefix"
                        >
                          คำนำหน้า
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-2">
                        <select
                            className="form-control"
                            id="prefix"
                            name="prefix"
                            placeholder="คำนำหน้า"
                            onChange={(e) => setPrefix(e.target.value)}
                          >
                            <option value="">โปรดเลือก</option>
                            <option value="นาย"> นาย </option>
                            <option value="นางสาว"> นางสาว </option>
                            <option value="นาง"> นาง </option>
                            <option value="เด็กชาย"> เด็กชาย </option>
                            <option value="เด็กหญิง"> เด็กหญิง</option>
                          </select>
                          </div>
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="first_name"
                        >
                          ชื่อ
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-3">
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            // placeholder="ชื่อ"
                            // value={first_name.toString()}
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
                        <div className="col-lg-3">
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder=" "
                            // value={last_name.toString()}
                            onChange={(e) => setLast_name(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="birthday"
                        >
                          ว/ด/ปีเกิด <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-3">
                        <select
                        placeholder="วัน"
                        className="form-select form-control"
                        onChange={(e) => setDate(e.target.value)}
                      >
                        <option defaultValue>วัน</option>
                        {day.map((x, y) => (
                          <option key={y} value={y}>
                            {x}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div className="col-lg-3">
                        <select
                        placeholder="เดือน"
                        className="form-select form-control"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option defaultValue>เดือน</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div className="col-lg-3">
                        <select
                        placeholder="ปี"
                        className="form-select form-control"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option defaultValue>ปี</option>
                        {years.map((year, i) => (
                          <option key={i} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                        </div>
                       
                      </div>
                      <div className="col-xl-12">
                      <div className="form-group row">
                      <label
                          className="col-lg-1 col-form-label"
                          htmlFor="old"
                        >
                          อายุ <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-1">
                          <input
                            type="text"
                            className="form-control"
                            id="old"
                            name="old"
                            maxLength={3}
                            value={old}
                            placeholder=""
                            onChange={onChangeAge}
                          />
                        </div>
                      <label
                          className="col-lg-1 col-form-label"
                          htmlFor="card_id"
                        >
                          เลขบัตร <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            id="card_id"
                            name="card_id"
                            maxLength={13}
                            value={card_id}
                            onChange={onChangeCardId}
                          />
                        </div>
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="status"
                        >
                          สถานะ
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                        <select
                            className="form-control"
                            id="note"
                            name="note"

                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="บุคคลไม่มีสถานะทางทะเบียน"> บุคคลไม่มีสถานะทางทะเบียน </option>
                            <option value="บุคคลไม่มีสถานะทางทะเบียน (กลุ่มชาติพันธุ์ตกสำรวจ)"> บุคคลไม่มีสถานะทางทะเบียน (กลุ่มชาติพันธุ์ตกสำรวจ) </option>
                            <option value="บุคคลไม่มีสถานะทางทะเบียน (บุคคลต่างด้าวที่เกิดในประเทศไทย)"> บุคคลไม่มีสถานะทางทะเบียน (บุคคลต่างด้าวที่เกิดในประเทศไทย) </option>
                            <option value="คนซึ่งไม่มีสัญชาติไทย (บุตรคนต่างด้าวที่เกิดในประเทศไทย)"> คนซึ่งไม่มีสัญชาติไทย (บุตรคนต่างด้าวที่เกิดในประเทศไทย) </option>
                            <option value="คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ชาวเขา 9 เผ่า))"> คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ชาวเขา 9 เผ่า)) </option>
                            <option value="คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ไม่ใช่ชาวเขา))"> คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ไม่ใช่ชาวเขา)) </option>
                            <option value="บุคคลบนพื้นที่สูง"> บุคคลบนพื้นที่สูง </option>
                            <option value="ไม่ทราบ"> ไม่ทราบ </option>
                            
                          </select>

                          </div>
                      </div>
                      </div>
                    </div>
                    <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="note"
                        >
                          ที่อยู่
                        </label>
                        <div className="col-lg-11">
                        <textarea class="form-control" onChange={(e)=> setAddress(e.target.value)} id="exampleFormControlTextarea1" rows="6"></textarea>
                        </div>
                      </div>
                    <div className="col-xl-12">
                      <div className="form-group row">
                        <label
                          className="col-lg-1 col-form-label"
                          htmlFor="note"
                        >
                          หมายเหตุ
                        </label>
                        <div className="col-lg-10">
                          <select
                            className="form-control"
                            id="note"
                            name="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="( ท.ร.031 ) บุคคลซึ่งได้รับการสำรวจจัดทำทะเบียนประวัติตามยุทธศาสตร์การจัดการปัญหาสถานะและสิทธิของบุคคล มีเลขประจำตัวขึ้นต้นด้วยเลข 0 เลขหลักที่หกและเจ็ดเป็น 89 รวมถึงบุตรของบุคคลดังกล่าวที่เกิดในประเทศไทยได้รับการแจ้งเกิดตามสูติบัตร"> ( ท.ร.031 ) บุคคลซึ่งได้รับการสำรวจจัดทำทะเบียนประวัติตามยุทธศาสตร์การจัดการปัญหาสถานะและสิทธิของบุคคล มีเลขประจำตัวขึ้นต้นด้วยเลข 0 เลขหลักที่หกและเจ็ดเป็น 89 รวมถึงบุตรของบุคคลดังกล่าวที่เกิดในประเทศไทยได้รับการแจ้งเกิดตามสูติบัตร </option>
                            <option value="บุคคลที่อาศัยอยู่ในประเทศไทยโดยไม่ชอบด้วยกฎหมายหรือในลักษณะชั่วคราว (บุตรของบุคคลประเภทที่ 6 ที่เกิดในประเทศไทย) ประเภทที่ 6 คือ ผู้ที่เข้าเมืองโดยชอบและไม่ชอบแต่อยู่ในลักษณะชั่วคราวและยังไม่ได้สัญชาติเนื่องจากทางการยังไม่รองรับตามกฎหมาย"> บุคคลที่อาศัยอยู่ในประเทศไทยโดยไม่ชอบด้วยกฎหมายหรือในลักษณะชั่วคราว (บุตรของบุคคลประเภทที่ 6 ที่เกิดในประเทศไทย) ประเภทที่ 6 คือ ผู้ที่เข้าเมืองโดยชอบและไม่ชอบแต่อยู่ในลักษณะชั่วคราวและยังไม่ได้สัญชาติเนื่องจากทางการยังไม่รองรับตามกฎหมาย </option>
                            <option value="( มาตรา 19/2) บุคคลที่นายทะเบียนอำเภอหรือนายทะเบียนท้องถิ่นจัดทำทะเบียนประวัติให้ในกลุ่มบุคคลที่ไม่มีสถานะทางทะเบียนมีเลขประจำตัวขึ้นต้นด้วยเลข 0 เลขหลักที่หกและเจ็ดเป็น 00 อันเนื่องมาจากการแจ้งเกิดเด็กแรกเกิดหรือเด็กไร้เดียงสา ถูกทอดทิ้ง แด็กเร่ร่อน เด็กไม่ปรากฏบุพการีหรือบุพการีทอดทิ้ง หรือการขอเพิ่มชื่อในทะเบียนบ้านของบุคคลที่อ้างว่าเป็นผู้มีสัญชาติไทยแต่พยานหลักฐานที่แสดงต่อนายทะเบียนยังไม่สามารถพิสูจน์สถานะการเกิดและสัญชาติได้ตามมาตรา 19/2 แห่งพระราชบัญญัติการทะเบียนราษฎร พ.ศ. 2534 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ.2551"> ( มาตรา 19/2) บุคคลที่นายทะเบียนอำเภอหรือนายทะเบียนท้องถิ่นจัดทำทะเบียนประวัติให้ในกลุ่มบุคคลที่ไม่มีสถานะทางทะเบียนมีเลขประจำตัวขึ้นต้นด้วยเลข 0 เลขหลักที่หกและเจ็ดเป็น 00 อันเนื่องมาจากการแจ้งเกิดเด็กแรกเกิดหรือเด็กไร้เดียงสา ถูกทอดทิ้ง แด็กเร่ร่อน เด็กไม่ปรากฏบุพการีหรือบุพการีทอดทิ้ง หรือการขอเพิ่มชื่อในทะเบียนบ้านของบุคคลที่อ้างว่าเป็นผู้มีสัญชาติไทยแต่พยานหลักฐานที่แสดงต่อนายทะเบียนยังไม่สามารถพิสูจน์สถานะการเกิดและสัญชาติได้ตามมาตรา 19/2 แห่งพระราชบัญญัติการทะเบียนราษฎร พ.ศ. 2534 แก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ.2551</option>
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
          text="เพิ่มข้อมูลสำเร็จ"
          onConfirm={() => setSweetAlert(false)}
        />
    </Fragment>
  );
};
export default AddDetail;
// export default AddAdmin;
