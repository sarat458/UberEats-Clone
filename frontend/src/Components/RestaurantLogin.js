import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png';
import { connect } from "react-redux";
import { restaurantLogin } from '../actions/restaurantLogin';
import {Redirect} from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
class RestaurantLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                    email:"",
                password:""
            };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    
      handleSubmit= async(event)=> {
        event.preventDefault();
        let restDetails={
            email:this.state.email,
            password:this.state.password
        }
        await this.props.login(restDetails);
       // console.log("Check this",this.props);
      }

    render(){
        if(this.props.restaurantLogin!==undefined){
            return <Redirect to='/restaurantDashboard'/>
        }
        return <React.Fragment>
            <HomeNavbar/>
            <div className="container" style={{width:'25%'}}>
                <div style={{textAlign:'center',marginTop:'17%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                    <div style={{marginTop:'3%'}}>
                        <h3>Restaurant Login</h3>
                    </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="email">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email"/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="password">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password"/>
                </div>
                <div className="text-danger">
                    {this.props.restaurantLoginError!==undefined?<h5>{this.props.restaurantLoginError}.Please try again!</h5>:null}
                </div>
                <br/>
                <button type="submit" className="btn btn-success btn-lg btn-block" style={{width:"350px"}}>Login</button>
                </div>
                <div style={{marginTop:"5%"}}>
                    <span style={{fontSize:"22px"}}>New to Uber?</span>&nbsp;<a href='/restaurantSignup' style={{textDecoration:"none",color:"green",fontSize:"20px"}}>Create an account</a>
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>;
    }
}
const mapStateToProps = (state) =>{
    console.log(state);
    return {
        restaurantLogin:state.restaurantLoginReducer.restaurantLogin,
        restaurantLoginError:state.restaurantLoginReducer.restaurantLoginError
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login:data=>dispatch(restaurantLogin(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantLogin);