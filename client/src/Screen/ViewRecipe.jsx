import React from 'react'
import { NavBar, Recipe } from './Home'

export default function ViewRecipe() {
  return (
    <div className='w-screen min-h-screen bg-gray-200 flex flex-col'>
    <NavBar/>
    <div className='w-screen flex row justify-center mt-4'>
    <div className=' w-[1440px] px-4'>

        <div className='flex flex-row w-full justify-center'>
            <Recipe isBig={true}/>
        </div>
        <div className='w-full flex flex-row mt-8'>
            <div className='flex-1 flex flex-col'>
                <div>siinach</div>
                <div>siinach</div>
                <div>siinach</div>
                <div>siinach</div>
                <div>siinach</div>
                <div>siinach</div>
                <div>siinach</div>
            </div>
            <div className='flex-1'>
                ghsjdghsasdjhasdhasdhjasvdhavsdhvashdvshdvhsdvhsv
                sadhjsdhjashdahsd
                sbdbashdbhadbhsadhasd
                sdjdjsadjasdjasd
            </div>

        </div>
        <div className='mt-8 text-end'>
            ~raghav

        </div>
        </div>
        
        </div>
    </div>
  )
}
