import {render, screen, cleanup} from '@testing-library/react'
import Login from '../Login';

test('should render Login component', () => {
    render(<Login/>);
    const loginElement = screen.getByTestId('login-test1');

    expect(loginElement).toBeInTheDocument();
})