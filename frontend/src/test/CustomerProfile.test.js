import {render, screen, fireEvent} from '@testing-library/react';
import CustomerProfile from '../Components/CustomerProfile';

test('renders Customer Profile', () => {
    render(<CustomerProfile/>);
    const customerProfileText = screen.getByText(/Profile Settings/i);
    expect(customerProfileText).toBeInTheDocument();
});

test('button click and edit the input field',()=>{
    render(<CustomerProfile/>);
    fireEvent.click(screen.getByText(/Edit/i));
    const inputBox = screen.getByTestId('city');
    fireEvent.change(inputBox, {target: {value: 'San Jose'}});
    expect(inputBox.value).toBe('San Jose');
})