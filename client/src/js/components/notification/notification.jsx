import React from 'react'
import './notification.scss'

const Notification = ({ name, onChangeNotification, type }) => {
 

  const checkType = (type) => {
    switch (type) {
      case 'login':
        return 'Вы успешно залогинились под ником'
      case 'register':
        return 'Вы успешно зарегистрировались под ником'
      default:
        'Что то пошло не так...'
    }
  }

  return (
    <div className="notification-wrap">
      <div className="col-3 bg-light bg-gradient rounded-3 d-flex flex-column shadow notification">
        <h2 className="text-center fs-5 p-2">{`${checkType(type)} ${name}`}</h2>
        <button
          autoFocus
          onClick={onChangeNotification}
          type="button"
          className="btn btn-success rounded-0 rounded-bottom"
        >
          Хорошо
        </button>
      </div>
    </div>
  )
}

export default Notification
