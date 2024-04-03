import React from 'react'
import './App.css';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Get the individual query parameters
  const userId = params.get('user_id');
  const amount = params.get('amount');
  const productId = params.get('product_id');


  return (
<div className='flex flex-col justify-center items-center h-full centerdiv'>
  <div className='text-center text-xl text-white font-semibold'>Tune Tutor</div>
  <div className='text-center text-md my-2 text-white font-semibold'>Enroll Your Course Now</div>
  
  <div className='text-center text-md my-2 text-white font-semibold'>
        User ID: {userId}, Amount: {amount}, Product ID: {productId}
      </div>

<button className='cursor-pointer text-white bg-blue-600 rounded-md px-4 py-2 mt-2 text-md font-semibold'>Buy Course</button>
</div>

  )
}

export default Payment;