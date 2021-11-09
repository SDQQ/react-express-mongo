import React,{lazy} from 'react'
const Register = lazy(()=>import('./register'))

export default function RegisterWrap({myClass}) {
  return (
    <div className={myClass}>
      <Register/>
    </div>
  )
}
