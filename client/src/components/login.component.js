import React, { Component , useState , useEffect } from "react";
import axios from 'axios';
import { Route , Redirect } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { authenticate, isAuth ,setCookie ,removeCookie} from '../helpers/auth.js';
    
const Login = ({history}) => {
    // ----------- event ปุ่ม Sign in----------------------//
    
    const [formData, setFormData] = useState({
      price_upper : '',
      price_lower : '',
      data_date : '',
      data_time : '',
      open_price : '',
      opentime : ''
    });
    const [prv_data, setPrvData] = useState({
      price_upper : '',
      price_lower : '',
      data_date : '',
      data_time : '',
      open_price : '',
      opentime : ''
    });

    const [status , setStatus] = useState("START");
    const [date , setDate] = useState("NULL");
    const {price_upper, price_lower,data_date,data_time,open_price,opentime} = formData;
    const {prv_data_time} = prv_data;
    const fetchandupdate = async() => {
      //-----------------Fetch---------------------------//
      const result = await axios.get(`${process.env.REACT_APP_API_URL}api/datamicroservice`)
      let prv = (await axios.get(`${process.env.REACT_APP_API_URL}api`)).data.pop()
      let data = result.data
      setFormData({
        price_upper :  String(data.price).split(".")[1],   //String(data.price).split(".")[0].at(-1)+ 3ตัวค่อยเอามาบวก
        price_lower : String(data.diff).split("(")[0].split(".")[1].trim(),
        data_date : String(data.datedtime_nkave).split(" ")[0],
        data_time : String(data.datedtime_nkave).split(" ")[1],
        open_price : data.open_price,
        opentime : data.opentime
      })
      
      setPrvData({
        price_upper :  prv.price_upper,
        price_lower : prv.price_lower,
        data_date : prv.data_date,
        data_time : prv.data_time,
        open_price : prv.open_price,
        opentime : prv.opentime
      })
      console.log(formData)
      if(formData.data_time !== '' && prv_data.data_time !== '' && formData.data_time.localeCompare(prv_data.data_time) !== 0 && status.localeCompare("New Data") !== 0 ) {
        setStatus("New Data")
        console.log("New Data")
      }

      if(status === "New Data"){

          await axios.post(`${process.env.REACT_APP_API_URL}api`,{
            price_upper,
            price_lower,
            data_date,
            data_time,
            open_price,
            opentime
          })
          .then(() =>{
            setStatus("Update! : "+ data_time)
            setDate(data_date)
            console.log("END")
          })
        
      }
      // if(price_upper != ''){
      
    }


    useEffect(() =>{
      const interval = setInterval(() => {
        console.log("Start!")
        fetchandupdate()
        console.log("End!")
      }, 5000);
      return () => {
        clearInterval(interval);
      }
    });




    


        return (
            <form>
                <h3>สถานะ</h3>
                <h2>{status}</h2>
                <h2>Date : {date}</h2>

            </form>
            
        );
};
export default Login;