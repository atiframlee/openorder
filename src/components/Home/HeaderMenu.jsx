import React from 'react'
import './HeaderMenu.css'
import {IconMenu2,IconSearch,IconBell,IconBuildingStore,IconMapPin} from '@tabler/icons-react'
import {useNavigate} from 'react-router-dom'

function Asegment() {
  const navigate = useNavigate()
  return (
    <div className="topMenu">
        <IconMenu2 size={15} className='iconRound' onClick={()=>{navigate('/')}}/>
        <IconMapPin size={15} className='iconRound'/>
        <IconSearch size={15} className='searchIcon iconRound' onClick={()=>{navigate('/search')}}/>
        <IconBuildingStore size={15} className='iconRound' onClick={()=>{navigate('/vendor-dashboard')}}/>
        <IconBell size={15} className='iconRound'/>
    </div>
  )
}

export default Asegment
