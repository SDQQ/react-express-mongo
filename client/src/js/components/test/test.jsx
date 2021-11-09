import React from 'react'
import axios from 'axios'

export default function Test({myClass}) {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { Authorization: `${localStorage.getItem('token')}` },
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(config)
      return config
    },
    (err) => {
      console.log(err)
    }
  )
  const testA = () => {
    axiosInstance.get('/api/test')
  }

  return (
    <div className={myClass}>
      <button onClick={testA} className="btn-lg fs-1 btn-danger mx-auto">
        ТЫк
      </button>
    </div>
  )
}
