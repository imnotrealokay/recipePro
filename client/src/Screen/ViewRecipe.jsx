import React, { useContext, useEffect, useState } from 'react'
import { NavBar, Recipe } from './Home'
import Context from '../context'
import {  useLocation, useNavigate } from 'react-router-dom'
import link from '../../serverLink'
import axios from 'axios'

export default function ViewRecipe() {
    const {user} = useContext(Context)
    const [recipy, setRecipy] = useState(null)
    const location = useLocation()
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
        let url = link + "/getOneRecipy"
       
        const paramArr = location.pathname.split("/")
        const id = paramArr[2]
        try {
          const response = await axios.post(url,{ id : id})
          if(response.data.success){
              setRecipy(response.data.data)
          }else{
              alert(response.data.message)
          }
      } catch (error) {
          console.log(error);
      }
      }
      if(!recipy){
        return <></>
      }
  return (
    <div className='w-screen min-h-screen bg-gray-200 flex flex-col'>
    <NavBar/>
    <div className='w-screen flex row justify-center mt-4'>
    <div className=' w-[1440px] px-4'>

        <div className='flex flex-row w-full justify-center'>
            <Recipe isBig={true} isNavigating={true} id={recipy._id} type={recipy.type} img={recipy.img} email={recipy.email} recipeName={recipy.recipeName}/>
        </div>
        <div className='w-full flex flex-row mt-8'>
            <div className='flex-1 flex flex-col'>
                {recipy.ingredients.map((item)=>{
                    return (
                        <div key={item}>
                            {item}
                        </div>
                    )
                })}
            </div>
            <div className='flex-1'>
                {recipy.recipeDetail}
            </div>

        </div>
        <div className='mt-8 text-end'>
            ~{recipy.name}

        </div>
        </div>
        
        </div>
    </div>
  )
}
