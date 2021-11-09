import React, { useEffect,lazy, Suspense} from 'react'
import { CSSTransition } from 'react-transition-group'
import { Route } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/actions/set-user'

const Navigation = lazy(()=> import('../navigation/navigation'))
// const Register = lazy(()=> import('../register/register'))
// const Login = lazy(()=> import('../login/login'))
// const PostsMain = lazy(()=> import('../posts/posts-main'))
// const HomeWrap = lazy(()=> import('../home/home-wrap'))
const Test = lazy(()=> import('../test/test'))

// import Navigation from '../navigation/navigation'
import RegisterWrap from '../register/register-wrap'
import LoginWrap from '../login/login-wrap'
import PostsMainWrap from '../posts/posts-main-wrap'
import HomeWrap from '../home/home-wrap'
// import Test from '../test/test'

import './app.scss'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getUser())
  }, [])
  const routes = [
    { path: '/', name: 'Home', Component: HomeWrap },
    { path: '/posts', name: 'posts', Component: PostsMainWrap },
    { path: '/register', name: 'register', Component: RegisterWrap },
    { path: '/login', name: 'login', Component: LoginWrap },
    { path: '/test', name: 'test', Component: Test },
  ]

  return (
    <div className='container-lg mt-5 position-relative'>
        <Suspense fallback ={<div>загрузка</div>}>
          <Navigation />
        </Suspense>

      {routes.map(({ path, Component }) => 
        <Suspense fallback key={path} >
          <Route path={path} exact >
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={500}
                classNames="page"
                unmountOnExit
                mountOnEnter
              >
                  <Component myClass='page'/>
              </CSSTransition>
            )}
          </Route>
        </Suspense>
      )}
      
    </div>
  )
}

export default App
