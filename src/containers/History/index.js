import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2-react";
import Cookies from "js-cookie";
import moment  from "moment";
import 'moment/locale/th';

moment.locale('th'); 

export default function Story() {

  let history = useHistory()
    const [sweetDeleteAlert, setSweetDeleteAlert] = useState(false);
    const [sweetAlert, setSweetAlert] = useState(false);
  
    const [search, setSearch] = useState('')
    const [dataAll, setDataAll] = useState([]);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState();


    const getUsers = async () => {
        const users = await axios.get("http://159.223.40.188:5000/api/v1/history/");
        setUsers(users.data);
        setDataAll(users.data);
        setCount(users.data.length);
      };
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
            <h4 className="card-title">ตารางข้อมูลผู้ดูแลระบบ</h4>

            <input
              type="text"
              className="form-control col-3"
              id="Search"
              name="Search"
              placeholder="Search"
              value={search}
              onChange={(e) => handleChangSearch(e.target.value)}
            />
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
                      <th className="sorting_asc" style={{ width: "40px" }}>
                        ลำดับ
                      </th>
                      <th className="sorting_asc" style={{ width: "50px" }}>
                        username
                      </th>
                      <th className="sorting" style={{ width: "128px" }}>
                        เวลาเข้าใช้งานล่าสุด
                      </th>
                    
                    </tr>
                  </thead>

                  <tbody>
                    {dataAll.slice(0).reverse().map((item, i) => {   
                      return (
                        <tr key={i} className="odd" role="row">
                          <td>{i + 1}</td>
                          <td className="sorting_1">
                            {item.username}
                          </td>
                          <td>{ moment(item.created).add(7, 'hours').format("LLLL")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
    )
}
