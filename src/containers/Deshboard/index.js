import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie ,Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie";
import "moment/locale/th";

ChartJS.register(ArcElement, Tooltip, Legend);
moment.locale("th");

function Dashboard() {
  let history = useHistory();
  const [results, setResult] = useState([]);

  const lengthNoStatus = results.filter((x) => x.status === 'บุคคลที่ไ่ม่มีสถานะทางทะเบียน').length
  const lengthStatusGroup = results.filter((x) => x.status === 'บุคคลไม่มีสถานะทางทะเบียน (กลุ่มชาติพันธุ์ตกสำรวจ)').length
  const lengthNoStatusInThai = results.filter((x) => x.status === 'บุคคลไม่มีสถานะทางทะเบียน (บุคคลต่างด้าวที่เกิดในประเทศไทย)').length
  const lengthNoStatusBhdThai = results.filter((x) => x.status === 'คนซึ่งไม่มีสัญชาติไทย (บุตรคนต่างด้าวที่เกิดในประเทศไทย)').length
  const lengthStatusHight9 = results.filter((x) => x.status === 'คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ชาวเขา 9 เผ่า))').length
  const lengthNoHightStatus = results.filter((x) => x.status === 'คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง (ไม่ใช่ชาวเขา))').length
  const lengthNoStatusHight = results.filter((x) => x.status === 'บุคคลบนพื้นที่สูง').length
  const lengthDontNow = results.filter((x) => x.status === 'ไม่ทราบ').length

  const fetchData = async() => {
    try {
      const users = await axios.get("http://159.223.40.188:5000/api/v1/information/");
      setResult(users.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let tokens = Cookies.get("accessToken");
    if (!tokens) {
      setTimeout(() => {
        history.push("/page-login");
      });
    }else {
      fetchData()
    }
  }, []);

// console.log(
//   lengthNoStatus, 
//   lengthStatusGroup, 
//   lengthNoStatusInThai, 
//   lengthNoStatusBhdThai,
//   lengthStatusHight9,
//   lengthNoHightStatus,
//   lengthNoStatusHight,
//   lengthDontNow)

  let result = {
    hoverOffset: 4,
  //   options: {
  //     animation: {
  //       animationScale: true
  //     }
  // },
    labels: [
        'บุคคลไม่มีสถานะทางทะเบียน',
        'บุคคลไม่มีสถานะทางทะเบียน (กลุ่มชาติพันธุ์ตกสำรวจ)', 
        'บุคคลไม่มีสถานะทางทะเบียน (บุคคลต่างด้าวที่เกิดในประเทศไทย)', 
        'คนซึ่งไม่มีสัญชาติไทย (บุตรคนต่างด้าวที่เกิดในประเทศไทย)', 
        'คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง - ชาวเขา 9 เผ่า)', 
        'คนซึ่งไม่มีสัญชาติไทย (ชุมชนบนพื้นที่สูง - ไม่ใช่ชาวเขา)',
        'บุคคลบนพื้นที่สูง',
        'ไม่ทราบ'],
  datasets: [
    {
      label: 'Points',
      data: [ lengthNoStatus, 
              lengthStatusGroup, 
              lengthNoStatusInThai, 
              lengthNoStatusBhdThai,
              lengthStatusHight9,
              lengthNoHightStatus,
              lengthNoStatusHight,
              lengthDontNow
            ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 109, 64, 0.5)',
        'rgba(0, 199, 7,0.5)'
      
    ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 109, 64, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 199, 7)'
      ],
      borderWidth: 0,
  }
  ],    
  }
  const options = {
    plugins: {
      datalabels: {
        clamp: false,
        backgroundColor: function (context) {
          return context.dataset.borderColor;
        },
        display: "auto",
        borderRadius: 4,
        color: "black",
        font: {
          weight: "bold"
        },
        formatter:(value) =>{
          let percentage = value +" "+ "คน";
          return percentage;
        },
        padding: 6
      },
    }
  };
  if(!results) {
    return <h1> Loading... </h1>
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
     
      <Pie 
        data={() => result}
        plugins={[ChartDataLabels]} 
        options={options} 
        style={{ maxWidth: "1440px", maxHeight: "70vh" }}
      />
    </div>
  );
}
export default Dashboard;
