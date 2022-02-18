import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import noProfileImage from '../images/noProfileImage.png';
import {Redirect} from 'react-router-dom';
import {viewRestaurantPage} from '../actions/customerDashBoard.js';
import config from '../urlConfig';
class FavouriteRestaurants extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favRestaurants:[],
            clicked:false
        }
    }
    componentDidMount(){
        //console.log("Here");
        const {customerDetails}=this.props;
       // console.log(customerDetails);
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.get(`${config.BackendURL}/getFavouriteRestaurants?customerID=${customerDetails.CustomerID}`)
        .then(res=>{
            //console.log(res.data);
            this.setState({favRestaurants:res.data});
        })
    }
    buildCardStructure = (data) =>{
        console.log("Call check",data);
        let row=[];
        if(data!==undefined && data.length>0){
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                            {this.restCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+1])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.restCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.restCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.restCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        console.log("row",row);
        return row;
    }
    itemClicked=(e)=>{
        e.stopPropagation();
        let restID=e.target.id;
        let data=this.props.restaurantData;
        let restData={};
        data.map(rest=>{
            if(rest.RestaurantID===restID){
                restData=rest;
            }
        })
        this.props.viewRestaurantPage(restData);
        this.setState({clicked:true});
    }
    restCard=(data)=>{
        if(data.ImageURL==="" || data.ImageURL===null || data.ImageURL===undefined){
            data.ImageURL=noProfileImage;
        }
        return (<MDBCard style={{ maxWidth: '22rem',borderColor:"black",borderWidth:"3px",borderRadius:"8px" }}>
        <MDBCardImage id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} src={data.ImageURL} position='top' alt='Image' style={{height:"150px"}} />
        <MDBCardBody id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{color:"black"}}>
            <MDBCardTitle  id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{textAlign:"center"}}>{data.Name}</MDBCardTitle>
            <MDBCardText id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}  style={{fontSize:"14px",borderTop:"3px solid black"}}>
                <b>Timings:{data.Timings}
                <span id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}>Location:{data.Location}</span></b>
            </MDBCardText>
        </MDBCardBody>
        </MDBCard>)
    }
    render(){
        if(this.state.clicked){
            return <Redirect to='/restaurantViewPage'/>
        }
        // if(this.props.customerDetails===undefined || localStorage.getItem("token")===null ){
        //     return <Redirect to='/'/>
        // }
        return (<React.Fragment>
                <Navbar/>
                <div className="container" style={{textAlign:"center"}}>
                <h1>Favourite Restaurants</h1>
                </div>
                <div>
                    {this.buildCardStructure(this.state.favRestaurants)}
                </div>
                </React.Fragment>
                )
    }
}
const mapStateToProps = (state) =>{
    console.log(state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin,
        restaurantData:state.customerDashBoardReducer.restaurantData,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        viewRestaurantPage:(data)=>dispatch(viewRestaurantPage(data)),
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(FavouriteRestaurants);
