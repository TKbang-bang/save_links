import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Card({ link }) {
  const navigate = useNavigate();

  const handleDel = () => {
    try {
      axios.post("http://localhost:3000/del", { id: link.id });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="uno">
        <h2>{link.title}</h2>
        <p>{link.link}</p>
        <p>{link.description}</p>
        <Link to={link.link} target="_blank">
          Visitar
        </Link>
      </div>
      <div className="dos">
        <button className="e" onClick={() => navigate("/edit/" + link.id)}>
          Editar
        </button>
        <button className="d" onClick={handleDel}>
          Borrar
        </button>
      </div>
    </div>
  );
}

export default Card;
