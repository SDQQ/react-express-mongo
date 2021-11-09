import './home.scss'
import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


function Home() {
  const [arrWithNumbers, setArrWithNumbers] = React.useState([])
  const [show, setShow] = React.useState(false)
  const changeShow = ()=>{
    setShow(!show)
  }
  const createRandomNumbers = () =>{
     let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(Math.ceil(Math.random()*100000))
    }
    setArrWithNumbers(arr)
    // setArrWithNumbers(new Array(10).fill(Math.ceil(Math.random()*1000))) // не работает как надо
  }
  const filterNumbers = (filter) =>{
    switch (filter){
      case 'bigger':
       setArrWithNumbers(arr => [...arr.sort((a,b)=> a - b)])
       break
      case 'lower':
       setArrWithNumbers(arr =>[...arr.sort((a,b)=> b - a)])
       break
      default :
        return null
    }
  }

  const calculationHeight= (number)=>{
    const max = Math.max(...arrWithNumbers)
    const percentFromMax = number / max * 100
    return percentFromMax / 100 * 300
  }
  // Процент x от числа N считется по следующей формуле:

  // x% * N = x/100 * N
//   2. 20% от числа 50 равны 10.
// 20 / 100 * 50 
  return (
    <>
      <div className={'col-8 shadow-lg d-flex bg-light mt-5 mx-auto rounded-3 flex-column p-3 align-items-center justify-content-center home-block '}>
          <CSSTransition
          in = {show}
          timeout ={{
            enter: 1000,
            exit: 1000
          }}
          unmountOnExit
          mountOnEnter
          classNames ={'box'}
          >
            <div className='w-25 h-25 bg-primary p-5 m-5'/>
          </CSSTransition>
        <button  onClick={changeShow} className='btn btn-info btn-lg w-25'>КНОПКА</button>
      </div>
    
        <div className = 'mb-5 col-8 shadow-lg d-flex bg-light mt-5 mx-auto rounded-3 flex-column p-3 align-items-center justify-content-center h'>
          <div className= 'shadow-lg d-flex align-items-end justify-content-around random-count__block bg-secondary rounded-3'>
            <TransitionGroup component={null}>
             {arrWithNumbers.map(number =>
               <CSSTransition
               timeout ={{
                enter: 600,
                exit: 0
              }}
              key={Math.random()}
              classNames ={'show-arr'}
                >
             <div style={{height : calculationHeight(number)+'px'}} className ='text-center fs-6 random-count__item'><span>{number}</span></div>
               </CSSTransition>)}
            </TransitionGroup>
          </div>
          <div className = 'd-flex col-8 justify-content-around'>
            <button onClick={createRandomNumbers} className='btn btn-success mt-2' type='button' >Рандомим цифры</button>
            <button onClick={()=> filterNumbers('bigger')} className={`btn btn-primary mt-2 ${arrWithNumbers.length?'':'disabled'}`} type='button' >По увеличению</button>
            <button onClick={()=> filterNumbers('lower')} className={`btn btn-secondary mt-2 ${arrWithNumbers.length?'':'disabled'}`} type='button' >По уменьшению</button>
          </div>
      </div>
      </>
  )
}

export default Home
