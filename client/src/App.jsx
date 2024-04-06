
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Screen/Home'
import Login from './Screen/Login'
import Signup from './Screen/Signup'
import { useState } from 'react'
import Context from './context'
import Favorite from './Screen/Favorite'
import MyRecipies from './Screen/MyRecipies'
import ViewRecipe from './Screen/ViewRecipe'
import AddRecipy from './Screen/AddRecipy'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/favorite",
    element: <Favorite/>
  }
  ,
  {
    path: "/myrecipies",
    element: <MyRecipies/>
  },
  {
    path: "/viewrecipy",
    element: <ViewRecipe/>
  },
  {
    path: "/addrecipy",
    element: <AddRecipy/>
  }
])

function App() {
    const [user, setUser] = useState(null)
  return (
    <Context.Provider value={{user, setUser}}>
      <RouterProvider router={router}/>
    </Context.Provider>
  )
}

export default App
