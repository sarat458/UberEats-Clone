import React from 'react'
import { connect } from "react-redux";
import Navbar from "../Components/Navbar.js";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {Modal,Button} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader';
import config from '../urlConfig';
import ReactPaginate from 'react-paginate';
import { graphql, compose } from 'react-apollo';
import {getCustomerOrdersQuery} from '../GraphQLQueries/queries/queries';
import '../App.css';
const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
class CustomerOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orders:[],
            modOrders:[],
            originalOrders:[],
            ordersMenu:[],
            show:false,
            currentMenu:[],
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount:0,
            selectedOrder:{}
        }
    }
    componentDidMount(){
        const {CustomerID}=this.props.customerDetails;
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        this.props.getOrders({
            variables : {
                CustomerID : CustomerID
            }
        })
        Axios.get(`${config.BackendURL}/getCustomerOrders?CustomerID=${CustomerID}`)
            .then(res=>{
                //console.log(res.data);
                if(res.data.Orders.length==0) return;
                const {data}=res;
                data.Orders.sort(function(a,b){
                    return new Date(b.OrderTime) - new Date(a.OrderTime);
                  });
                //console.log("Sorted",data.Orders);
                const slice = data.Orders.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({orders:slice,modOrders:data.Orders,ordersMenu:data.OrdersMenu,originalOrders:data.Orders,pageCount: Math.ceil(data.Orders.length / this.state.perPage)});
            })
            .catch(err=>{
                console.log(err);
            })
    }
  
    cancelOrder= (event) => {
        console.log("Cancel Clicked",event.target.id);
        let order=this.state.originalOrders.filter(o=>o.OrderID==event.target.id)[0];
        if(order==null) return;
        let body = {
            OrderID:event.target.id,
            OrderPickUp:order.OrderPickUp,
            OrderDelivery:order.OrderDelivery
        };
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.put(`${config.BackendURL}/cancelCustomerOrder`,body)
        .then(res=>{
            let orders1 = this.state.orders;
            orders1.map(o=>{
                if(o.OrderID==event.target.id){
                    order.OrderStatus="Cancelled";
                    if(order.OrderPickUp===1){
                        order.OrderPickUpStatus="Cancelled";
                    }else{
                        order.OrderDeliveryStatus="Cancelled";
                    }
                }
            }) 
            this.setState({orders:orders1});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    buildOrdersBody=()=>{
        if(this.state.orders.length===0) return;
        const {orders}= this.state;
        let row=[];
        orders.map(order=>{
            let date=new Date(order.OrderTime);
            row.push(
                <tr>
                    <td>
                    <div>
                        <b><p style={{fontSize:"30px",display:"inline"}}>{order.Name}<span style={{fontSize:"25px"}}>- ({order.Location})</span></p></b>
                    </div>
                    <div>
                        <p><b>Order Status:</b> {order.OrderStatus} &nbsp;&nbsp;&nbsp;&nbsp;  <b>Order Delivery Status:  </b>{order.OrderPickUp===1?order.OrderPickUpStatus:order.OrderDeliveryStatus}</p>
                    </div>
                    <div>
                        <p>
                            {order.NoOfItems} items for ${order.OrderTotal}. {months[date.getMonth()]} {date.getDate()} at {date.getHours()>12?date.getHours()-12:date.getHours()}:{date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()} {date.getHours()>12?'PM':'AM'}. <a id={order.OrderID} onClick={(e)=>{this.showReceipt(e)}} href='#'>View receipt</a>
                            &nbsp; &nbsp; &nbsp;{(order.OrderPickUpStatus=="Order Received" || order.OrderDeliveryStatus=="Order Received")?<a id={order.OrderID} onClick={(e)=>{this.cancelOrder(e)}} href='#' style={{color:"red"}}>Cancel Order</a>:null}
                        </p>
                    </div>
                    </td>
                </tr>
            )
        })

        return row;
    }
    showReceipt=(e)=>{
        this.setState({show:true});
        let menu=this.state.ordersMenu.filter(menu=>menu.OrderID===e.target.id);
        let order=this.state.orders.filter(order=>order.OrderID==e.target.id)[0];
        //console.log("Order",order);
        this.setState({currentMenu:menu,selectedOrder:order});
    }
    receiptBody=()=>{
        if(this.state.currentMenu.length>0){
            const {currentMenu}=this.state;
            let row=[];
            row.push(<tr>
                <td></td>
                <td><b>Total</b></td>
                <td></td>
                <td></td>
                <td><b>${currentMenu[0].OrderTotal}</b></td>
            </tr>)
            currentMenu.map(menu=>{
                row.push(<tr>
                    <td>{menu.Qty}</td>
                    <td>{menu.DishName}</td>
                    <td></td>
                    <td></td>
                    <td>${menu.OrderDishPrice}</td>
                </tr>)
            })  
            
            return row;
        }
    }
    handleClose=()=>{
        this.setState({show:false,currentMenu:[]});
    }
    handleChange=(e)=>{
        let filter=e.target.value;
        if(filter==="Select a Status"){
            let slice = this.state.originalOrders.slice(0,this.state.perPage);
            this.setState({orders:slice,modOrders:this.state.originalOrders,currentPage:0,offset:0,pageCount:Math.ceil(this.state.originalOrders.length / this.state.perPage)});
            return;
        } 
        const {originalOrders}=this.state;
        let filterData=[];
        for(let order of originalOrders){
            if(order.OrderPickUpStatus===filter|| order.OrderDeliveryStatus===filter){
                filterData.push(order);
            }
        }
        filterData.sort(function(a,b){
            return new Date(b.OrderTime) - new Date(a.OrderTime);
          });
          const slice = filterData.slice(0,this.state.perPage);
        this.setState({modOrders:filterData,orders:slice,currentPage:0,offset:0,pageCount:Math.ceil(filterData.length / this.state.perPage)});
       // console.log(filterData);
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        const slice = this.state.modOrders.slice(offset,offset + this.state.perPage);
        this.setState({
            currentPage: selectedPage,
            offset: offset,
            orders:slice
        });

    };
    handlePageCount = (e) =>{
        let count=parseInt(e.target.value);
        const offset=0;
        const slice = this.state.modOrders.slice(offset,offset + count);
        this.setState({
            currentPage: 0,
            offset: 0,
            orders:slice,
            perPage:count,
            pageCount:Math.ceil(this.state.modOrders.length / count)
        });
    }
    render(){
        // if(this.props.customerDetails===undefined || localStorage.getItem("token")===null){
        //     return <Redirect to='/'/>
        // }
        return(
            <React.Fragment>
                <Navbar/>
                <Modal size="md" show={this.state.show} onHide={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Receipt</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        <div>
                           <b> Delivery Address:</b>{this.state.currentMenu.length>0?this.state.currentMenu[0].Address:null}
                        </div>
                        <div>
                            <b>Order Status:</b>{this.state.currentMenu.length>0?this.state.currentMenu[0].OrderStatus:null}
                        </div>
                        <div>
                            <b>Special Instructions:</b>{this.state.selectedOrder.OrderDescription!=null?this.state.selectedOrder.OrderDescription:<b>-------</b>}
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <td>Qty</td>
                                    <td>Dish Name</td>
                                    <td></td>
                                    <td></td>
                                    <td>Dish Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.receiptBody()}
                            </tbody>
                        </Table>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="container">
                <div>
                    <h1>Past Orders</h1>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <h4>Filter the orders:</h4>
                    </div>
                    <div className="col-md-3">
                        <select class="form-select form-select-lg mb-3" onChange={this.handleChange}>
                            <option>Select a Status</option>
                            <option>Order Received</option>
                            <option>Preparing</option>
                            <option>On the way</option>
                            <option>Delivered</option>
                            <option>Pick up Ready</option>
                            <option>Picked up</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    
                </div>
                <div>
                    <Table className="table-hover">
                        <tbody>
                            {this.buildOrdersBody()}
                        </tbody>
                    </Table>
                </div>
                <div className="row">
                <div className="col-md-1 offset-md-3" style={{marginTop:"8px"  }}>
                        <select className="form-select" style={{width:"68px"}} onChange={this.handlePageCount}>
                        <option>2</option>
                        <option selected>5</option>
                        <option>10</option>
                        </select>
                </div>
                <div className="col-md-4">
                        <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                    </div>
                </div></div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    //console.log("state",state);
    return {
        customerDetails:state.customerLoginReducer.customerLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
  }
export default compose(graphql(getCustomerOrdersQuery , {name : "getOrders"}))(CustomerOrders);