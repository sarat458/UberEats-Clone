export const updateRestaurantProfile=(details) => async dispatch =>{
    dispatch({
        type:"UPDATE_RESTAURANT_PROFILE",
        payload:details
    })
}