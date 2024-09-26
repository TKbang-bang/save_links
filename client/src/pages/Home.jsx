import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Out from "../icons/Out.jsx";

function Home() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  useEffect(() => {
    const getData = async () => {
      try {
        const rq = await axios.get("http://localhost:3000");
        if (rq.data.log) {
          setUser(rq.data.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const Image = (data) => {
    if (data.data.image == null) {
      return (
        <div className="img-cont">
          {console.log(data.data)}
          <img src="/user-solid.svg" alt="" />
          <Link to={"/photo"}>Agregar foto</Link>
        </div>
      );
    } else {
      return (
        <div className="img-cont">
          <img src={"http://localhost:3000/" + data.data.image} alt="" />
          <Link to={"/photo"}>Cambiar foto</Link>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="sub">
        <img src="/undraw_welcoming_re_x0qo.svg" alt="" />
        <div className="info">
          <h2>Perfil</h2>
          <div className="user">
            <Image data={user} />
            <h2>{user.name}</h2>
            <p>
              Es un gusto que estar de nuestro lado usuario{" "}
              <span>@{user.name}</span>. Le escribiremos en su correo
              electrónico (<span>{user.email}</span>) si hay cambio en el
              formato de los perfiles.
            </p>
          </div>

          <button onClick={() => navigate("/login")} className="c">
            <Out />
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
