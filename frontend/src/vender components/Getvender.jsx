
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getvender } from '../slices/venderSlice';

const Getvender = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
dispatch(getvender())
    })
  return (
    <div>
      
    </div>
  )
}

export default Getvender
