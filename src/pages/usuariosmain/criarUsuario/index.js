import { api } from "../../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CriarUsuario() {
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleImage(e) {
    setImg(e.target.files[0]);
  }
  console.log(form);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleupload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);
      const response = await api.post("/upload-image", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleupload();
      await api.post("users/sign-up", { ...form, profilePic: imgURL });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            E-Mail
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput3"
            placeholder="Another input placeholder"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Imagem de perfil
          </label>
          <input
            type="file"
            className="form-control"
            id="formGroupExampleInput3"
            onChange={handleImage}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CriarUsuario;
