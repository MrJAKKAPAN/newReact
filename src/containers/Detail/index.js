import React, { useEffect, useState, Fragment } from "react";
import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2-react";
import moment from 'moment'
import Cookies from "js-cookie";
import 'moment/locale/th';
moment.locale('th')


const Detail = () => {
  let history = useHistory()
  const [sweetDeleteAlert, setSweetDeleteAlert] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);  

  const [dataAll, setDataAll] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')
  const [count, setCount] = useState();

    useEffect(() => {
      let tokens = Cookies.get('accessToken');
      if(!tokens){
        setTimeout(()=>{
          history.push('/page-login')
        })
      }
      setSearch("");
      getUsers();
  }, [count]);  

  const getUsers = async () => {
    const users = await axios.get("http://159.223.40.188:5000/api/v1/information/");
    setUsers(users.data);
    setDataAll(users.data);
    setCount(users.data.length);
  };
  
  const handleDelete = async(id) => {
    await axios.delete(`http://159.223.40.188:5000/api/v1/information/del/${id}`).then((res) => setSweetDeleteAlert(true)).catch(err => console.log(err))
    setCount(count - 1)
  }

  const dateTh = (date) => {
   let convertDate =  moment(date).add(543, 'year').format('LL')
   return convertDate;
  } 


  const handleSearch = async(e) => {
    e.preventDefault()
  }

  const handleChangSearch = (value) => { 
    setSearch(value);
    filterData(value);
  };
  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      setDataAll(users);
    } else {
      const filterData = users.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key].toString().toLowerCase().includes(lowerCaseValue);
        });
      });
      setDataAll(filterData);
    }
  };


  


  return (
    <>
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">ตารางข้อมูลบุคคล</h4>
          {/* <form className="d-flex" style={{ width: "100%" }}> */}
          <input
              type="text"
              className="form-control col-3"
              id="Search"
              name="Search"
              placeholder="Search"
              value={search}
              onChange={(e) => handleChangSearch(e.target.value)}
            />
             {/* <span className="btn btn-search" onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                  </span>
                </form> */}
        </div>
        <div className="card-body">
          <div className="w-100 table-responsive">
            <div
              id="example_wrapper"
              className="dataTables_wrapper"
              style={{
                width: "100%",
                height: "65vh",
                overflow: "scroll",
                display: "inline-block",
              }}
            >
              <table
                className="display w-100 dataTable "
                id="example5"
                role="grid"
                aria-describedby="example5_info"
              >
                <thead>
                  <tr role="row">
                  <th className="sorting_asc" style={{ width: "30px" }}>
                        ลำดับ
                    </th>
                    <th className="sorting_asc" style={{ width: "120px" }}>
                      ชื่อ - นามสกุล
                    </th>
                    <th className="sorting" style={{ width: "150px" }}>
                      วัน/เดือนปี/เกิด
                    </th>
                    <th className="sorting" style={{ width: "10px" }}>
                      อายุ
                    </th>
                    <th className="sorting" style={{ width: "100px" }}>
                      เลขบัตรประจำตัว
                    </th>
                    <th className="sorting" style={{ width: "140px" }}>
                      สถานะทางทะเบียน
                    </th>
                    <th className="sorting" style={{ width: "128px" }}>
                      ที่อยู่
                    </th>
                    
                    <th className="sorting" style={{ width: "400px" }}>
                      หมายเหตุ
                    </th>
                    <th className="sorting" style={{ width: "100px" }}>
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dataAll.map((item, i) => {
                    return (
                      <tr key={i} className="odd" role="row">
                      <td>{i+1}</td>
                        <td className="sorting_1">
                          {item.prefix + " " + item.first_name + "  " + item.last_name}
                        </td>
                        <td>{moment(item.birthday).add(543, 'year').add(1,'day').format(" DD MMMM YYYY")}</td>
                        <td>{item.old}</td>
                        <td>{item.card_id}</td>
                        <td>{item.status}</td>
                        <td>{item.address}</td>
                        <td>{item.detail}</td>
                        <td>
                        <div className="d-flex">
                            <button
                              onClick={() => history.push(`/edit-detail/${item.id}`)}
                              className="btn btn-primary shadow btn-xs sharp mr-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              onClick={()=> handleDelete(item.id)}
                              // to="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                          </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

<div className="modal" tabIndex={100}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

      <SweetAlert
          show={sweetDeleteAlert}
          text="ลบข้อมูลเรียบร้อย"
          onConfirm={() => setSweetDeleteAlert(false)}
        />
         <SweetAlert
          show={sweetAlert}
          text="เเก้ไขข้อมูลสำเร็จ"
          onConfirm={() => setSweetAlert(false)}
        />
    </div>
   </>
  );
};
export default Detail;
