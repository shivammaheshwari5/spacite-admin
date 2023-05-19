import React from 'react'
import Mainpanelnav from '../mainpanel-header/Mainpanelnav'

function Addcommercial() {
  return (
    <div className='mx-5 mt-3'>
    <Mainpanelnav />
    <div className='container form-box'>
        <form>
            <input className='property-input' type="text" placeholder="Builder" />
            <input className='property-input' type="text" placeholder="Name" />
        </form>
    </div>
    </div>
  )
}

export default Addcommercial