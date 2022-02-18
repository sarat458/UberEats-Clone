import React from 'react'
import subway from '../images/subway.jpg'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import { connect } from "react-redux";
import noProfileImage from '../images/noProfileImage.png';
import { viewRestaurantPage,updateFavouriteRestaurants,setFoodType } from '../actions/customerDashBoard';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import config from '../urlConfig';
class RestaurantCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            restaurantData:{},
            clicked:false,
            favClicked:false
        }
    }
    itemClicked=(e)=>{
        e.stopPropagation();
        
        //console.log(this.props);
        if(this.props.foodType===undefined){
            this.props.viewRestaurantPage(this.props.data);
        }else{
            let data=this.props.data;
            data["foodType"]=this.props.foodType;
            this.props.viewRestaurantPage(data);
            this.props.setFoodType(undefined);
        }
        this.setState({clicked:true});
    }
    add=(e)=>{
       
        //console.log("Clicked");
        let postData={
            customerID:this.props.customerDetails.CustomerID,
            restaurantID:e.target.id
        }
        this.setState({favClicked:true});
       // console.log(postData);
       Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.post(`${config.BackendURL}/addToFavourites`,postData)
        .then(res=>{
            console.log("Insertion Successful");
            this.props.updateFavouriteRestaurants(e.target.id);
        })
        .catch(err=>{
            console.log(err);
        })
        e.stopPropagation();
    }
    render(){
        const {favRestaurants}=this.props;
       // console.log("Card",favRestaurants);
       // console.log("Props",this.props);
        if(this.state.clicked){
            return <Redirect to='/restaurantViewPage'/>
        }
        const {data}=this.props;
        if(data!==undefined && Object.keys(this.state.restaurantData).length===0){
            this.setState({restaurantData:data});
        }
        //console.log(data.ImageURL);
        if(data.ImageURL==="" || data.ImageURL===null || data.ImageURL===undefined){
            data.ImageURL=noProfileImage;
        }
        return (
            <React.Fragment>
                {data!==undefined?<div ><MDBCard style={{ maxWidth: '22rem',borderColor:"black",borderWidth:"3px",borderRadius:"8px" }}>
                    <MDBCardImage id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} src={data.ImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{color:"black"}}>
                        <MDBCardTitle  id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}} style={{textAlign:"center"}}>{data.Name}</MDBCardTitle>
                        <MDBCardText id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}  style={{fontSize:"14px",borderTop:"3px solid black"}}>
                            <b>Timings:{data.Timings}
                            <span id={data.RestaurantID} onClick={(e)=>{this.itemClicked(e)}}>Location:{data.Location}</span></b>
                            <div>
                                <button type="button" className="btn btn-primary" id={data.RestaurantID} onClick={(e)=>{this.add(e)}}  disabled={favRestaurants[data.RestaurantID]!==undefined || this.state.favClicked}>Add To Favourites</button>
                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard></div>:null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        customerDetails:state.customerLoginReducer.customerLogin,
        foodType:state.customerDashBoardReducer.foodType
    }
}
function mapDispatchToProps(dispatch) {
    return {
        viewRestaurantPage:(data)=>dispatch(viewRestaurantPage(data)),
        updateFavouriteRestaurants:(data)=>dispatch(updateFavouriteRestaurants(data)),
        setFoodType:(type)=>dispatch(setFoodType(type))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantCard);
