import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as CgIcons from 'react-icons/cg';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';
import * as MdIcons from 'react-icons/md';
import { useDispatch } from "react-redux";
import {logout} from '../actions/customerLogin.js';
function HomeNavbar() {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const logout1 = () =>{
    dispatch(logout());
}
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{height:"5%"}} >
          <Link to='#' className='menu-bars'>
            <GoIcons.GoThreeBars onClick={showSidebar} />
          </Link>
          <Link to="#" className='menu-bars' style={{color:"white",textDecoration:"none"}}>
            UberEats
          </Link>
          {/* <img style={{width:'2%'}} src={UberEatsLogo} alt="Uber Eats"/> */}
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="nav-text">
              <Link to='/'>
              <AiIcons.AiOutlineHome/>
              <span>Home</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='/customerLogin'>
              <CgIcons.CgProfile/>
              <span>Customer Login</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='/restaurantLogin'>
              <CgIcons.CgProfile/>
              <span>Restaurant Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default HomeNavbar;