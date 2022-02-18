import React from 'react'
import Navbar from "../Components/Navbar.js";
import RestaurantCard from './RestaurantCard.js';
import noProfileImage from '../images/noProfileImage.png';
import { connect } from "react-redux";
import {getRestaurants,searchRestaurants,updateFavouriteRestaurants,setRestaurants,setFoodType} from '../actions/customerDashBoard.js';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import config from '../urlConfig';
class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search:"",
            mode:"",
            restaurantData:[],
            favRestaurants:{}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount=async ()=>{
        await this.props.getRestaurants();
        //console.log(this.props.restaurantData);
        const {customerDetails}=this.props;
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.get(`${config.BackendURL}/getFavouriteRestaurants?customerID=${customerDetails.CustomerID}`)
        .then(res=>{
           // console.log(res.data);
            let id={};
            console.log("Fav Data Check",res.data);
            res.data.map((rest)=>{
                if(rest===null) return;
                id[rest.RestaurantID]=true;
            })
            this.setState({favRestaurants:id});
        });
        const {restaurantData}=this.props;
        const {City}=this.props.customerDetails;
        //let restData=restaurantData.filter(data=>data.Location===City);
        //restData=[...restData,...restaurantData.filter(data=>data.Location!==City)];
        this.props.setRestaurants(restaurantData);

    }
   
    handleChange=(e)=>{
        if(e.target.value===""){
            this.props.setRestaurants(this.props.restaurantData);
        }
        this.setState({search:e.target.value});
    }
    handleChangeDeliveryType=(e)=>{
        const {value}=e.target;
        if(value==="Select type of Delivery"){
            localStorage.setItem('DeliveryType',"Delivery");
            this.props.setRestaurants(this.props.restaurantData);
            return;
        }
        if(this.state.search!==""){
            const {restaurantDataMod} = this.props;
            this.setState({search:this.state.search});
            let restData=restaurantDataMod.filter(data=>data.ModeOfDelivery===(value==="Pickup"?0:1));
           // this.props.setDeliveryMode(value);
            restData=[...restData,...restaurantDataMod.filter(data=>data.ModeOfDelivery===2)]
            this.props.setRestaurants(restData);
            return;
        }
        localStorage.setItem('DeliveryType',value);
        if(value==="Pickup"){
            
            this.props.searchRestaurants(0,"Pickup");
            return;
        }
        this.props.searchRestaurants(1,"Delivery");
    }
    handleChangeFoodType=async(e)=>{
        const {value}=e.target;
        if(value==="Select type of food"){
            await this.props.setRestaurants(this.props.restaurantData);
            await this.props.setFoodType(undefined);
            console.log("Props",this.props.foodType);
            return;
        }
        if(value==="Veg"){
            await this.props.searchRestaurants(1,"Veg");
            await this.props.setFoodType("Veg");
            console.log("Props",this.props.foodType);
            return;
        }else if(value==="Non veg"){
            await  this.props.searchRestaurants(1,"Non veg");
            await this.props.setFoodType("Non veg");
            console.log("Props",this.props.foodType);
            return;
        }else{
            await this.props.searchRestaurants(1,"Vegan");
            await this.props.setFoodType("Vegan");
            console.log("Props",this.props.foodType);
            return;
        }

    }
    handleSubmit=async(e)=>{
        e.preventDefault();
       // console.log(this.state.location);
        await this.props.searchRestaurants(this.state.search);
        //console.log("Rest Data",this.props);
    }
    buildCardsStructure = () =>{
       // console.log("Hereeeeeee",this.state.favRestaurants,this.props.restaurantData);
        let row=[];
        if(this.props.restaurantDataMod!==undefined && this.props.restaurantDataMod.length>0){
            const data=this.props.restaurantDataMod;
            //console.log("Inside Data",data);
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants} />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+2]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}} >
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                        <div className="col-sm-3">
                            <RestaurantCard data={data[i+1]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            <RestaurantCard data={data[i]} favRestaurants={this.state.favRestaurants}  />
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    addToFavourites=()=>{
        let restaurants=this.state.favRestaurants;
        restaurants[this.props.favRestaurants]=true;
        this.props.updateFavouriteRestaurants();
        //console.log("Check this asd",restaurants);
        this.setState({favRestaurants:restaurants});
        


    }
    render(){
       // console.log("Updated",this.state.favRestaurants);
        // if(this.props.customerDetails===undefined){
        //     return <Redirect to='/'/>
        // }
        if(this.props.favRestaurants!==undefined){
            this.addToFavourites();
        }
        return(
            <React.Fragment >
                <div  >
                <Navbar/>
                <div className="row" >
                    <div className="offset-sm-2">
                        <h1>Order your neighborhood's top spots</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 offset-sm-2">
                    <input type="text" name="search" value={this.state.search} onChange={this.handleChange} className="form-control" id="location" aria-describedby="location" placeholder="Enter Delivery Location" required/>
                    </div>
                    <div className="col-md-1">
                    <button type="button" className="btn btn-dark btn-md" disabled={this.state.search===""} onClick={this.handleSubmit}>Find Food</button>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select form-select-lg mb-3" onChange={this.handleChangeFoodType}>
                            <option>Select type of food</option>
                            <option>Veg</option>
                            <option>Non veg</option>
                            <option>Vegan</option>
                        </select>
                    </div> 
                    <div className="col-md-3">
                        <select className="form-select form-select-lg mb-3" onChange={this.handleChangeDeliveryType} >
                            <option>Select type of Delivery</option>
                            <option>Pickup</option>
                            <option>Delivery</option>
                        </select>
                    </div>                  
                </div>
                <div>
                    {this.buildCardsStructure()}
                </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
   console.log("state",state)
    return {
        restaurantData:state.customerDashBoardReducer.restaurantData,
        favRestaurants:state.customerDashBoardReducer.favRestaurants,
        customerDetails:state.customerLoginReducer.customerLogin,
        restaurantDataMod:state.customerDashBoardReducer.restaurantDataMod,
        foodType:state.customerDashBoardReducer.foodType
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getRestaurants: () => dispatch(getRestaurants()),
        searchRestaurants: (search,type) => dispatch(searchRestaurants(search,type)),
        updateFavouriteRestaurants:(data)=>dispatch(updateFavouriteRestaurants(data)),
        setRestaurants:(search)=>dispatch(setRestaurants(search)),
        setFoodType:(type)=>dispatch(setFoodType(type))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomerDashboard);