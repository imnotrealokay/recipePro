import React, { useContext, useEffect, useState } from 'react'
import { NavBar } from './Home'
import link from '../../serverLink'
import axios from 'axios'
import Context from '../context'
import {useNavigate} from "react-router-dom"
export default function AddRecipy() {
  const [img, setImg] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [recipeDetail, setRecipeDetail] = useState("")
  const [recipeName, setRecipeName] = useState("")
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const [type, setType] = useState("")
  let options = ["Indian", "Chinese", "Mexican", "American", "French"]
  const handleAddItem = () =>{
    setIngredients([...ingredients, ""])
  }

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user])
  const handleIngredientChange = (index, value) =>{
    const newIngredient = [...ingredients]
    newIngredient[index] = value
    setIngredients(newIngredient)
  }
  const submitHandler = async () => {
    if(!recipeName){
      alert("Add recipe name")
      return
    }
    if(!img){
      alert("Add recipe image")
      return
    }
    const newIngredientArray = ingredients.filter(item => item !== "")
    if(newIngredientArray.length === 0){
      alert("Add ingredients")
      return
    }
    if(!type){
      alert("Select recipe type")
      return
    }
    if(!recipeDetail){
      alert("Add recipe detail")
      return
    }
    let url = link + "/addrecipy"
    try {
      const response = await axios.post(url,{ email : user.email,name: user.name, type, ingredients,recipeDetail, img, recipeName})
      if(response.data.success){
          
          navigate("/myrecipies")
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
        <div >
                Recipe name
            </div>
            <input
           value={recipeName} onChange={(e)=> setRecipeName(e.target.value)}
             type="text" className='w-full h-10 rounded-lg px-2 mt-2 outline-black bg-white'  placeholder='Recipe name' />
       
            <div className='mt-4' >
                Recipe image
            </div>
            <input
           value={img} onChange={(e)=> setImg(e.target.value)}
             type="text" className='w-full h-10 rounded-lg px-2 mt-2 outline-black bg-white'  placeholder='Image url' />
       
       <div className='mt-4' >
                Ingredients
            </div>
            {ingredients.map((item, i)=>{
              return(
                <input
                key={i}
                value={item} onChange={(e)=> handleIngredientChange(i,e.target.value)}
                  type="text" className='w-full h-10 rounded-lg px-2 mt-2 outline-black bg-white'  placeholder='Ingredient name' />
            
              )
            })}
            <div onClick={()=>handleAddItem()} className='text-sm mt-2 text-red-500 cursor-pointer'>
              + Add ingredients
            </div>
            <div className='mt-4' >
                Recipe Type
            </div>
            <div className='w-full px-4 pt-2 flex flex-row justify-evenly'>
            {options.map((items)=>{
                return(
                    <div onClick={()=> setType(items)} key={items} className={`cursor-pointer rounded-lg px-3 py-2 ${type === items ?"bg-green-400" :"bg-white" } `}>
                        {items}
                    </div>
                )
            })}
        </div>
             <div className='mt-4' >
                Recipe Detail
            </div>
            
            <textarea value={recipeDetail} onChange={(e)=>setRecipeDetail(e.target.value)}
            placeholder='Write down all the detail of recipe'
            className='flex-1 rounded-lg mt-2 w-full bg-white text-sm p-2 h-[200px] resize-none outline-black'
            ></textarea>

            <button onClick={()=> submitHandler()} className='h-10 mb-6 bg-green-400 rounded-lg mt-6 cursor-pointer w-full'>Submit</button>
      </div>
      </div>
     
    </div>
  )
}
