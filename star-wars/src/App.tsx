import './App.css'
import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const { Home } = lazily(() => import("./components/Home"))
import { lazily } from './utils/Lazily'


export const App =  ()=> {



  return (
        <Suspense fallback={<p>Loading...</p>}>
<BrowserRouter >
<Routes>
<Route path={`/`} element={<Home />} />
</Routes>
</BrowserRouter>
        </Suspense>
     
  )
}

