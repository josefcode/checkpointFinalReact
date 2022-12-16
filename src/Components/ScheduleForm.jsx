import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import {useDark} from '../hooks/useDark'

const ScheduleForm = () => {
  const { dark } = useDark()

  const [dentists, setDentist] = useState([])
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    fetch("https://dhodonto.ctdprojetos.com.br/dentista")
    .then((res) =>res.json())
    .then((data)=> setDentist(data))

    fetch("https://dhodonto.ctdprojetos.com.br/paciente")
    .then((res) =>res.json())
    .then((data)=> setPacientes(data.body))

  }, []);

  let [formData, setFormData] = useState({
    dentist: '',
    patient: '',
    date: '',
  })
  

  const handleChange = (event) => {
  
    const { name , value} = event.target

    setFormData(prev => {
      return {
        ...prev, 
        [name]: value
      }
    })

    // fetch('http://dhodonto.ctdprojetos.com.br/consulta', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // }) 
    // .then(res=>res.json())
    // .then(data=>console.log(data))

    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };
  
  const requestHeader = {
    'Accept': "",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let json;
  try{
    const response = await fetch('http://dhodonto.ctdprojetos.com.br/consulta', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(formData)
    }) 
    json = await response.json()
  } catch(error) {
    alert('Tem algum error por favor tenta de novo', error);
  }

  if (json) {
    console.log('Use the JSON here!', json);
  }

  }
  

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${dark ? styles.cardDark : ''}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" value = {formData.dentist}
              onChange={handleChange} 
              >
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                { 
                dentists.map((dentist, index) => <option key={index} value={dentist.nome}>
                  {dentist.nome} {dentist.sobrenome}
                </option>
                )
                }
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" 
              value ={formData.patient} onChange={handleChange}>
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                { 
                pacientes.map((patient, index) => <option key={index} value={patient.nome} onChange={handleChange}>
                  {patient.nome} {patient.sobrenome}
                </option>
                )
                }
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
