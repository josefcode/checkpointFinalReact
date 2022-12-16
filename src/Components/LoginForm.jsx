import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import styles from "./Form.module.css";
import { useLogin } from '../hooks/useLogin'
//  usuario dentistaAdmin e admin123
  function LoginForm (){
  const {changeLogin} = useLogin()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const url = 'https://dhodonto.ctdprojetos.com.br/auth'

  const requestHeader = {
    'Accept': "",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }

  const bodyRequest = {
    username: userName,
    password: password
  }
  const  requestConfig = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(bodyRequest)
  }

  const navigate = useNavigate();
  
  async function handleSubmit(e){
    e.preventDefault()

    try{
      fetch(url, requestConfig)
      .then(res=>res.json())
      .then(data=>localStorage.setItem('token', data.token))
      }catch(err){
        alert('ocorreu um erro' + err)
      }
    
    alert('Login foi bem sucedido')

    navigate('/')
    
    changeLogin(false)

  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={userName}
              onChange= {(e) => setUserName(e.target.value)}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange= {(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
