import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getLog = async () => {
      try {
        const rq = await axios.get("http://localhost:3000/log");
        if (!rq.data.log) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLog();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title == "" || url == "" || description == "") {
      console.log("Rellana todos los espacios en blanco");
    } else {
      try {
        axios.post("http://localhost:3000/add", { title, url, description });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="sub">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Agregar link</h1>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="Enlace"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="ok" type="submit">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
