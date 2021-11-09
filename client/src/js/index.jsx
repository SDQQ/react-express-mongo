import 'regenerator-runtime/runtime'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.scss'

import store from './redux/store'
import React,{Suspense,lazy} from 'react'
import ReactDOM from 'react-dom'
// import App from './components/app/app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const App = lazy(()=>import('./components/app/app'))

const app = (
  <BrowserRouter basename="/">
    <Provider store ={store}>
      <Suspense fallback>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
