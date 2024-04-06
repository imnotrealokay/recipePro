import React from 'react'
import { NavBar, Recipe } from './Home'
export default function MyRecipies() {
  return (
    <div className='w-screen min-h-screen bg-gray-200 flex flex-col'>
    <NavBar/>
    <div className='w-screen flex row justify-center mt-4'>
    <div className=' w-[1440px] px-4'>

  <div className=' flex flex-row flex-wrap gap-4 px-4 justify-center'>
  <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>
  </div>
  </div>
  </div>
</div>
  )
}
