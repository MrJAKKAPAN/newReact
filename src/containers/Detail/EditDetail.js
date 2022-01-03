import React, { Fragment, useState, useEffect } from "react";
import { Link,useLocation, useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import Axios from "axios";
import moment from 'moment'
import Cookies from "js-cookie";
moment.locale('th')


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const setLists = (length) => {
  let data = new Array(length);
  for (let i = 0; i < length; i++) {
    data[i] = i + 1;
  }
  return data;
};

const generateArrayOfYears = () => {
  var max = new Date().getFullYear() + 543;
  var min = max - 100 ;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const EditDetail = (props) => {

  let history = useHistory();
  let url = props.location.pathname
  let id = url.split('/').slice(-1).toString()

  const [years] = useState(generateArrayOfYears());
  const [months] = useState(setLists(12));
  const [day] = useState(setLists(31));

  const [ dataAll ,setDataAll ] = useState([])

  const [isLoading, setLoading] = useState(false);
  const isValidPasswordRegex = /^[0-9]+/;


  console.log(dataAll)
  const [sweetAlert, setSweetAlert] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [address, setAddress] = useState("");
  const [prefix, setPrefix ] = useState("");
  const [card_id, setCardId] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [old, setAge] = useState();


  let convertDate =  moment(dataAll.birthday).add(543, 'year').format('l')
  console.log('convertDate====',convertDate)
  let Split = convertDate.split('/')
  const monthss = Split[1]
  const days = Split[0]
  const yearss = Split[2]
  
  const [ month, setMonth ] = useState(monthss);
  const [ year, setYear ] = useState(yearss);
  const [ date, setDate ] = useState(days);


  useEffect (() => {
    let tokens = Cookies.get('accessToken');
      if(!tokens){
        setTimeout(()=>{
          history.push('/page-login')
        })
      }
    
    if(!dataAll || dataAll.length === 0 || dataAll === []){
      const getUsers = async () => {
        await Axios.get('http://159.223.40.188:5000/api/v1/information/'+id).then((res)=> {setDataAll(res.data[0]) }).catch(err => console.log(err))
      }
      getUsers();
    }
  }, [dataAll])


  const handleOnChangFirstName = (e) => {
    setFirst_name(e.target.value);
  } 
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    // แก้ ตอนเลือกแค่วัน
    const birthdays =   days+ "/" + monthss + "/" +yearss ;
    console.log('birthdays----',birthdays)
    try {
      await Axios.put("http://159.223.40.188:5000/api/v1/information/", {
      id,
      first_name : first_name ? first_name : dataAll.firstName ,
      last_name :  last_name ? last_name : dataAll.lastName,
      birthday :  dataAll.birthday,
      card_id : card_id ? card_id : dataAll.card_id,
      note : note ? note : dataAll.detail,
      status : status ? status : dataAll.status,
      address: address ? address : dataAll.address,
      prefix: prefix ? prefix : dataAll.prefix,
      old: old ? old : dataAll.old
      })
        .then((res) =>{ 
          setSweetAlert(true)       
          setTimeout(()=> {
            history.push('/detail')
          },1500)   
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      setTimeout(()=> {
        history.push('/detail')
      },1500)  
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
                  onSubmit={(e) => handleUpdate(e)}
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
                            <option value={dataAll.prefix}>{dataAll.prefix}</option>
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
                            placeholder={dataAll.firstName}
                            value={first_name}
                            onChange={handleOnChangFirstName}
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
                            placeholder={dataAll.lastName}
                            value={last_name}
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
                        disabled
                        placeholder="วัน"
                        className="form-select form-control"
                        onChange={(e) => setDate(e.target.value)}
                      >
                        <option defaultValue> {days} </option>
                        {day.map((x, y) => (
                          <option key={y} value={y}>
                            {x}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div className="col-lg-3">
                        <select
                        disabled
                        placeholder="เดือน"
                        className="form-select form-control"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option defaultValue>{monthss}</option>
                        {months.map((month, i) => (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div className="col-lg-3">
                        <select
                        disabled
                        placeholder="ปี"
                        className="form-select form-control"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option defaultValue>{yearss}</option>
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
                            value={dataAll.old}
                            placeholder={dataAll.old}
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
                            <option value="คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ชาวเขา 9 เผ่า))"> คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง - ชาวเขา 9 เผ่า) </option>
                            <option value="คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ไม่ใช่ชาวเขา))"> คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง - ไม่ใช่ชาวเขา) </option>
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
                        <textarea class="form-control" placeholder={dataAll.address} onChange={(e)=> setAddress(e.target.value)} id="exampleFormControlTextarea1" rows="6"></textarea>
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
                            onChange={(e) => setNote(e.target.value)}
                          >
                            <option value="">{dataAll.detail}</option>
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
          text="แก้ไขข้อมูลสำเร็จ"
          onConfirm={() => {
            setSweetAlert(false)
            history.push('/detail')
            }}
        />
    </Fragment>
  );
};
export default EditDetail;
// export default AddAdmin;
