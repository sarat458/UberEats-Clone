import React from 'react'
import UberEatsLogo from '../images/UberEatsLogo.png'
import Card from 'react-bootstrap/Card';
import CustomerImage from '../images/d68c5f5ddd33d16a8d6855987410673b.svg';
import RestaurantImage from '../images/Customer.svg';
import { graphql } from 'react-apollo';

//import {getBooksQuery,getRestaurantsQuery} from '../GraphQLQueries/queries/queries';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    
    render(){
        return (
            <div style={{height:"720px",backgroundColor:"papayawhip"}}>
                <div className="container-fluid" >
                    <div className="row" style={{paddingTop:"100px"}}>
                        <div className=" col-md-9 offset-md-3 align-self-center">
                        <img src={UberEatsLogo} alt="Uber Eats" width="50%" height="100px"/> 
                        </div>
                    </div>
                    <div className="row" style={{paddingTop:"100px"}}>
                        <div className="col-md-4 offset-md-2">
                            <a href='/customerLogin'><Card style={{ width: '18rem',borderColor:"black",borderWidth:"2px"}}>
                            <Card.Img variant="top" src={CustomerImage} />
                            <Card.Body>
                                <Card.Title style={{textAlign:"center"}}>Customer Login</Card.Title>
                            </Card.Body>
                            </Card></a>
                        </div>
                        <div className="col-md-4 ">
                        <a href='/restaurantLogin'><Card style={{ width: '18rem',borderColor:"black",borderWidth:"2px" }}>
                            <Card.Img variant="top" src={RestaurantImage} />
                            <Card.Body>
                                <Card.Title style={{textAlign:"center"}}>Restaurant Login</Card.Title>
                            </Card.Body>
                            </Card></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
