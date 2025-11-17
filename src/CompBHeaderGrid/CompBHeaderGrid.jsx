import React from 'react'
import './CompBHeaderGrid.css'
import 'animate.css';
import dinnerIcon from '../Assets/dinner.png'
import postpartum from '../Assets/postpartum.png'
import burger from '../Assets/burger.png'
import moreIcon from '../Assets/more.png'
import lunch from '../Assets/lunch.png'
import breakfastIcon from '../Assets/breakfast.png'
import kueh from '../Assets/kueh.png'
import { useNavigate } from 'react-router-dom';

function LayoutOne() {

  const navigate = useNavigate()

    const gotoSegments = (title) =>{
    navigate('/segments', {state:title})
  };
  
  return (
    <div className='layoutOne'>
   

      <div className="loHeaderWord">
        <span className='lohwb'>Whose <span className="openOrder">Open Order</span> today?</span>
      </div>

    <div className="loCarousel">

    <div className="locList" onClick={()=>{gotoSegments('Berpantang Meals')}}>
    <img src={postpartum} alt="bi" className='locListIcon' />
     <span className="locListName">Berpantang Meals</span>
    </div>
    
    <div className="locList" onClick={()=>{gotoSegments('Breakfast')}}>
      <img src={breakfastIcon} alt="bi" className='locListIcon' />
      <span className="locListName">Breakfast</span>
    </div>

    <div className="locList" onClick={()=>{gotoSegments('Lunch')}}>
      <img src={lunch} alt="bi" className='locListIcon' />
      <span className="locListName">Lunch</span>
    </div>

    <div className="locList" onClick={()=>{gotoSegments('Snacks & dessert')}}>
    <img src={kueh} alt="bi" className='locListIcon' />
      <span className="locListName">Snacks & Desserts</span>
    </div>

    <div className="locList" onClick={()=>{gotoSegments('Dinner')}}>
      <img src={dinnerIcon} alt="bi" className='locListIcon' />
      <span className="locListName">Dinner</span>
    </div>

    <div className="locList" onClick={()=>{gotoSegments('Western')}}>
      <img src={burger} alt="bi" className='locListIcon' />
      <span className="locListName">Western</span>
    </div>

    <div className="locList">
    <img src={moreIcon} alt="bi" className='locListIcon' />
      <span className="locListName">More</span>
    </div>
    
    </div>
    

    </div>
  )
}

export default LayoutOne
