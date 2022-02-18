import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png';
import { connect } from "react-redux";
import {login} from '../actions/customerLogin.js';
import {Redirect} from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
class CustomerLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                    email:"",
                password:"",
                loginError:""
            };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    
      handleSubmit=async(event)=> {
            
        event.preventDefault();
        
        var customerData={
            email:this.state.email,
            password:this.state.password
        }
        await this.props.login(customerData);
        if(this.props.customerLoginError!==undefined)
            this.setState({loginError:this.props.customerLoginError})
        //console.log(this.props);
      }

    render(){
        if(this.props.customerLogin!==undefined){
            return <Redirect to='/customerDashboard'/>
        }
        return <React.Fragment>
            <HomeNavbar/>
            <div className="container" style={{width:'25%'}}>
                <div style={{textAlign:'center',marginTop:'17%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                    <div style={{marginTop:'3%'}}>
                        <h3>Customer Login</h3>
                    </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="email">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" autoFocus required={true}/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="password">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password" required/>
                </div>
                <div className="text-danger">
                   {this.state.loginError!==""?<h5>{this.state.loginError}.Please Try again!</h5>:null}
                </div>
                <br/>
                <button type="submit" className="btn btn-success btn-lg btn-block" style={{width:"350px"}}>Login</button>
                </div>
                <div style={{marginTop:"5%"}}>
                    <span style={{fontSize:"22px"}}>New to Uber?</span>&nbsp;<a href='/customerSignup' style={{textDecoration:"none",color:"green",fontSize:"20px"}}>Create an account</a>
                </div>
                
            </form>
            </div>
            </div>
        </React.Fragment>;
    }
}

const mapStateToProps = (state) =>{
    //console.log("Check",state);
    return {
        customerLogin:state.customerLoginReducer.customerLogin,
        customerLoginError:state.customerLoginReducer.customerLoginError
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: data => dispatch(login(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerLogin);