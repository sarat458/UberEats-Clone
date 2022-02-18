import {render, screen, fireEvent} from '@testing-library/react';
import CustomerLogin from '../Components/CustomerLogin';

test('renders Customer Login', () => {
    render(<CustomerLogin/>);
    const customerLoginText = screen.getByText(/Customer Login/i);
    expect(customerLoginText).toBeInTheDocument();
});

test('testing email input type', () => {
    render(<CustomerLogin/>);
    const inputBox = screen.getByTestId('email');
    fireEvent.change(inputBox, {target: {value: 'sakethgali@gmail.com'}});
    expect(inputBox.value).toBe('sakethgali@gmail.com');
});

