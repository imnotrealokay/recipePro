import React, { useContext, useState } from 'react'
import link from '../../serverLink'
import axios from 'axios'
import Context from '../context'
import { useNavigate } from 'react-router-dom'
export default function Auth({isLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const {setUser} = useContext(Context)
    const navigate = useNavigate()
    const onClickHandler = async () => {
 
        
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(validRegex)) {
            alert("Invalid email address!");
            return
          } 
          if(password.length < 5){
            alert("Password length must be 6 or more chars");
            return
          }
        let url = link
        if(isLogin){
            url += "/login"
        }else{
            url += "/signup"
        }
        try {
            const response = await axios.post(url,{email, password, name})
            if(response.data.success){
                setUser(response.data.data)
                navigate("/")
            }else{
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-row justify-center items-center bg-gray-200'>
      <div className=' rounded-lg p-4 flex flex-col bg-white w-[400px]'>
        <div className='text-xl f'>
            {isLogin ? "Welcome back!" : "Create an account"}
            
        </div>
        <div className='text-lg'>
            {isLogin ? "Log back in..." : "Join with millions of users"} 
        </div>
        {!isLogin && <>
            <div className='text-sm mt-6'>
            Name
        </div>
        <input value={name} onChange={(e)=> setName(e.target.value)}  className='w-full h-10 rounded-lg px-2 outline-black bg-gray-200' type="text" placeholder='Name' />
        </>}
        <div className='text-sm mt-6'>
            Email
        </div>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className='w-full h-10 rounded-lg px-2 outline-black bg-gray-200'  placeholder='Email' />
        <div className='text-sm mt-6'>
            Password
        </div>

        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className='w-full h-10 rounded-lg px-2 outline-black bg-gray-200' placeholder='Password' />
        <div className=' mt-4 text-sm text-green-400 flex flex-row justify-end'>
            {isLogin ? <div className=' cursor-pointer' onClick={()=> navigate("/signup")} >
                Go to sign up
        </div> : <div className=' cursor-pointer'  onClick={()=> navigate("/login")}> Go to log in </div>}
        </div>
        <button onClick={()=>onClickHandler()} className='h-10 bg-green-400 rounded-lg mt-6 cursor-pointer'>Submit</button>
      </div>
      
    </div>
  )
}
