import React, { useState } from "react";
import EyeClose from "../icons/EyeClose.jsx";
import Eye from "../icons/Eye.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const [no, setNo] = useState("");

  const handleCLick = (e) => {
    e.preventDefault();
    setVisible(!visible);
    if (visible) {
      document.getElementById("pass").type = "password";
    } else {
      document.getElementById("pass").type = "text";
    }
  };

  const handleCLick2 = (e) => {
    e.preventDefault();
    setVisible2(!visible2);
    if (visible2) {
      document.getElementById("pass2").type = "password";
    } else {
      document.getElementById("pass2").type = "text";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name != "" && email != "" && password != "" && password2 != "") {
      if (password != password2) {
        setNo("!Las contraseñas no coinciden*");
      } else {
        setNo("");
        try {
          const rq = await axios.post("http://localhost:3000/register", {
            name,
            email,
            password,
          });
          if (rq.data.ok) {
            navigate("/login");
          } else {
            setNo(`!${rq.data.message}*`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setNo("!Rellena todos los espacios en blanco*");
    }
  };

  return (
    <div className="container">
      <div className="sub">
        <img src="/undraw_mobile_payments_re_7udl.svg" alt="" />
        <form onSubmit={handleSubmit}>
          <h2 className="title">Registrarse</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="passDiv">
            <input
              type="password"
              id="pass"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {visible ? (
              <button onClick={handleCLick}>
                <Eye />
              </button>
            ) : (
              <button onClick={handleCLick}>
                <EyeClose />
              </button>
            )}
          </div>
          <div className="passDiv">
            <input
              type="password"
              id="pass2"
              placeholder="Confirma tu contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {visible2 ? (
              <button onClick={handleCLick2}>
                <Eye />
              </button>
            ) : (
              <button onClick={handleCLick2}>
                <EyeClose />
              </button>
            )}
          </div>
          <p className="no">{no}</p>
          <button className="ok" type="submit">
            Registrate
          </button>
          <p className="cuenta">
            ¿Ya tienes una cuenta? <Link to={"/login"}>Inicia sesion</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
