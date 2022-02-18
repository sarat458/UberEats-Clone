import React from 'react'
import Axios from 'axios';
import { connect } from "react-redux";
import RestaurantNavbar from './RestaurantNavbar';
import {Modal,Button} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import noProfileImage from '../images/noProfileImage.png';
import firebase  from '../firebaseConfig';
import {Redirect} from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { addDishMutation, updateDishMutation } from '../GraphQLQueries/mutation/mutations';
import {getRestaurantMenu} from '../GraphQLQueries/queries/queries'
import config from '../urlConfig';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from 'mdb-react-ui-kit';
const {uuid} = require("uuidv4");
const category=["Pick a Category", "Appetizer","Salads", "Main Course", "Desserts", "Beverages"];
const type=["Pick a type","Non veg","Veg","Vegan"];

class RestaurantMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dishes:[],
            show:false,
            DishName:"",
            MainIngredients:"",
            DishImageURL:noProfileImage,
            DishPrice:"",
            Description:"",
            DishCategory:"",
            DishType:"",
            DishID:"",
            editClicked:false,
            changedAttributes:{}
        }
    }
    componentDidMount(){
        // Axios.defaults.headers.common['authorization'] = localStorage.getItem('resttoken');
        // var url=`${config.BackendURL}/getRestaurantMenu?RestaurantID=${this.props.restaurantDetails.RestaurantID}`;
        // Axios.get(url)
        // .then(res=>{
        //     //console.log(res.data);
        //     this.setState({dishes:res.data})
        // })
        this.props.getMenu({
            variables : {
                RestaurantID : this.props.restaurantDetails.RestaurantID
            }
        })
    }
    buildCarStructure = () =>{
        let row=[];
        if(this.state.dishes!==undefined && this.state.dishes.length>0){
            const data=this.state.dishes;
            for(let i=0;i<data.length;i=i+3){
                if(i+2<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                            {this.menuCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.menuCard(data[i+1])}
                        </div>
                        <div className="col-md-3">
                        {this.menuCard(data[i+2])}
                        </div>
                    </div>)
                }else if(i+1<data.length){
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.menuCard(data[i])}
                        </div>
                        <div className="col-md-3">
                        {this.menuCard(data[i+1])}
                        </div>
                    </div>)
                }else{
                    row.push(<div className="row" style={{marginTop:"2%"}}>
                        <div className="col-md-3 offset-md-2">
                        {this.menuCard(data[i])}
                        </div>
                    </div>)
                }
            }
        }
        return row;
    }
    handleClose = () =>{
        this.setState({show:false,showEdit:false});
        this.setState({
            DishName:"",
            MainIngredients:"",
            DishImageURL:noProfileImage,
            DishPrice:"",
            Description:"",
            DishCategory:"",
            DishType:"",
            changedAttributes:{}
        })
    }
    adddish= () =>{
        this.setState({show:true});
        this.setState({
            DishName:"",
            MainIngredients:"",
            DishImageURL:noProfileImage,
            DishPrice:"",
            Description:"",
            DishCategory:"",
            DishType:"",
            changedAttributes:{}
        })
    }
    handleChange= (e) =>{
        this.setState({[e.target.name]:e.target.value,changedAttributes:{...this.state.changedAttributes,[e.target.name]:true}});
    }
    modalBody = () =>{
        return (
            <div style={{alignItems:'center'}}>
            <form>
                <table>
                    <tbody>
                <tr>
                    <td>Dish Name</td>
                    <td>:</td>
                    <input required type="text" name="DishName" className="form-control" value={this.state.DishName} onChange={this.handleChange}/>
                </tr>
                <tr>
                    <td>Main Ingredients</td>
                    <td>:</td>
                    <textarea required name="MainIngredients" className="form-control" cols={30} rows={2} value={this.state.MainIngredients} onChange={this.handleChange}/>
                                       
                </tr>
                <tr>
                    <td>Dish Price</td>
                    <td>:</td>
                    <input required type="number" name="DishPrice" className="form-control" value={this.state.DishPrice} onChange={this.handleChange}/>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>:</td>
                    <textarea required name="Description" className="form-control" cols={30} rows={3} value={this.state.Description} onChange={this.handleChange}/>
                                       
                </tr>
                <tr>
                    <td>Dish Category</td>
                    <td>:</td>
                    <td>
                        <select  class="form-select form-select-lg mb-3" name="DishCategory" style={{width:"210px"}} value={this.state.DishCategory} onChange={this.handleChange}>
                            {category.map((state,index)=>{
                                return <option  key={index}>{state}</option>
                            })}
                         </select>
                    </td>
                </tr>
                <tr>
                    <td>Dish Type</td>
                    <td>:</td>
                    <td>
                        <select class="form-select form-select-lg mb-3" name="DishType" style={{width:"150px"}} value={this.state.DishType} onChange={this.handleChange}>
                            {type.map((state,index)=>{
                                return <option  key={index}>{state}</option>
                            })}
                         </select>
                    </td>
                </tr>
                </tbody>
                </table>
                <div className="row" style={{marginTop:"2px"}} >
                        <img style={{width:"190px",height:"150px"}} src={this.state.DishImageURL} alt="Profile"/>
                </div>
                <div className="row" style={{width:"20%",marginTop:"5px",marginLeft:"3px"}}>
                            <input
                            ref="fileInput"
                            onChange={this.handleFileUpload}
                            type="file"
                            
                            accept="image/*"
                            // multiple={false}
                            />
                            {/* <button className="btn btn-primary" onClick={() => this.refs.fileInput.click()}>Upload Image</button> */}
                        </div>
               </form>
            </div>
        );
    }
    itemClicked=(e)=>{
        const dishID=e.target.id;
        this.setState({showEdit:true,DishID:dishID});
        let dishDetails=this.state.dishes.filter(dish => dish.DishID===dishID);
        if(dishDetails.length==0) return;
        dishDetails=dishDetails[0];
        console.log(dishDetails);
        this.setState({
            DishName:dishDetails.DishName,
            MainIngredients:dishDetails.MainIngredients,
            DishImageURL:dishDetails.DishImageURL,
            DishPrice:dishDetails.DishPrice,
            Description:dishDetails.Description,
            DishCategory:dishDetails.DishCategory,
            DishType:dishDetails.DishType
        });

        
    }
    menuCard=(data)=>{
        if(data.DishImageURL===""){
            data.DishImageURL=noProfileImage;
        }
        return (
            <React.Fragment>
                {data!==undefined?<MDBCard style={{ maxWidth: '30rem',borderColor:"coral",borderWidth:"3px",borderRadius:"8px" }}>
                    <MDBCardImage src={data.DishImageURL} position='top' alt='Image' style={{height:"150px"}} />
                    <MDBCardBody style={{color:"black"}}>
                        <MDBCardTitle style={{textAlign:"center"}}>{data.DishName}</MDBCardTitle>
                        <MDBCardText style={{fontSize:"13px"}}>
                            <div><b>Description:</b>{data.Description}</div>
                            <div><b>Category:</b>{data.DishCategory}&nbsp;&nbsp;
                            <span ><b>Price:</b>${data.DishPrice}</span></div>
                            <div><b>Main Ingredients:</b>{data.MainIngredients}</div>
                        </MDBCardText>
                        <button className="btn btn-primary" id={data.DishID} onClick={(e)=>{this.itemClicked(e)}}>Edit</button>
                    </MDBCardBody>
                    </MDBCard>:null}
            </React.Fragment>
        )
    }
    saveClicked= () =>{
        let dishDetails={
            DishName:this.state.DishName,
            DishPrice:this.state.DishPrice,
            restaurantID:this.props.restaurantDetails.RestaurantID,
            MainIngredients:this.state.MainIngredients,
            DishImageURL:this.state.DishImageURL,
            Description:this.state.Description,
            DishCategory:this.state.DishCategory,
            DishType:this.state.DishType
        }
        const dish=this.state.dishes;
        dish.push(dishDetails);
        console.log(dishDetails);
        // Axios.defaults.headers.common['authorization'] = localStorage.getItem('resttoken');
        // Axios.post(`${config.BackendURL}/addDish`,dishDetails)
        // .then(res=>{
        //     console.log("Dish Added Successfully");
        //     this.setState({show:false,dishes:dish,changedAttributes:{}});
        // })
        // .catch(err=>{
        //     console.log("Error in Dish Addition");
        // })
        this.props.addDish({
            variables : {
                details : dishDetails
            }
        })
    }
    handleFileUpload=async(e)=>{
        console.log("Upload");
        const file=e.target.files[0];
        if(this.state.DishImageURL!=="" && this.state.DishImageURL!=="/static/media/noProfileImage.c3f94521.png"){
            console.log(this.state.DishImageURL);
            const pictureRef=firebase.storage().refFromURL(this.state.DishImageURL);
            pictureRef.delete()
            .then(res=>{
                console.log("Picture Deleted");
            })
        }
        const imagesRef=firebase.storage().ref("DishesImages").child(uuid());
        await imagesRef.put(file);
        imagesRef.getDownloadURL()
        .then(url=>{
            //console.log(url);
            this.setState({DishImageURL:url,changedAttributes:{...this.state.changedAttributes,DishImageURL:true}});
        })
    }
    updateClicked=()=>{
        let updateDetails={
            DishID:this.state.DishID
        };
        for (const [key, value] of Object.entries(this.state.changedAttributes)) {
            updateDetails[key]=this.state[key];
          }
        //   Axios.defaults.headers.common['authorization'] = localStorage.getItem('resttoken');
        //   Axios.put(`${config.BackendURL}/updateDish`,updateDetails)
        //   .then(res=>{
        //     console.log("Update Successful");
        //     let dishDetails={
        //         DishName:this.state.DishName,
        //         DishPrice:this.state.DishPrice,
        //         restaurantID:this.props.restaurantDetails.RestaurantID,
        //         MainIngredients:this.state.MainIngredients,
        //         DishImageURL:this.state.DishImageURL,
        //         Description:this.state.Description,
        //         DishCategory:this.state.DishCategory,
        //         DishType:this.state.DishType,
        //         DishID:this.state.DishID
        //     }
        //     let value=this.state.dishes;
        //     for(let dish of value){
        //         if(dish.DishID===dishDetails.DishID){
        //             for(const [key,value] of Object.entries(dishDetails)){
        //                 dish[key]=value;
        //             }
        //             break;
        //         }
        //     }
        //     console.log(value);
        //     this.setState({dishes:value});
        //   })
        //   .catch(err=>{
        //       console.log(err);
        //   })
        await this.props.updateDish({
            variables : {
                detaisl : updateDetails
            }
        })

        let dishDetails={
                    DishName:this.state.DishName,
                    DishPrice:this.state.DishPrice,
                    restaurantID:this.props.restaurantDetails.RestaurantID,
                    MainIngredients:this.state.MainIngredients,
                    DishImageURL:this.state.DishImageURL,
                    Description:this.state.Description,
                    DishCategory:this.state.DishCategory,
                    DishType:this.state.DishType,
                    DishID:this.state.DishID
                }
                let value=this.state.dishes;
                for(let dish of value){
                    if(dish.DishID===dishDetails.DishID){
                        for(const [key,value] of Object.entries(dishDetails)){
                            dish[key]=value;
                        }
                        break;
                    }
                }
                console.log(value);
                this.setState({dishes:value});
        this.setState({
            
            changedAttributes:{},
            showEdit:false
        })
    }
    render(){
        // if(this.props.restaurantDetails===undefined || this.props.restaurantDetails===null){
        //     return <Redirect to='/'/>
        // }
        return (
            <React.Fragment>
                <RestaurantNavbar/>
                <Modal size="lg" show={this.state.showEdit} onHide={this.handleClose} onCloseModal={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Edit Dish Details</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.modalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-success" disabled={!Object.keys(this.state.changedAttributes).length>0} type="submit" onClick={this.updateClicked}>
                        Save Changes
                    </button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.state.show} onHide={this.handleClose} onCloseModal={this.handleClose}>
                    <ModalHeader>
                    <Modal.Title>Add Dish Details</Modal.Title>
                    </ModalHeader>
                    <Modal.Body>
                        {this.modalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-success" disabled={Object.keys(this.state.changedAttributes).length<6} type="submit" onClick={this.saveClicked}>
                        Add Dish
                    </button>
                    </Modal.Footer>
                </Modal>
                <div className="container" style={{marginTop:"3%"}}>
                    <div className="row" style={{textAlign:"center"}} >
                        <h1>Restaurant Menu Page</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-2 offset-md-2">
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.adddish}>Add Dish</button>
                        </div>
                    </div>
                    <div>
                        {this.buildCarStructure()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) =>{
    //console.log(state);
    return {
        restaurantDetails:state.restaurantLoginReducer.restaurantLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
    };
  }
export default compose(graphql(addDishMutation , {name : "addDish"}),
                        graphql(updateDishMutation , {name : "updateDish"}),
                        graphql(getRestaurantMenu , {name : "getMenu"})
)(RestaurantMenu);
