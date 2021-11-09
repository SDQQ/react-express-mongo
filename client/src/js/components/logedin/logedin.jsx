import React from 'react'
import { useDispatch} from 'react-redux';
import { logout } from '../../redux/actions/logout';


function Logedin({userData}) {
  const dispatch = useDispatch()

  const logOut= ()=>{
    localStorage.removeItem('token');
    dispatch(logout());
  }
  return (
    <div className="card col-6 mx-auto mt" style={{marginTop:"350px"}} >
      <div className="card-body d-flex justify-content-center flex-column">
        <h5 className="card-title text-center">Вы залогинины под ником:</h5>
        <p className="card-text text-center">
         {`${userData.username}`}
        </p>
        <button onClick={logOut} type="button" className="btn btn-primary ">Выйти</button>
      </div>
    </div>
  )
}

export default Logedin
