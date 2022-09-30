import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

async function handleSubmit(e){
  e.preventDefault();
  try {
    const response = await api.post('users/login', form)
    localStorage.setItem("loggedInUser",JSON.stringify(response.data))
    navigate("/profile");
      console.log(response.data)
    
  } catch (error) {
    console.log(error);
      
  }
  navigate("/Receitas")

}

console.log(form)
  return (
    <>
      <form onSubmit={handleSubmit} >
        <div class="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        <Link to="/createUser">
          <button type="submit" class="btn btn-primary">
            Cadastrar Usuario
          </button>
        </Link>
      </form>
    </>
  );
}

export default SigIn;
