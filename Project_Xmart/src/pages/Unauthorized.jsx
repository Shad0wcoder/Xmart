import React from 'react';
import { useNavigate } from 'react-router-dom';


const Unauthorized = () => {
const navigate = useNavigate();
    return (
        <div className='border flex flex-col justify-center items-center mt-5 p-5 w-full md:h-[60vh] h-[70vh] my-auto'>
            <h1 className='text-red-700 font-sans text-2xl font-bold'>Unauthorized Access</h1>
            <p className='text-white text-xl text-center'>You do not have permission to view this page.</p>
            <button onClick={() => navigate('/')} className='bg-blue-600 text-white rounded-md hover:bg-blue-900 p-2 m-2'>Go to Home</button>
        </div>
    );
};

export default Unauthorized;