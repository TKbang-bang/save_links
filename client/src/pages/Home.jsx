import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import Out from "../icons/Out.jsx";
import Card from "../components/Card.jsx";

function Home() {
  const [user, setUser] = useState({});
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const rq = await axios.get("http://localhost:3000");
        if (rq.data.log) {
          const { user, links } = rq.data;
          setLinks(links);
          setUser(user);
          // console.log(links);
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
      <div className="sub-c">
        <nav>
          <h2>Links</h2>
          <Link to={"/add"}>+ Agregar link</Link>
          <Link to={"/login"}>Cerrar sesion</Link>
        </nav>
        <div className="card-cont">
          {links.map((lk) => (
            <Card key={lk.id} link={lk} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
