import './create-post.scss'
import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import NotificationForPost from '../notification-for-post/notification-for-post'
import axios from 'axios'


function CreatePost({updatePosts , changeCreatePost , requestType, infoForPost ,disabled = false}) {
  const [errors, setErrors] = useState({themeInput:null,textInpun:null})
  const [textNotif, setTextNotif] = useState('Тема создана')
  const [postInfo, setPostInfo] = useState(infoForPost ? infoForPost : {postTheme:'',postText:''} )
  const [showNotification, setShowNotification] = useState(false)
  const user = useSelector(({setUser})=>setUser?.username) 
 
  const setInfo =( e ,type) =>{
    setPostInfo(state=>{
      return {
        ...state,
        [type]: e.target.value
      }
    })
  }
  const textForNotification = (text) =>{
    setTextNotif(text)
    setShowNotification(true)
  }
  // const sendPostControll
  const catchBlock = (err)=>{
    const errArr = err.response.data.errors.errors
    let themeErr = null
    let textErr = null
    errArr.forEach(element => {if (element?.param === 'postTheme') themeErr = element.msg }) 
    errArr.forEach(element =>{if ( element?.param === 'postText') textErr = element.msg}) 
    setErrors({...errors,themeInput:themeErr,textInpun: textErr})
  }
  const sendPost = async (type) =>{
    if(type==='create'){
      const answear = await axios.post('/api/createpost',{
        ...postInfo,
        username: user,
        date: new Date().toLocaleString('ru-RU')})
        .catch(catchBlock)
       
        if(answear?.data?.message==="Тема создана"){
          setErrors({themeInput:null,textInpun:null})
          textForNotification('Тема создана')
          updatePosts('create',answear.data.ansPost)
        } 
    }
    if(type==='update'){
      const answear = await axios.put('/api/createpost',{
        ...postInfo,
       })
        .catch(catchBlock)
       
        if(answear?.data?.message==="Тема обновлена"){
          setErrors({themeInput:null,textInpun:null})
          textForNotification('Тема обновлена')
          const updatedPost = {
            ...answear.data.ansPost,
            postText:postInfo.postText,
            postTheme:postInfo.postTheme
          }
          updatePosts('update',updatedPost)
        } 
    }
   
      
  }
    return (
      <>
    {showNotification && <NotificationForPost alertText={textNotif}requestType={requestType} changeCreatePost={changeCreatePost}/>} 
    {user? 
      <div className='post-wrap'>
        <div className='d-flex shadow-lg justify-content-center flex-column p-3 rounded-3 text-white post'>
          <button onClick={()=>changeCreatePost(requestType)} type="button" className="btn btn-danger ms-auto check">Отмена</button>
          
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className={`form-label fs-3 post-label ${errors.themeInput?'error':''}` }>{errors.themeInput? `${errors.themeInput}`: `Тема поста`}</label>
            <input onChange={e => setInfo(e, 'postTheme')} disabled={disabled} value={postInfo.postTheme} autoFocus type="text" className="form-control shadow-none" id="exampleFormControlInput1" placeholder="Как готовить шаверму"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className={`form-label fs-3 post-label ${errors.textInpun?'error':''}` }>{errors.textInpun? `${errors.textInpun}`: `Текст поста`}</label>
            <textarea onChange={e => setInfo(e, 'postText')} value={postInfo.postText} className="form-control" id="exampleFormControlTextarea1" rows="13"></textarea>
          </div>
          <button onClick={()=>sendPost(requestType)} type="button" className="btn btn-success w-100 check">Отправить</button>
        </div>
      </div>:
        <NotificationForPost alertText={'Залогиньтесь'}requestType={requestType} changeCreatePost={changeCreatePost}/>}
      </>
    )
  
}

export default CreatePost
