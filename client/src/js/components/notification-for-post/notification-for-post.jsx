import React,{useState} from 'react'
import './notification-for-post.scss'

function NotificationForPost({ alertText,changeCreatePost,requestType}) {
  const [visibility, setVisibility] = useState(true)
  const changeVisibility= () => {
    setVisibility(!visibility)
    changeCreatePost(requestType)
  }

  return (
    <>
    {visibility? 
    <div className="notification-for-post">
      <div className="col-2 d-flex justify-content-center flex-column rounded-3 text-black post post-notification">
        <p className='text-center mb-2 mx-2 pt-2'>{alertText}</p>
        <button autoFocus onClick={changeVisibility} type="button" className="btn btn-success rounded-0 rounded-bottom">
         Хорошо
        </button>
      </div>
    </div>:
    null}
    </>
  )
}

export default NotificationForPost
