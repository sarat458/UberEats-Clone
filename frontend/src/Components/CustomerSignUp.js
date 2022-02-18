import React from 'react';
import UberEatsLogo from '../images/UberEatsLogo.png';
import { connect } from "react-redux";
import {signup} from '../actions/customerLogin.js';
import {Redirect} from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import { graphql, compose } from 'react-apollo';
import {customerSignupMutation} from '../GraphQLQueries/mutation/mutations'
class CustomerSignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {name:"",
                    email:"",
                password:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    
      handleSubmit=async (event)=> {
        event.preventDefault();
        var customerData={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        };
        //await this.props.signup(customerData);
        // this.props.customerSignup({
        //     variables : {
        //         name : this.state.name,
        //         email : this.state.email,
        //         password : this.state.password
        //     }
        // });
        console.log(this.props,this.props.CustomerSignup,this.props.customerSignupMutation);
        this.props.signup({
            variables : {
                name : this.state.name,
                email : this.state.email,
                password : this.state.password
            },
        });
      }

    render(){
        console.log(this.props);
        // if(this.props.customerSignUp!==undefined && this.props.customerSignUp==="Customer Signup Successful"){
        //     return <Redirect to='/customerLogin'/>
        // }
        return <React.Fragment>
            <HomeNavbar/>
            <div className="container" style={{width:'25%'}}>
                <div style={{textAlign:'center',marginTop:'17%'}}>
            
            <form onSubmit={this.handleSubmit}>
                <div ><img style={{width:'85%'}} src={UberEatsLogo} alt="Uber Eats"/></div>
                <div >
                    <div style={{marginTop:'3%'}}>
                        <h3>Customer Signup</h3>
                    </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="name">Name :</label></div>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="name" aria-describedby="name" placeholder="Enter Name" autoFocus required/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="email">Email address : </label></div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" required/>
                </div>
                <div className="form-group" style={{marginTop:'5%'}}>
                    <div style={{textAlign:'left',fontWeight:'bolder',padding:'5px'}}><label htmlFor="password">Password :</label></div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password" required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-success btn-lg" style={{width:"350px"}}>Sign Up</button>
                </div>
                <div style={{marginTop:"5%"}}>
                    <span style={{fontSize:"20px"}}>Already using Uber?</span>&nbsp;<a href='/customerLogin' style={{textDecoration:"none",color:"green",fontSize:"20px"}}>Log into account</a>
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>;
    }
}
// const mapStateToProps = (state) =>{
//     return {customerSignUp:state.customerLoginReducer.customerSignUp}
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         signup: data => dispatch(signup(data))
//     };
//   }
export default compose(graphql(customerSignupMutation , {name : "signup"}))(CustomerSignUp);