import React, { Component , useState , useEffect } from "react";
import axios from 'axios';
import { Route , Redirect } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { authenticate, isAuth ,setCookie ,removeCookie} from '../helpers/auth.js';
    
const Login = ({history}) => {
    // ----------- event ปุ่ม Sign in----------------------//
    
    const [formData, setFormData] = useState({});

    const send_req = async() => {
      const result = await axios.get(`http://indexes.nikkei.co.jp/en/nkave/get_real_data?idx=nk225`, {
        withCredentials: true,         
        crossorigin: true,
        headers : {
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
          'Access-Control-Max-Age' : 86400    
        },
        mode: 'cors',
        credentials: 'include'
      });

      setFormData(result.data)
      console.log(formData)
    }


    useEffect(() =>{
      send_req()
    },[]);




    

    
      const { price_upper, price_lower ,data_date,data_time,open_price,opentime} = formData;
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };

  // ----------- event ปุ่ม Sign in----------------------//

        return (
            <form>
                <h3>สถานะ</h3>
            </form>
            
        );
};
export default Login;