import React,{lazy} from 'react'
const Login = lazy(()=>import('./login'))

export default function LoginWrap({myClass}) {
  return (
    <div className={myClass}>
      <Login/>
    </div>
  )
}
