import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import {api} from "../../../api/api"



function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [loadin, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    async function fetcReceitas() {
      try {
        const response = await api.get("http://localhost:4000/recipes/all");
        setReceitas(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(true);
    }
    fetcReceitas();
  }, []);
  console.log(receitas);
  return (
    <>
    <div>
      <Link to="/userdetail">
      <button class="btn btn-primary">Meu Perfil</button>
      </Link>
    </div>
      {loadin && (
        <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {receitas.map((element) => {
            return (
              <div class="card" style={{ width: " 18rem", margin: "20px" }}>
                <img src={element.image} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{element.creator}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>    
                  <Link to={`/receita/${element._id}`}>
                  <button class="btn btn-primary">Detalhes</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Receitas;
