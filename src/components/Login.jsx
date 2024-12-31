import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState(""); // Removed unnecessary space
    const [email, setEmail] = useState("");    // Removed unnecessary space
    const [password, setPassword] = useState(""); // Removed unnecessary space

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()
    const navigate = useNavigate()

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };

        try {
            const response = await loginUser(data).unwrap();
            console.log(response);
            const {token, user} = response
            dispatch(setUser({user}))
            alert("Login successfull");
            navigate("/")
        } catch (error) {
            setMessage("Please input a valid email and password");
        }

    }
  return (
    <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-semibold pt-5 text-center'>Sign In</h2>
            <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                <input type="email" name="email" id="email" 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>
                <input type="password" name="password" id="password"
                onChange={(e) => setPassword(e.target.value)}

                placeholder='Password' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>
                {
                    message && <p className='text-red-500'>{message}</p>
                }
                <button type="submit" className='w-full mt-5 bg-primary text-white hover:bg-green-500 font-medium py-3 rounded-md'>Login</button>

            </form>
            <p className="my-5 italic text-sm text-center">
            New user? 
            <Link to="/register" className="text-red-500 underline hover:text-green-700 mx-1">Register</Link>here
            </p>

        </div>
    </section>
  )
}

export default Login
