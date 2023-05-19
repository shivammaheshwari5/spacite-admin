// import React, { useContext } from 'react';
import './Commercial.css';
import Mainpanelnav from '../mainpanel-header/Mainpanelnav';
// import { AppContext } from '../../context/context';
import Addpropertybtn from '../add-new-btn/Addpropertybtn';
import { Link } from 'react-router-dom';

function Commercial() {
  // const myModal = useContext(AppContext);
  // console.log(myModal)

  return (
    <div className='mx-5 mt-3'>
      <Mainpanelnav />
      <Link to="/commercial/add-commercial-property">
      <Addpropertybtn />
      </Link>
    </div>
  )
}

export default Commercial