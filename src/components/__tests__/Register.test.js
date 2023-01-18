import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import Register from '../Register';
import userEvent from "@testing-library/user-event";
import {mount} from 'enzyme';
import {act} from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

afterEach(() => {
    cleanup();
})

test('is register rendering', () => {
    render(<Register/>);
    const RegisterElement = screen.getByTestId('register-test');
    expect(RegisterElement).toBeInTheDocument();
})

test('is register containg all neccessary fields', () => {
    render(<Register/>);
    const RegisterPasswordField = screen.getByTestId('register-test-password');
    const RegisterUsername = screen.getByTestId('register-test-username');
    const RegisterEmail = screen.getByTestId('register-test-email');
    const RegisterCheckbox = screen.getByTestId('register-test-checkbox');
    expect(RegisterPasswordField).toBeInTheDocument();
    expect(RegisterUsername).toBeInTheDocument();
    expect(RegisterEmail).toBeInTheDocument();
    expect(RegisterCheckbox).toBeInTheDocument();
})

test('is submit button available', () => {
    render(<Register/>);
    const RegisterButtonOFF = screen.getByTestId('register-test-email-disabled');
    expect(RegisterButtonOFF).toBeInTheDocument();
})

