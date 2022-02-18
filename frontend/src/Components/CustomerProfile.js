import React from 'react'
import Navbar from "../Components/Navbar.js";
import { connect } from "react-redux";
import noProfileImage from '../images/noProfileImage.png';
import Axios from 'axios'; 
import firebase  from '../firebaseConfig';
import { updateCustomerProfile } from '../actions/customerDashBoard.js';
import { graphql, compose } from 'react-apollo';
import {getCustomerProfileQuery} from '../GraphQLQueries/queries/queries'
import { updateCustomerProfileMutation } from '../GraphQLQueries/mutation/mutations.js';
import config from '../urlConfig';
import {Redirect} from 'react-router-dom';


var states=['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class CustomerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            changedAttributes:{},
            Name:"",
            DateOfBirth:null,
            City:null,
            State:null,
            Country:null,
            Nickname:null,
            Email:"",
            PhoneNumber:"",
            edit:true,
            ImageUrl:noProfileImage
            
        }
        this.dateChange=this.dateChange.bind(this);
    }
    componentDidMount(){
        const details=this.props.customerDetails;
        //console.log("Check this",details);
        let d=details.DateOfBirth;
        if(details.DateOfBirth !== ""){
            let date=new Date(details.DateOfBirth);
            d=date.toISOString();
            d=d.split("T")[0];
        }
        this.setState({DateOfBirth:d,
            City:details.City,
            State:details.State,
            Country:details.Country,
            Name:details.Name,
            Nickname:details.Nickname,
            PhoneNumber:details.PhoneNumber,
            Email:details.Email            
        })
        if(details.ImageURL!==""){
            this.setState({ImageUrl:details.ImageURL})
        }   
     }
    handleChange= (e) =>{
        this.setState({[e.target.name]:e.target.value,changedAttributes:{...this.state.changedAttributes,[e.target.name]:true}});
    }
    handleFileUpload = async(e) =>{
        //console.log("Check pops",this.props.customerDetails);
        let details=this.props.customerDetails;
        const file=e.target.files[0];
        const imagesRef=firebase.storage().ref("customerImages").child(this.props.customerDetails.CustomerID);
        await imagesRef.put(file);
        imagesRef.getDownloadURL()
        .then(url=>{
            this.setState({ImageUrl:url});
            let data={
                customerID:this.props.customerDetails.CustomerID
            };
            data["ImageURL"]=url;
            details["ImageURL"]=url;
            this.props.updateProfile({
                variables : {
                    updateDetails : data
                }
            })
            // Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            // Axios.post(`${config.BackendURL}/updateCustomerProfile`,data)
            // .then(async (res)=>{
            //     //console.log("Update Successful");
            //     this.props.updateCustomerProfile(details);
            // })
            // .catch(err=>{
            //     console.log("Error");
            // })
        });
    }
    editClicked=()=>{
        this.setState({edit:!this.state.edit});
    }
    saveClicked=async()=>{
        
        let details=this.props.customerDetails;
        let data={
            customerID:this.props.customerDetails.CustomerID
        };
        for(const[key,value] of Object.entries(this.state.changedAttributes)){
            data[key]=this.state[key];
            details[key]=this.state[key];
        }
        //console.log("Changed",data);

        this.props.updateProfile({
            variables : {
                updateDetails : data
            }
        })
        // Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        // await Axios.post(`${config.BackendURL}/updateCustomerProfile`,data)
        //     .then(async (res)=>{
        //         //console.log("Update Successful");
        //         this.props.updateCustomerProfile(details);
        //         this.setState({edit:true,changedAttributes:{}});
        //     })
        //     .catch(err=>{
        //         console.log("Error");
        //     })
    }
    dateChange(e){
        this.setState({DateOfBirth:e.target.value,changedAttributes:{...this.state.changedAttributes,DateOfBirth:true}});
    }
    render(){
       // console.log(this.props.customerDetails);
    //    if(this.props.customerDetails===undefined || localStorage.getItem("token")===null){
    //     return <Redirect to='/'/>
    // }
        return (
            <React.Fragment style={{height:"100%",width:"100%"}}>
                <Navbar/>
                <div className="row" style={{textAlign:'center'}}>
                    <h1>Profile Settings</h1>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-1">
                        <div className="row" style={{width:"290px",height:"110px"}}>
                            <img src={this.state.ImageUrl} alt="Profile"/>
                        </div>
                        <div className="row" style={{width:"80%",alignItems:"center",marginTop:"190px",marginLeft:"11.5%"}}>
                            <input
                            ref="fileInput"
                            onChange={this.handleFileUpload}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            // multiple={false}
                            />
                            <button className="btn btn-primary" onClick={() => this.refs.fileInput.click()}>Upload Image</button>
                        </div>
                    </div>
                    <div className="col-md-7 offset-md-1" style={{fontWeight:"bold"}}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><h3>Basic Information</h3></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr style={{marginTop:"10%"}}>
                                    <td>Name:</td>
                                    <td>:</td>
                                    <td>
                                        <input type="text" name="Name" disabled={this.state.edit} value={this.state.Name} onChange={this.handleChange}/>
                                        </td>
                                </tr>
                                <tr>
                                    <td>Nickname</td>
                                    <td>:</td>
                                    <td>
                                        <input type="text" name="Nickname" disabled={this.state.edit} value={this.state.Nickname} onChange={this.handleChange}/>
                                        </td>
                                </tr>
                                <tr>
                                    <td>Date Of Birth</td>
                                    <td>:</td>
                                    <td>
                                        <input type="date" disabled={this.state.edit} value={this.state.DateOfBirth} onChange={this.dateChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>:</td><td>
                                        <input type="text" name="City" disabled={this.state.edit} value={this.state.City} onChange={this.handleChange}/>
                                      </td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>:</td>
                                    <td>
                                        <select class="form-select form-select-sm mb-3" name="State" style={{width:"100px"}} value={this.state.State} onChange={this.handleChange}>
                                            {states.map((state,index)=>{
                                                return <option  key={index}>{state}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>:</td>
                                    <td>
                                    <select name="Country" class="form-select form-select-sm mb-3" style={{width:"250px"}} value={this.state.Country} onChange={this.handleChange}>
                                            {country_list.map((country,index)=>{
                                                return <option  key={index}>{country}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3>Contact Information</h3></td>
                                </tr>
                                <tr>
                                    <td>Email ID</td>
                                    <td>:</td><td>
                                        <input type="email" name="Email" disabled={this.state.edit} value={this.state.Email} onChange={this.handleChange}/>
                                        </td>
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>:</td><td>
                                        <input type="text" pattern="\d*" disabled={this.state.edit}  maxlength="10" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange}/>
                                        </td>
                                </tr>
                                <tr style={{marginTop:"10px"}}>
                                    <td><button type="button" className="btn btn-primary" onClick={this.editClicked}>Edit</button></td>
                                    <td><button type="button" disabled={!Object.keys(this.state.changedAttributes).length>0} className="btn btn-primary" onClick={this.saveClicked}>Save</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    //console.log(state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateCustomerProfile:data=>dispatch(updateCustomerProfile(data))
    };
  }
export default compose(graphql(getCustomerProfileQuery , {name : "getProfile"}),graphql(updateCustomerProfileMutation, {name : "updateProfile"}))(CustomerProfile);
