import React from 'react';
import './Commercial.css';
import Mainpanelnav from '../mainpanel-header/Mainpanelnav';
import Addnewbtn from '../add-new-btn/Addnewbtn';

function Commercial() {
  return (
    <div className='mx-5 mt-3'>
      <Mainpanelnav />
      <Addnewbtn />
    </div>
  )
}

export default Commercial