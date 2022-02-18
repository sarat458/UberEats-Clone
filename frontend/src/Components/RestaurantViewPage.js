import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import noProfileImage from '../images/noProfileImage.png';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
import {updateCartItems} from '../actions/customerDashBoard';
import config from '../urlConfig';
import {Modal,Button, Table} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
class RestaurantViewPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Menu:[],
            Qty:{},
            cartCount:0,
            place:false,
            Rest1name:"",
            Rest2name:"",
            selectedDish:null,
            id:null,
            favClicked:false
        }
    }
    componentDidMount(){
        //console.log("check",this.props.restaurant);
        var url=`${config.BackendURL}/getRestaurantMenu?RestaurantID=${this.props.restaurant.RestaurantID}`;
       // console.log(url);
       Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.get(url)
        .then(res=>{
            //console.log(res.data);
            //console.log("Food type Prop",this.props);
            let data=res.data;
            if(this.props.restaurant.foodType!==undefined){
                data=data.filter(item=>item.DishType===this.props.restaurant.foodType);
                console.log("Filtered data",data);
            }
            this.setState({menu:data})
        })
        if(this.props.cartItems!==undefined){
            this.setState({cartCount:this.props.cartItems.length});
        }
        const {customerDetails}=this.props;
        Axios.get(`${config.BackendURL}/getFavouriteRestaurants?customerID=${customerDetails.CustomerID}`)
        .then(res=>{
            const {data}=res;
            const {RestaurantID} = this.props.restaurant;
            data.map(rest=>{
                if(rest.RestaurantID===RestaurantID){
                    this.setState({favClicked:true});
                }
            })
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    buildCardStructure = (data) =>{
        console.log("Check for this data",data);
        let row=[];
        if(data!==undefined && data.length>0){
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                            {this.menuCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+1])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.menuCard(data[i])}
                        </div>
                        <div className="col-sm-3">
                        {this.menuCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-sm-3 offset-sm-2">
                        {this.menuCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    handleChange=(e)=>{
        this.setState({Qty:{...this.state.Qty,[e.target.id]:e.target.value}});
    }
    menuCard=(data)=>{
        if(data.DishImageURL===""){
            data.DishImageURL=noProfileImage;
        }
        return (
            <React.Fragment>
                {data!==undefined?<MDBCard style={{ maxWidth: '24rem',borderColor:"coral",borderWidth:"3px",borderRadius:"8px"}}>
                    <MDBCardImage src={data.DishImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody style={{color:"black"}}>
                        <MDBCardTitle style={{textAlign:"center"}}>{data.DishName}</MDBCardTitle>
                        <MDBCardText style={{fontSize:"13px"}}>
                            <div><b>Description:</b>{data.Description}</div>
                            <div><b>Category:</b>{data.DishCategory}&nbsp;&nbsp;
                            <span ><b>Price:</b>${data.DishPrice}</span></div>
                            <div><b>Main Ingredients:</b>{data.MainIngredients}</div>
                        </MDBCardText>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Qty :</td>
                                    <td style={{width:"50px"}}><select id={data.DishID}name="Qty" style={{width:"40px"}} value={this.state.Qty[data.DishID]} onChange={this.handleChange}>
                                        <option value={1} selected>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select></td>
                                    <td>
                                        <button className="btn btn-primary" id={data.DishID} onClick={(e)=>{this.addMenuToCart(e)}}>Add to cart</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MDBCardBody>
                    </MDBCard>:null}
            </React.Fragment>
        )
    }
    addMenuToCart=(e)=>{
        //console.log(e.target.id);
        let cart=[];
        let {id}=e.target;
        if(this.props.cartItems!==undefined){
            cart=this.props.cartItems;
        }      
        let dish=this.state.menu.filter(item=>item.DishID===id)[0];
        if(cart.length>0){
            let restID1=cart[0].RestaurantID;
            let restID2=dish.RestaurantID;
            console.log(restID1,restID2);
            if(restID1!==restID2){
                this.setState({showError:true,Rest1name:cart[0].Name,Rest2name:this.props.restaurant.Name,selectedDish:dish,selectedID:id});
                return;
            }
        }
        dish["Qty"]=this.state.Qty[id]===undefined?1:this.state.Qty[id];
        dish["Name"]=this.props.restaurant.Name;
        console.log("Check dish",dish);
        cart.push(dish);
        this.setState({cartCount:cart.length})
        this.props.updateCartItems(cart);
    }
    newOrder=()=>{
        let cart=[];
        let dish=this.state.selectedDish;
        const {id}=this.state;
        dish["Qty"]=this.state.Qty[id]===undefined?1:this.state.Qty[id];
        dish["Name"]=this.props.restaurant.Name;
        cart.push(dish);
        this.setState({showError:false,showCart:false,cartCount:1,selectedDish:null,id:null});
        this.props.updateCartItems(cart);
    }
    handleClose=()=>{
        this.setState({showCart:false,showError:false,selectedDish:null,id:null});
    }
    openCart=()=>{
        if(this.props.cartItems===undefined || this.props.cartItems.length==0) return;
        this.setState({showCart:true});
    }
    removeClicked=(e)=>{
        let items=this.props.cartItems.filter(item=>item.DishID!==e.target.id);

        this.props.updateCartItems(items);

        this.setState({showCart:true,cartCount:items.length});
    }
    qtyChanged = (e) => {
        const {id,value} = e.target;
        let qty=parseInt(value);
        let totalItems=this.props.cartItems.slice(0);
        totalItems.map(item => {
            if(item.DishID===id){
                item.Qty=qty;
            }
        });
        this.props.updateCartItems(totalItems);

        this.setState({showCart:true,cartCount:totalItems.length});
    }
    cartBody=()=>{
        const {cartItems}=this.props;
        if(cartItems===undefined) return;
        let totalCost=0;
        return(
            <>
                <Table>
                    <thead>
                        <tr>
                            <td>SNo</td>
                            <td>Dish Name</td>
                            <td>Dish Price</td>
                            <td>Qty</td>
                            <td>Price</td>
                            <td>Remove Item from Cart</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.map((item,index)=>{
                                totalCost+=item.DishPrice*item.Qty;
                                totalCost=Math.round(totalCost * 100) / 100
                                return(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{item.DishName}</td>
                                    <td>${item.DishPrice}</td>
                                    <td>
                                        <select value={item.Qty} id={item.DishID} onChange={(e)=>{this.qtyChanged(e)}}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </td>
                                    <td>${item.Qty * item.DishPrice}</td>
                                    <td>
                                        <button type="button" className="btn btn-dark" id={item.DishID} onClick={(e)=>{this.removeClicked(e)}}>Remove</button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Total Price:</b></td>
                            <td style={{marginLeft:"100px"}}><b>${totalCost}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
    placeOrder=()=>{
        this.setState({place:true});
    }
    clickedFavouritesButton=()=>{
        let postData={
            customerID:this.props.customerDetails.CustomerID,
            restaurantID:this.props.restaurant.RestaurantID
        }
        this.setState({favClicked:true});
        console.log(postData);
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.post(`${config.BackendURL}/addToFavourites`,postData)
        .then(res=>{
            console.log("Insertion Successful");
            this.props.updateFavouriteRestaurants(postData.restaurantID);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        console.log("Food type",this.props.restaurant);
        if(this.state.place){
            return <Redirect to='/customerOrderConfirmation'/>
        }
        // if(this.props.customerDetails===undefined){
        //     return <Redirect to='/'/>
        // }
        return (
            <React.Fragment>
                <Navbar/>
                <Modal size="lg" show={this.state.showCart} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title><h2>Restaurant Name: {this.props.cartItems!==undefined && this.props.cartItems.length>0?this.props.cartItems[0].Name:this.props.restaurant.Name}</h2></Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.cartBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-dark" style={{width:"200px"}} type="submit" onClick={this.placeOrder}>
                        Go To Checkout
                    </button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.state.showError} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title><h1>Create New Order?</h1></Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        <h3>
                            Your cart contains items from {this.state.Rest1name}.Create a new order to add items from {this.state.Rest2name} 
                        </h3>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-dark" style={{width:"200px"}} type="submit" onClick={this.newOrder}>
                        New Order
                    </button>
                    </Modal.Footer>
                </Modal>
                <div className="container" style={{textAlign:'right',marginTop:"3px"}}>
                <button type="button" disabled={this.state.favClicked} onClick={this.clickedFavouritesButton} className="btn btn-primary">
                    Add to Favourites
                </button>
                <button type="button" class="btn btn-dark" onClick={this.openCart}>
                    Cart <span class="badge badge-light">{this.state.cartCount}</span>
                    </button>
                </div>
                <div className="container" style={{marginTop:"2%"}}>
                    <img src={this.props.restaurant.ImageURL}  height="300px" width="100%" alt="Restaurant Img"/>
                </div>
                <div className="container">
                    <h2>{this.props.restaurant.Name}</h2>
                    <b>{this.props.restaurant.Description}</b>
                </div>
                <div>   
                    {this.buildCardStructure(this.state.menu)}

                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    console.log(state);
    return {
        restaurant:state.customerDashBoardReducer.restaurantViewData,
        cartItems:state.customerDashBoardReducer.cartItems,
        foodType:state.customerDashBoardReducer.foodType,
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateCartItems:(data)=>dispatch(updateCartItems(data))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantViewPage);
