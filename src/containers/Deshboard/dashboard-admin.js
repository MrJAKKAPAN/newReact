import React, { useEffect, useState, Fragment } from "react";
import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2-react";
import moment from 'moment'
import Cookies from "js-cookie";
import 'moment/locale/th';
moment.locale('th')

 const DashboardAdmin = () => {
    let history = useHistory();

    useEffect(()=> {
        let tokens = Cookies.get('accessToken');
      if(!tokens){
        setTimeout(()=>{
          history.push('/page-login')
        })
      } 
    })
    return (
        <div>
            dashboard-admin
        </div>
    )
}
export default DashboardAdmin;