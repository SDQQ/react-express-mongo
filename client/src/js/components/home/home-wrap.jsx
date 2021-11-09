import React,{lazy} from 'react'
// import Home from './home'
const Home = lazy(()=>import('./home') )

export default function HomeWrap({myClass}) {
  return (
    <div className ={myClass}>
      <Home/>
    </div>
  )
}
