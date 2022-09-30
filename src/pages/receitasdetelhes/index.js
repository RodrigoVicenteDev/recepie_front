import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReceitaDetalhes() {
  const [receita, setReceita] = useState({});
  const [loading, setLoadin] = useState(false);
  const[render, setRender] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    setLoadin(false);
    async function fechtReceita() {
      try {
        const response = await api.get(`/recipes/recipe/${id}`);
        setReceita(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoadin(true);
    }
    fechtReceita();
  }, []);
  console.log(receita.ingredients);

async function handleLike(){
    try {
        await api.put(`/users/addlike/${id}`)
        setRender(!render)
    } catch (error) {
        console.log(error)
    }
}

async function handledislike(){
    try {
        await api.put(`/users/dislike/${id}`)
        setRender(!render)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
      {loading && (
        <>
          <h1>{receita.creator}</h1>
          <h3>{receita.level}</h3>
          <img src={receita.image} alt="..." />
          <h4>ingredients</h4>
          <ul className="list-group">
            {receita.ingredients.map((element) => {
              return <li className="list-group-item">{element}</li>;
            })}
          </ul>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handleLike}> ❤</button><p> {receita.likes}</p>
            <button onClick={handledislike}> ❥ </button><p>{receita.dislikes}</p>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </>
      )}
    </>
  );
}

export default ReceitaDetalhes;
