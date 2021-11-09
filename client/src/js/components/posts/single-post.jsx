import Star from '../../../img/svg/star.svg'
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'

function SinglePost({data, deletePost,updatePost}) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [counter, setCounter] = useState(0)
  const [starArr, setStarArr] = useState([{hover:false},{hover:false},{hover:false},{hover:false},{hover:false},])
  useEffect(()=>{
    if(!selectedRating){
      setStarArr(arr =>{
        for (let i = 0; i < counter; i++) {
          arr[i] = {hover: true}
        }
        for (let i = 4; i >= counter; i--) {
          arr[i] = {hover: false}
        }
        return [...arr]
      })
    }
  },[counter])
  const user = useSelector(({ setUser } )=> setUser )
  const selectRating = (number) =>{
    setSelectedRating(number)
  }
 
  return (
    <div className='mb-4 w-75 d-flex shadow-lg flex-column rounded-3 overflow-hidden single-post'>
      <div className='d-flex p-2 justify-content-between'>
        <span className ='text-white'>Автор : {data.username}</span>
        <span className ='text-white'>{data.date.slice(0,-3)}</span>
      </div>
      <p className='px-2 fw-bold fs-4 text-break'>{data.postTheme}</p>
     {
      data.postText.split('\n').map((item,i)=> item === '' ? null : <p key={i} className='px-2 mb-2 lh-sm fs-6 '>{item}</p>)
      }
      <div className='d-flex ps-2 pb-1 align-items-center'>
        <div className ='d-flex' onMouseLeave={()=>setCounter(0)} >
          {starArr.map((item,i)=> <div onClick={()=>selectRating(i+1)} onMouseEnter={()=> setCounter(i+1)}key={Math.random()} className='px-1'> <Star  className={item.hover===true ?'star-svg':'svg'} /> </div>)}
        </div>
        {user?.username === data.username &&
       <div className='d-flex ms-auto me-1 '>
            <button onClick={()=>updatePost({postTheme: data.postTheme,postText : data.postText})} className= 'btn btn-secondary'>Редактировать</button>
            <button onClick={()=>deletePost(data.postTheme)} className= 'btn ms-2 btn-danger'>Удалить</button>
      </div>
      }

      </div>
    
    </div>
  )
}

export default SinglePost
