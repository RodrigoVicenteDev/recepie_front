import { useEffect, useState } from "react";
import { api } from "../../api/api";

function UserDetail() {
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    setLoading(false);
    async function catchUser() {
      try {
        const response = await api.get("/users/profile");
        setUsuario(response.data);
      } catch (error) {}
      setLoading(true);
    }
    catchUser();
  }, [render]);

  async function handlefav(element) {
    try {
      await api.delete(`/users/deletefav/${element}`);
      console.log(element);
    } catch (error) {
      console.log(error);
    }
    setRender(!render);
    console.log(render);
  }

  return (
    <>
      {loading && (
        <>
          <h1>{usuario.name}</h1>
          <img style={{width:'300px'}} src={usuario.profilePic} alt='...'/>
          <h2>receitas favoritas</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Creator</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
              {usuario.favorites.map((element) => {
                return (
                  <tr>
                    <th scope="row">1</th>
                    <td>{element.creator}</td>
                    <td>{element.level}</td>
                    <td>
                      <button onClick={() => handlefav(element._id)}>
                        Remover fav
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default UserDetail;
