import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2-react";
import Cookies from "js-cookie";

const Admin = () => {
  
  let history = useHistory()
  const [sweetDeleteAlert, setSweetDeleteAlert] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);

  const [search, setSearch] = useState('')
  const [dataAll, setDataAll] = useState([]);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();

  const handleDelete = async (id) => {
    await axios
      .delete(`http://159.223.40.188:5000/api/v1/admins/del/${id}`)
      .then((res) => setSweetDeleteAlert(true))
      .catch((err) => console.log(err));
    setCount(count - 1);
  };

  const getUsers = async () => {
    const users = await axios.get("http://159.223.40.188:5000/api/v1/admins/");
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
                      <th className="sorting_asc" style={{ width: "200px" }}>
                        ชื่อ - นามสกุล
                      </th>
                      <th className="sorting" style={{ width: "178px" }}>
                        เบอร์โทร
                      </th>
                      <th className="sorting" style={{ width: "128px" }}>
                        เลขประจำตัว
                      </th>
                      <th className="sorting" style={{ width: "46px" }}>
                        สถานะ
                      </th>
                      <th className="sorting" style={{ width: "114px" }}>
                        Username
                      </th>
                      <th className="sorting" style={{ width: "114px" }}>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataAll.map((item, i) => {
                      return (
                        <tr key={i} className="odd" role="row">
                          <td>{i + 1}</td>
                          <td className="sorting_1">
                            {item.first_name + "  " + item.last_name}
                          </td>
                          <td>{item.phone}</td>
                          <td>{item.card_id}</td>
                          <td>{item.statud}</td>
                          <td>{item.username}</td>
                          <td>
                            <div className="d-flex">
                              <button onClick={() => history.push(`/edit-admin/${item.id}`)} className="btn btn-primary shadow btn-xs sharp mr-1" >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                // to="#"
                                className="btn btn-danger shadow btn-xs sharp"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                          {/* <td>{item.id}</td> */}
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
  );
};
export default Admin;
