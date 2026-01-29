import React from 'react'
import './HeaderGrid.css'
import 'animate.css';
import dinnerIcon from '../../Assets/dinner.png'
import postpartum from '../../Assets/postpartum.png'
import burger from '../../Assets/burger.png'
import moreIcon from '../../Assets/more.png'
import lunch from '../../Assets/lunch.png'
import breakfastIcon from '../../Assets/breakfast.png'
import kueh from '../../Assets/kueh.png'
import { useNavigate } from 'react-router-dom';

function LayoutOne() {
  const navigate = useNavigate()

  const categories = [
    {
      id: 1,
      title: 'Berpantang Meals',
      icon: postpartum,
      navigate: true
    },
    {
      id: 2,
      title: 'Breakfast',
      icon: breakfastIcon,
      navigate: true
    },
    {
      id: 3,
      title: 'Lunch',
      icon: lunch,
      navigate: true
    },
    {
      id: 4,
      title: 'Snacks & Desserts',
      icon: kueh,
      navigate: true
    },
    {
      id: 5,
      title: 'Dinner',
      icon: dinnerIcon,
      navigate: true
    },
    {
      id: 6,
      title: 'Western',
      icon: burger,
      navigate: true
    },
    {
      id: 7,
      title: 'More',
      icon: moreIcon,
      navigate: false
    }
  ];

  const gotoSegments = (title) => {
    if (title !== 'More') {
      navigate('/segments', { state: title })
    }
  };

  return (
    <div className='layoutOne'>
      <div className="loHeaderWord">
        <span className='lohwb'>Whose <span className="openOrder">Open Order</span> today?</span>
      </div>

      <div className="loCarousel">
        {categories.map((category) => (
          <div
            key={category.id}
            className="locList"
            onClick={() => { gotoSegments(category.title) }}
          >
            <div className="locListImgCon">
              <img src={category.icon} alt={category.title} className='locListIcon' />
            </div>
            <span className="locListName">{category.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayoutOne