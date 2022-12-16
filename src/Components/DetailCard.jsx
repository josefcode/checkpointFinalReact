import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import { useParams } from "react-router-dom";
import styles from "./DetailCard.module.css";
// https://github.com/matheusrayol/CTD-Front-End-III-CP02/blob/main/src/Components/DetailCard/index.jsx

// https://github.com/DigitalHouseBrasil/CTD-FE3-Checkpoint2-Template
const DetailCard = () => {
  const [dentist, setDentist] = useState([])
  const { id } = useParams();

  useEffect(() => {
    async function fetchData(){

       const response = await fetch(`http://dhodonto.ctdprojetos.com.br/dentista?matricula=${id}`)
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
       const data = await response.json()
      setDentist(data)
    }

    fetchData()

  }, [id]);

  
  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {`${dentist?.nome}` || ""} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">
                Nome: {`${dentist?.nome}` || ""}</li>
              <li className="list-group-item">
                Sobrenome: {`${dentist?.sobrenome}`|| ""}
              </li>
              <li className="list-group-item">
                Usuário: {`${dentist.usuario?.username}` }
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
        <ScheduleFormModal />
      </section>
      
    </>
  );
};

export default DetailCard;
