import { render, screen } from "../../test-utils"
import Navbar from '../../../Components/Navbar';
import { fireEvent } from '@testing-library/react';


test('should show login form', () => {
  render(<Navbar />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});

it.only('should make dark mode work', () => {
    render(<Navbar />)
    const link = screen.getByText('☀')
    fireEvent.click(link)
    expect(screen.getByText('🌙')).toBeInTheDocument();
})