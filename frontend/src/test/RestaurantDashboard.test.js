import {render, screen, fireEvent} from '@testing-library/react';
import RestaurantDashboard from '../Components/RestaurantDashboard';

test('renders Customer Login', () => {
    render(<RestaurantDashboard/>);
    const restaurantDashboardText = screen.getByText(/Restaurant Profile/i);
    expect(restaurantDashboardText).toBeInTheDocument();
});

test('button click and edit the input field',()=>{
    render(<RestaurantDashboard/>);
    fireEvent.click(screen.getByText(/Edit/i));
    const inputBox = screen.getByTestId('location');
    fireEvent.change(inputBox, {target: {value: 'San Jose'}});
    expect(inputBox.value).toBe('San Jose');
})