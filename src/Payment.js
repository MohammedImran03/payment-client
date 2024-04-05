import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import Razorpay from 'razorpay';
import {createnewCourse} from './api';

const Payment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Get the individual query parameters
  const userId = params.get('user_id');
  const amount = params.get('amount');
  const productId = params.get('product_id');

  const [userData, setUserData] = useState(null);
  const [courseData,setCourseData]=useState(null);
  const [success,setSuccess]=useState(false);

  const values = {
    userid: userId,
    courseid: productId
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        const url = `https://course-app-server.onrender.com/tunetutor/users/getuser?userid=${values.userid}&courseid=${values.courseid}`;
        let response = await axios.get(url);
        console.log(response.data);
        setUserData(response.data.user);
        setCourseData(response.data.course);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData(); 
  }, [userId, productId]);
  

const paymentvalues={
  amount:courseData ? courseData.c_fee:"",
}

const initPayment = (data) => {
  const options = {
    key: "rzp_test_1ITMBhQFXyD7lk", // Corrected typo here
    amount: data.amount,
    currency: data.currency,
    description: "Course Transaction",
    image: courseData?.image_link, // Corrected 'Image' to 'image'
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        console.log(paymentId);
        alert("Payment Successfull.");
        setSuccess(true);
        const enrollmentData = {
          user_id: userData?._id,
          payment_id: paymentId,
          amount: courseData?.c_fee,
          product_id: courseData?._id,
        };    
      const result = await createnewCourse(enrollmentData);
      console.log(result);
       if(result.success === true){
        alert('Course Enrollment Success:', result.message);
        return;
       }else{
        alert('Course Enrollment Satus:', result.response.data.message || result.message);
        return;
       }      
        // const verifyUrl = "https://course-app-server.onrender.com/tunetutor/users/verify";
        // const { data } = await axios.post(verifyUrl, response);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#8A2BE2",
    },
  };

  const razpay =  new window.Razorpay(options); // Corrected instantiation
  razpay.open();
};


const HandlePayment=async()=>{
  try{
    const orderurl="https://course-app-server.onrender.com/tunetutor/users/orders";
    const response=await axios.post(orderurl,paymentvalues);
    console.log(response.data); 
    initPayment(response.data.data);
  }catch(error){
    console.log(error);

  }
}


  return (
<div className='flex flex-col justify-center items-center h-full centerdiv'>
  <div className='text-center text-xl text-white font-semibold'>Tune Tutor</div>
  <div className='text-center text-md my-2 text-white font-semibold'>Enroll Your Course Now</div>
  
  <div className='text-center text-sm my-2 text-white font-semibold'>
     {userData &&  <div className='flex flex-col justify-center'>
        <div>User Details</div>
        <div>Name : {userData.name}</div>
        <div>Email : {userData.email}</div>
        <div>MObile Number : {userData.ph_no}</div>
        <div>Billing Address : {userData.address}</div>
      </div> }
      {courseData &&  <div className='flex flex-col justify-center mt-4'>
        <div>Course Details</div>
        <div>Course Name : {courseData.c_title}</div>
        <div className='w-60 h-60 flex justify-center items-center mx-auto'>
  <img src={courseData.image_link} className='max-w-full max-h-full' />
</div>
<div>Course Fee : {courseData.c_fee}</div>
      </div> }
      </div>
{success ? <div className='text-white text-sm font-bold'>You can Go back and Enjioy Course Now.</div> : 
<button onClick={HandlePayment} className='cursor-pointer text-white bg-blue-600 rounded-md px-4 py-2 mt-2 text-md font-semibold'>Buy Course Rs.{courseData ? courseData.c_fee : ''}</button>}
</div>

  )
}

export default Payment;