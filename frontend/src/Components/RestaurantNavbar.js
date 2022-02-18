import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';
import { restaurantLogout } from '../actions/restaurantLogin';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

function RestaurantNavbar() {
    const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  
  const logout = () =>{
    localStorage.removeItem("resttoken");
    localStorage.removeItem("restaurant_id");
    localStorage.removeItem("restaurantname");
    localStorage.removeItem("type2");
      dispatch(restaurantLogout());
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{height:"5%"}}>
          <Link to='#' className='menu-bars'>
            <GoIcons.GoThreeBars onClick={showSidebar} />
          </Link>
          <Link to="/restaurantDashboard" className='menu-bars' style={{color:"white",textDecoration:"none"}}>
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
              <Link to='/restaurantDashboard'>
              <AiIcons.AiOutlineHome/>
              <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='/restaurantOrders'>
              <RiIcons.RiOrderPlayLine/>
              <span>Orders</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='/restaurantMenu'>
              <BiIcons.BiFoodMenu/>
              <span>Menu</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='#'>
                <FaIcons.FaSignOutAlt/>
              <span onClick={logout}>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
const mapStateToProps = (state) =>{
    //console.log(state);
    return {
        restaurantDetails:state.restaurantLoginReducer.restaurantLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        restaurantLogout: () => dispatch(restaurantLogout())
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantNavbar);;