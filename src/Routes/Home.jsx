import { useEffect, useState } from "react";
import Card from "../Components/Card";
// import ScheduleForm from '../Components/ScheduleForm'

const Home = () => {
  const [dentists, setDentist] = useState([])
  const url = 'http://dhodonto.ctdprojetos.com.br/dentista'
  useEffect(() => {
    async function fetchData(){

      const response = await fetch(url)
      if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
      const data = await response.json()
     setDentist(data)
   }
   fetchData()
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {
          dentists.map((dentist) => <Card nome={dentist.nome} sobrenome = {dentist.sobrenome} id={dentist.matricula}/>)
        }
        
      </div>
    </>
  );
};

export default Home;
