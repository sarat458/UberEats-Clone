const graphql = require('graphql');
const Restaurant = require('../models/restaurantDetailsSchema');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
} = graphql;
const customer = require('../mutations/customer');
const restaurant = require('../mutations/restaurant');
const CustomerDetails = new GraphQLObjectType({
    name:"customerDetails",
    fields: () => ({
        _id:{type : GraphQLString},
        ImageURL : {type : GraphQLString},
        DateOfBirth : {type : GraphQLString},
        City : {type : GraphQLString},
        State : {type : GraphQLString},
        Country : {type : GraphQLString},
        Nickname : {type : GraphQLString},
        PhoneNumber : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        Email : {type : GraphQLString},
        Password : {type : GraphQLString},
        Name : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const RestaurantDetails = new GraphQLObjectType({
    name : "restaurantDetails",
    fields : () => ({
        _id : {type : GraphQLString},
        ImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        ContactInfo : {type : GraphQLInt},
        Address : {type : GraphQLString},
        ModeOfDelivery : {type : GraphQLInt},
        Veg : {type : GraphQLInt},
        Nonveg : {type : GraphQLInt},
        Vegan : {type : GraphQLInt},
        Timings : {type : GraphQLString},
        RestaurantID: {type : GraphQLString},
        Email : {type : GraphQLString},
        Password : {type : GraphQLString},
        Name : {type : GraphQLString},
        Location : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Addresses = new GraphQLObjectType({
    name : "Addresses",
    fields : () => ({
        _id : {type : GraphQLString},
        AddressID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        Address : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Dish = new GraphQLObjectType({
    name : "Dish",
    fields : () => ({
        _id : {type : GraphQLString},
        DishID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        DishName : {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishImageURL : {type : GraphQLString},
        DishPrice : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishCategory : {type : GraphQLString},
        DishType : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const FavouriteRestaurants = new GraphQLObjectType({
    name : "FavouriteRestaurants",
    fields : () => ({
        _id : {type : GraphQLString},
        ID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Orders = new GraphQLObjectType({
    name : "Orders",
    fields : () => ({
        _id : {type : GraphQLString},
        OrderID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        OrderStatus : {type : GraphQLString},
        OrderDescription : {type : GraphQLString},
        NoOfItems : {type : GraphQLInt},
        OrderTotal : {type : GraphQLInt},
        OrderPickUp : {type : GraphQLInt},
        OrderDelivery : {type : GraphQLInt},
        OrderTime : {type : GraphQLString},
        OrderPickUpStatus : {type : GraphQLString},
        OrderDeliveryStatus : {type : GraphQLString},
        Address : {type : GraphQLString},
        status : {type : GraphQLInt},
        Menu :  {type : GraphQLList(MenuList)},
        success : {type : GraphQLString}
    })
})

const MenuList = new GraphQLObjectType({
    name : "MenuList",
    fields: () => ({
        _id : {type : GraphQLString},
        DishImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishID : {type : GraphQLString},
        RestaurantID: {type : GraphQLString},
        DishName: {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishPrice: {type : GraphQLFloat},
        DishCategory: {type : GraphQLString},
        DishType: {type : GraphQLString},
        Qty : {type : GraphQLInt},
        Name : {type : GraphQLString},
        OrderID: {type : GraphQLString},
        OrderTotal:{type : GraphQLFloat},
        OrderDishPrice:{type : GraphQLFloat},
        Address:{type : GraphQLString},
        OrderDescription:{type : GraphQLString},
        OrderStatus:{type : GraphQLString},

    })

})

const CustomerInputType = new GraphQLInputObjectType({
    name : "customerInput",
    fields: () => ({
        Name : {type : GraphQLString},
        DateOfBirth: {type : GraphQLString},
        City: {type : GraphQLString},
        State: {type : GraphQLString},
        Country : {type : GraphQLString},
        Nickname : {type : GraphQLString},
        Email : {type : GraphQLString},
        PhoneNumber: {type : GraphQLString},
        ImageURL:{type : GraphQLString}
    })
})
const RestaurantInputType = new GraphQLInputObjectType({
    name : "RestaurantInput",
    fields : () => ({
        Name : {type : GraphQLString},
        Location: {type : GraphQLString},
        Country : {type : GraphQLString},
        Email : {type : GraphQLString},
        ContactInfo: {type : GraphQLString},
        ImageURL:{type : GraphQLString},
        Address : {type : GraphQLString},
        Timings : {type : GraphQLString},
        Veg : {type : GraphQLInt},
        Nonveg : {type : GraphQLInt},
        Vegan : {type : GraphQLInt},
        Description : {type : GraphQLString},

    })
})

const DishInputType = new GraphQLInputObjectType({
    name : "DishInput",
    fields : () => ({
        DishImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        DishName : {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishPrice : {type : GraphQLFloat},
        DishCategory : {type : GraphQLString},
        DishType : {type : GraphQLString},
    })
})

const UpdateStatusInputType = new GraphQLInputObjectType({
    name : "UpdateStatusInputType",
    fields : () => ({
        OrderID : {type : GraphQLString},
        OrderDeliveryStatus : {type : GraphQLString},
        OrderPickUpStatus : {type : GraphQLString},
        OrderStatus : {type : GraphQLString},
    })
})

const OrderMenuType = new GraphQLObjectType({
    name : "OrderMenu",
    fields : () => ({
        DishImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishID : {type : GraphQLString},
        _id : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        DishName : {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishPrice : {type : GraphQLFloat},
        DishCategory : {type : GraphQLString},
        DishType : {type : GraphQLString},
        Qty : {type : GraphQLInt},
        Name : {type : GraphQLString},
        OrderID : {type : GraphQLString},
        OrderTotal : {type : GraphQLFloat},
        OrderDishPrice : {type : GraphQLFloat},
        Address : {type : GraphQLString},
        OrderDescription : {type : GraphQLString},
        OrderStatus : {type : GraphQLString}

    })
});

const OrderInputType = new GraphQLInputObjectType({
    name : "OrderDetailsInput",
    fields : () => ({
        RestaurantID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        OrderStatus : {type : GraphQLString},
        Description : {type : GraphQLString},
        NoOfItems : {type : GraphQLInt},
        OrderTotal : {type : GraphQLFloat},
        OrderTime : {type : GraphQLString},
        Address : {type : GraphQLString},
        OrderPickUpStatus : {type : GraphQLString},
        OrderDeliveryStatus : {type : GraphQLString},
        OrderDelivery : {type : GraphQLInt},
        OrderPickUp : {type : GraphQLInt}
        //Write Menu type here not working
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        restaurants : {
            type : new GraphQLList(RestaurantDetails),
            async resolve(parent,args){
                let restaurants = await Restaurant.find({});
                return restaurants;
            }
        },
        customerOrders : {
            type : new GraphQLList(Orders),
            args : {
                customerID : { type : GraphQLString}
            },
            resolve(parent,args) {
                return customer.getCustomerOrders(args.customerID);
            }
        },
        customerProfile : {
            type : CustomerDetails,
            args : {
                customerID : {type : GraphQLString}
            },
            resolve(parent,args){
                return customer.getCustomerProfile(args.customerID);
            }
        },
        getRestaurantsOnSearch : {
            type : new GraphQLList(RestaurantDetails),
            args : {
                search : {type : GraphQLString},
                type : {type : GraphQLString}
            },
            resolve(parent,args){
                return customer.getRestaurantsOnSearch(args.search,args.type);
            }
        },
        restaurantProfile : {
            type : RestaurantDetails,
            args:{
                RestaurantID: { type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.getRestaurantProfile(args.RestaurantID);
            }
        },
        getRestaurantMenu : {
            type : new GraphQLList(Dish),
            args : {
                RestaurantID : {type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.getRestaurantMenu(args.RestaurantID);
            }
        },
        restaurantOrders : {
            type : new GraphQLList(Orders),
            args:{
                RestaurantID : {type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.getRestaurantOrders(args.RestaurantID);
            }
        },
        getOrderMenu : {
            type : new GraphQLList(OrderMenuType),
            args : {
                OrderID : {type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.getOrderMenu(args.OrderID);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        customerLogin: {
            type : CustomerDetails,
            description: "Customer Login",
            args : {
                email : { type : GraphQLString},
                password : {type : GraphQLString}
            },
            resolve(parent,args) {
                return customer.customerLogin(args.email,args.password);
            }
        },
        customerSignup : {
            type : CustomerDetails,
            description : "Customer Signup",
            args:{
                name : { type : GraphQLString},
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent,args){
                return customer.customerSignup(args.name,args.email,args.password);
            }
        },
        updateCustomerProfile:{
            type: CustomerDetails,
            description: "Update Customer Profile",
            args:{
                updateDetails: {type : CustomerInputType}
            },
            resolve(parent,args){
                return customer.updateCustomerProfile(args.updateDetails);
            }
        },
        restaurantLogin:{
            type : RestaurantDetails,
            description: "Restaurant Login",
            args:{
                email : { type : GraphQLString},
                password : {type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.restaurantLogin(args.email,args.password);
            }
        },
        restaurantSignup:{
            type : RestaurantDetails,
            description: "Restaurant Signup",
            args:{
                email : { type : GraphQLString},
                password : {type : GraphQLString},
                name : { type : GraphQLString},
                location : {type : GraphQLString} 
            },
            resolve(parent,args){
                 return restaurant.restaurantSignup(args.name,args.email,args.password,args.location);
            }
        },
        placeCustomerOrder: {
            type : Orders,
            description: "Place Customer Order",
            args : {
                orderDetails : {type : OrderInputType}
            },
            resolve(parent,args){
                return customer.placeCustomerOrder(args.orderDetails);
            }
        },
        updateRestaurantProfile : {
            type : RestaurantDetails,
            description : "Update Restaurant Details",
            args:{
                details : {type : RestaurantInputType}     
            },
            resolve(parent,args){
                return restaurant.updateRestaurantProfile(args.details);
            }
        },
        addDish : {
            type : Dish,
            description : "Add Dish",
            args : {
                details : {type : DishInputType}
            },
            resolve(parent,args){
                return restaurant.addDish(args.details);
            }
        },
        updateDish :{
            type : Dish,
            description : "Update Dish",
            args : {
                details : {type : DishInputType}
            },
            resolve (parent,args){
                return restaurant.updateDish(args.details);
            }
        },
        updateDeliveryStatus : {
            type : Orders,
            description : "Update Delivery Status",
            args : {
                details : {type : UpdateStatusInputType}
            },
            resolve(parent,args){
                console.log(args.details);
                return restaurant.updateDeliveryStatus(args.details);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;