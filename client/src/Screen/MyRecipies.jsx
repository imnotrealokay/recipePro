import React, { useContext, useEffect, useState } from 'react'
import { NavBar, Recipe } from './Home'
import link from '../../serverLink'
import axios from 'axios'
import Context from '../context'
import { useNavigate } from 'react-router-dom'
export default function MyRecipies() {
  const {user} = useContext(Context)
  const [myRecipies, setMyRecipies] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user])
  useEffect(()=>{
    if(user){
      getRecipes()
    }
  },[user])
  const getRecipes = async() =>{
    let url = link + "/myrecipies"
    try {
      const response = await axios.post(url,{ email : user.email})
      if(response.data.success){
          setMyRecipies(response.data.data)
      }else{
          alert(response.data.message)
      }
  } catch (error) {
      console.log(error);
  }
  }
  return (
    <div className='w-screen min-h-screen bg-gray-200 flex flex-col'>
    <NavBar/>
    <div className='w-screen flex row justify-center mt-4'>
    <div className=' w-[1440px] px-4'>

  <div className=' flex flex-row flex-wrap gap-4 px-4 justify-center'>
    {myRecipies.map((recipy) => {
      return(
        <Recipe id={recipy._id} type={recipy.type} img={recipy.img} email={recipy.email} recipeName={recipy.recipeName} key={recipy._id}/>
      )
    })}
 
  </div>
  </div>
  </div>
</div>
  )
}
