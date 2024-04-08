import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useNavigate, useLocation} from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import link from '../../serverLink';
import axios from 'axios';
export default function Home() {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [recipelist, setRecipeList] = useState([])
    const [typeSelected, setTypeSelected] = useState("")
    const [searchText, setSearchText] = useState("")
    const [unChangedRecipelist, setUnChangedRecipeList] = useState([])
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }else{
            getRecipies()
        }
    },[user])
    const typeHandler = (type) => {
        setTypeSelected(prevType => prevType === type ? "" : type);
    };
    useEffect( ()=>{
        if(typeSelected){
            
            const filterRecipe = unChangedRecipelist.filter(obj =>  obj.type === typeSelected)
            setRecipeList(filterRecipe)
        }else{
            setRecipeList(unChangedRecipelist)
        }
    },[typeSelected,unChangedRecipelist])
    
   

    useEffect(() => {
        if(searchText ){
            if(typeSelected){
                const filterRecipe = unChangedRecipelist.filter(obj => obj.type === typeSelected)
                const filteredRecipes = filterRecipe.filter((recipe) => {
                    const nameMatch = recipe.recipeName.toLowerCase().includes(searchText);
                    
           
                    const ingredientMatch = recipe.ingredients.some(ingredient =>
                      ingredient.toLowerCase().includes(searchText)
                    );
                
                    return nameMatch || ingredientMatch;
                  });
                  setRecipeList(filteredRecipes)
            }else{
                const filteredRecipes = recipelist.filter((recipe) => {
                    const nameMatch = recipe.recipeName.toLowerCase().includes(searchText);
                    
           
                    const ingredientMatch = recipe.ingredients.some(ingredient =>
                      ingredient.toLowerCase().includes(searchText)
                    );
                
                    return nameMatch || ingredientMatch;
                  });
                  setRecipeList(filteredRecipes)
            }
        }
    },[searchText, typeSelected, unChangedRecipelist])
   const getRecipies = async () => {
    let url = link + "/getrecipies"
    try {
      const response = await axios.post(url,{ })
      if(response.data.success){
          setRecipeList(response.data.data)
          setUnChangedRecipeList(response.data.data)
      }else{
          alert(response.data.message)
      }
  } catch (error) {
      console.log(error);
  }
   }
  return (
    <div className="w-screen min-h-screen bg-gray-200 flex flex-col">
      <NavBar searchText={searchText} setSearchText={setSearchText}/>
      <div className='w-screen flex row justify-center'>
        <div className=' w-[1440px] px-4'>
            <Filter typeSelected={typeSelected} typeHandler={typeHandler}/>
      <div className=' flex flex-row flex-wrap gap-4 justify-center'>
      {recipelist.map((recipy) => {
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
function Filter({typeHandler, typeSelected}){
    let options = ["Indian", "Chinese", "Mexican", "American", "French"]
    return(
        <div className='w-full px-4 py-4 flex flex-row justify-evenly'>
            {options.map((items)=>{
                return(
                    <div onClick={()=>typeHandler(items)} key={items} className={`rounded-lg px-3 py-2 ${typeSelected === items ? "bg-green-400" : "bg-white"}   cursor-pointer`}>
                        {items}
                    </div>
                )
            })}
        </div>
    )
}

export function NavBar({searchText, setSearchText}){
    const navigate = useNavigate()
    const {pathname} = useLocation()
   
    

    return(
    <div className=" h-16 w-screen flex flex-row justify-center bg-white">
        <div className=" h-full w-[1440px] px-4 py-2 flex flex-row items-center gap-x-8">
            <div onClick={()=>navigate("/")} className={` cursor-pointer ${pathname === "/" ? "text-green-400" : "text-black"}`}>
                Home
            </div>
            <div className="flex-1 h-full items-center flex flex-row ">
                {pathname === "/" && 
            <input value={searchText} onChange={(e)=> setSearchText(e.target.value)} type="text" className='w-full h-10 rounded-lg px-2 outline-black bg-gray-200'  placeholder='Search' />
    }
            </div>
            <div onClick={()=>navigate("/favorite")} className={`cursor-pointer ${pathname === "/favorite" ? "text-green-400" : "text-black"}`}>
                Favorite
            </div>
            <div onClick={()=>navigate("/myrecipies")} className={`cursor-pointer ${pathname === "/myrecipies" ? "text-green-400" : "text-black"}`}>
                My recipies
            </div>
            <div onClick={()=>navigate("/addrecipy")} className={`cursor-pointer ${pathname === "/addrecipy" ? "text-green-400" : "text-black"}`}>
                Add recipy
            </div>
        </div>
    </div>
    )
}

export function Recipe ({isBig = false, id,  email, img, type, recipeName, isNavigating = false, isFromfav = false}) {

    const [isUserRecipe , setIsUserRecipe] = useState(false)
    const [isFav , setIsFav] = useState(false)
    const {user, setUser} = useContext(Context)
    const [isNotHidden, setIsNotHidden] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user && user.favorite){
            if(user.favorite.includes(id)){
                setIsFav(true)
            }else{
                setIsFav(false)
            }
        }
    },[user?.favorite])

    const favHandler = async() => {
        let url = link 
        if(isFav){
            url += "/deletefav"
        }else{
            url += "/addfav"
        }
        try {
          const response = await axios.post(url,{ email : user.email, id: id})
          if(response.data.success){
            
            setUser(prev => ({...prev, favorite : response.data.data}))
            if(isFromfav){
                setIsNotHidden(false)
            }
              
          }else{
              alert(response.data.message)
          }
      } catch (error) {
          console.log(error);
      }

    }
   
    useEffect(()=>{
        if(user){
            if(user.email === email){
                setIsUserRecipe(true)
            }
        }
    },[user])

    const deleteRecipe = async () => {
        let url = link + "/deleterecipy"
        try {
          const response = await axios.post(url,{ email : user.email, id: id})
          if(response.data.success){
            if(isNavigating){
                navigate("/")
                return
            }
              setIsNotHidden(false)
              
          }else{
              alert(response.data.message)
          }
      } catch (error) {
          console.log(error);
      }
    }
    return(
        <>
        {isNotHidden &&
        <div className={`${isBig ? "w-[450px]" : "w-[300px]"}  rounded-lg bg-white relative`}>
            <img className={`${isBig ? "w-[450px]" : "w-[300px]"} ${isBig ? "h-[225px]" : "h-[150px]"} object-cover rounded-t-lg`} src={img} alt="" />
            <div onClick={()=> favHandler()} className={`absolute top-1 right-1 ${isFav ? "text-red-500" : "text-white"}   cursor-pointer`}>
                <FavoriteIcon sx={{fontSize: 24}}/>
            </div>
            {isUserRecipe && 
            <div onClick={()=> deleteRecipe()} className={`absolute top-1 left-1  text-red-500 cursor-pointer`}>
                <DeleteOutlineIcon sx={{fontSize: 24}}/>
            </div>
}
            <div className="p-2">
                <div className=" flex flex-row justify-between">
                    <div>{recipeName}</div>
                    <div>{type}</div>
                </div>
            </div>
            {!isNavigating && 
            <div onClick={()=> navigate("/viewrecipy/" + id)} className='p-2 pt-0 text-end text-green-400 text-sm cursor-pointer'>
                View more
            </div>
}

        </div>
}
</>
    )
}