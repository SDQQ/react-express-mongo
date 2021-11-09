
import './create-post.scss'
import axios from 'axios'
import React,{useState, useEffect,useRef} from 'react'
import MyLoader from '../loader/loader'
import CreatePost from './create-post'
import SinglePost from './single-post'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector,useDispatch } from 'react-redux'
import { setAllPosts,setMyPosts } from '../../redux/actions/set-user-filter'


function PostsMain() {
  const filters = useSelector(state =>{
    return{
     filter: state.userFilters.postsFilter,
      user : state.setUser?.username
    }
  })
  const dispatch = useDispatch()
  const [createPost, setCreatePost] = useState(false)
  const [updatePostNotification, setUpdatePostNotification] = useState(false)
  const [infoForPostUpdate, setInfoForPostUpdate] = useState(null)
  const [data, setData] = useState(null)
  const [showLoader, setShowLoader] = useState(true)
  useEffect(async () => {
    const {data : postArr} = await axios.get('/api/createpost')
    if(postArr){
      setData(postArr)
      setShowLoader(false)
    }
  }, [])
  const ref = useRef()
  
  const changeCreatePost = (type) =>{
    switch(type){
      case 'create':
        return setCreatePost(!createPost)
      case 'update':
        return setUpdatePostNotification(!updatePostNotification)
    }
  }
  const upd = (type, post) =>{
    switch(type){
      case 'create':
       return setData(data =>[...data,post])
      case 'update':{
        const index = data.findIndex(item => item.postTheme === post.postTheme)
         setData( data => {
          post._id = Math.random()
          data[index] = post
          return data
         }) 
      }
    }
  }

  const deletePost = async( themeTitle ) =>{
    const result =await axios.delete(`api/createpost/${themeTitle}`)
    result.data.message==='Пост удалён' && setData(data=> data.filter(item=>item.postTheme != themeTitle))
    }
  const updatePost = (infoForUpdate) =>{
    setInfoForPostUpdate(infoForUpdate)
    setUpdatePostNotification(!updatePostNotification)
  }

  const filtredData =( userFilter ) =>{
    if(userFilter.user){
      switch(userFilter.filter){
        case 'ALL_POSTS':
          return data
        case 'MY_POSTS':
          return data.filter(item => item.username === userFilter.user)
        default:
          return data
      }
    }
    return data
  }
  const rectData = ref?.current && ref?.current.getBoundingClientRect() || null
  return (
    <>
    <CSSTransition in={createPost} timeout={500} unmountOnExit mountOnEnter classNames={'create-post'} > 
      <CreatePost updatePosts={upd} requestType={'create'}  changeCreatePost={changeCreatePost}/>
    </CSSTransition>

    <CSSTransition in={updatePostNotification} timeout={500} unmountOnExit mountOnEnter classNames={'create-post'} > 
      <CreatePost updatePosts={upd} disabled={true} infoForPost={infoForPostUpdate} requestType={'update'} changeCreatePost={changeCreatePost}/>
    </CSSTransition>

    <div className={'col-9 shadow-lg d-flex bg-light mt-5 mx-auto rounded-3 flex-column p-3 posts-main '}>
      <div className='z-10 d-flex posts-main__create-block'>
        <button type="button" onClick={()=> dispatch(setAllPosts())} className={`btn btn-primary ${!filters.user&&'disabled'}`}>Все</button>
        <button type="button" onClick={()=> dispatch(setMyPosts())} className={`btn ms-2 btn-primary ${!filters.user&&'disabled'}`}>Мои</button>
        <button onClick={()=>changeCreatePost('create')} type="button" className="btn btn-primary ms-auto check">Создать пост</button>
      </div>
      <div ref={ref} className='w-100 d-flex bg-light mt-3 rounded-3 flex-column p-3'>
      <TransitionGroup component={null}>
      {data&&
          filtredData(filters).map((item ) =>(
          <CSSTransition  
            key={item._id}
            timeout={{
              appear: 1000,
              enter: 1000,
              exit: 1000,
             }}
            unmountOnExit
            mountOnEnter
            classNames='post'
          >
            <SinglePost deletePost={deletePost} updatePost={updatePost}  data={ item }/>
          </CSSTransition>))
      }
        </TransitionGroup>
      {showLoader&&<MyLoader rectData={rectData}/>}
      </div>
    </div>
    </>
  )
}

export default PostsMain
