import { render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';

test('Inputs - validação de login (1 de login, 1 de password)',() =>{

  render(<Login />)

  expect(screen.getByPlaceholderText('Login')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
});