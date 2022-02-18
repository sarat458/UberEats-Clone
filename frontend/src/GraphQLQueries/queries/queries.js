import { gql } from 'apollo-boost';

const getRestaurantsQuery = gql`
   query {
        restaurants{
            Name
            RestaurantID
            Location
        }
    }
`;

const getCustomerOrdersQuery = gql`
   query($customerID : String) {
        customerOrders(customerID : $customerID){
            OrderID
            OrderStatus
            RestaurantID
            CustomerID
            OrderPickUp
            OrderDelivery
            OrderPickUpStatus
            OrderDeliveryStatus
            Menu
            NoOfItems
            OrderTotal
            Address
            OrderTime
            OrderDescription
        }
    }
`;
const getCustomerProfileQuery = gql`
    query($customerID : String){
        customerProfile(customerID : $customerID){
            ImageURL
            DateOfBirth
            City
            State
            Country
            Nickname
            PhoneNumber
            CustomerID
            Email
            Name
        }
    }
`;

const getRestaurantsOnSearch = gql`
    query($search : String , $type : String){
        getRestaurantsOnSearch(search : $search , type : #type) {
            ImageURL
            Description
            ContactInfo
            Address
            ModeOfDelivery
            Veg
            Nonveg
            Vegan
            RestaurantID
            Email
            Name
            Location
            Timings
    }
`;

const getrestaurantProfile = gql`
    query($RestaurantID : String){
        restaurantProfile(RestaurantID : $RestaurantID){
            ImageURL
            Description
            ContactInfo
            Address
            ModeOfDelivery
            Veg
            Nonveg
            Vegan
            RestaurantID
            Email
            Name
            Location
            Timings
        }
    }
`;

const getRestaurantMenu = gql`
    query($RestaurantID : String){
        getRestaurantMenu(RestaurantID : $RestaurantID){
            DishName
            DishPrice
            DishType
            DishCategory
            DishImageURL
            MainIngredients
            Description
            DishID
            DishImageURL
        }
    }
`;

const getrestaurantOrders = gql`
query($RestaurantID : String){
    restaurantOrders(RestaurantID : $RestaurantID){
        OrderDescription
        OrderPickUp
        OrderDelivery
        OrderPickUpStatus
        OrderDeliveryStatus
        Menu
        OrderID
        RestaurantID
        CustomerID
        OrderStatus
        NoOfItems
        OrderTotal
        OrderTime
        Address
    }
}
`;

const getOrderMenu = gql`
    query($OrderID : String){
        getOrderMenu(OrderID : $OrderID){
            DishImageURL
            Description
            DishID
            RestaurantID
            DishName
            MainIngredients
            DishPrice 
            DishCategory
            DishType
            Qty
            Name
            OrderID
            OrderDishPrice
            Address
            OrderDescription
            OrderStatus
        }
    }
`;

export { getRestaurantsQuery, getCustomerOrdersQuery, getCustomerProfileQuery, getRestaurantsOnSearch, getrestaurantProfile,
getRestaurantMenu, getrestaurantOrders, getOrderMenu  };

