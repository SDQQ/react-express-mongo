import React,{lazy} from 'react'
const PostsMain = lazy(()=>import('./posts-main'))

export default function PostsMainWrap({myClass}) {
  return (
    <div className={myClass}>
      <PostsMain/>

    </div>
  )
}
