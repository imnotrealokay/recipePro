import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-200 flex flex-col">
      <NavBar/>
      <div className='w-screen flex row justify-center'>
        <div className=' w-[1440px] px-4'>
            <Filter/>
      <div className=' flex flex-row flex-wrap gap-4 justify-center'>
      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>      <Recipe/>
      </div>
      </div>
      </div>
    </div>
  )
}
function Filter(){
    let options = ["Indian", "Chinese", "mexican", "American", "French"]
    return(
        <div className='w-full px-4 py-4 flex flex-row justify-evenly'>
            {options.map((items)=>{
                return(
                    <div key={items} className='rounded-lg px-3 py-2 bg-white'>
                        {items}
                    </div>
                )
            })}
        </div>
    )
}

export function NavBar(){
    return(
    <div className=" h-16 w-screen flex flex-row justify-center bg-white">
        <div className=" h-full w-[1440px] px-4 py-2 flex flex-row items-center gap-x-8">
            <div className={``}>
                Home
            </div>
            <div className="flex-1 h-full items-center flex flex-row ">
            <input type="text" className='w-full h-10 rounded-lg px-2 outline-black bg-gray-200'  placeholder='Search' />
        
            </div>
            <div className={``}>
                Favorite
            </div>
            <div className={``}>
                My recipies
            </div>
            <div className={``}>
                Add recipy
            </div>
        </div>
    </div>
    )
}

export function Recipe ({isBig = false}) {
    return(
        <div className={`${isBig ? "w-[450px]" : "w-[300px]"}  rounded-lg bg-white relative`}>
            <img className={`${isBig ? "w-[450px]" : "w-[300px]"} ${isBig ? "h-[225px]" : "h-[150px]"} object-cover rounded-t-lg`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg" alt="" />
            <div className={`absolute top-1 right-1  text-white`}>
                <FavoriteIcon sx={{fontSize: 24}}/>
            </div>
            <div className={`absolute top-1 left-1  text-red-500`}>
                <DeleteOutlineIcon sx={{fontSize: 24}}/>
            </div>
            <div className="p-2">
                <div className=" flex flex-row justify-between">
                    <div>Shawarma</div>
                    <div>Asian</div>
                </div>
            </div>

        </div>
    )
}