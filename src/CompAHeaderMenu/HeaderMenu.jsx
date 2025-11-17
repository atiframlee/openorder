import React from 'react'
import './HeaderMenu.css'
import {IconMenu2,IconSearch,IconBell,IconBuildingStore,IconMapPin} from '@tabler/icons-react'
import {useNavigate} from 'react-router-dom'

function Asegment() {
  const navigate = useNavigate()
  return (
        <div className="topMenu">
        <IconMenu2 size={16} className='iconRound' onClick={()=>{navigate('/')}}/>
        <IconMapPin size={16} className='iconRound'/>
        <IconSearch size={16} className='searchIcon iconRound' onClick={()=>{navigate('/search')}}/>
        <IconBuildingStore size={16} className='iconRound'/>
        <IconBell size={16} className='iconRound'/>
    </div>
  )
}

export default Asegment
