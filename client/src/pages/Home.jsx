import React, { useEffect, useState } from "react";
import axios from "axios";
import Welcoming from "../icons/welcoming";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

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

  return (
    <div className="container">
      <div className="sub">
        <Welcoming />
        <div className="info">
          <h2>Perfil</h2>
          <div className="user">
            {user.image ? (
              <div className="img-cont">
                <img src="http://localhost:3000" alt="" />
              </div>
            ) : (
              <div className="img-cont">
                <img src="../../public/user-solid.svg" alt="" />
                <Link to={"/photo"}>Agregar foto</Link>
              </div>
            )}
            <h2>{user.name}</h2>
            <p>
              Es un gusto que estar de nuestro lado usuario{" "}
              <span>@{user.name}</span>. Le escribiremos en su correo
              electrónico (<span>{user.email}</span>) si hay cambio en el
              formato de los perfiles.
            </p>
          </div>
          <button>Cerrar sesion</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
