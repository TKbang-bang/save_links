import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const rq = await axios.post("http://localhost:3000/getid", { id });
        if (rq.data.log) {
          //   console.log(rq.data.data[0]);
          setTitle(rq.data.data[0].title);
          setUrl(rq.data.data[0].link);
          setDescription(rq.data.data[0].description);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put("http://localhost:3000/edit", {
        id,
        title,
        url,
        description,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="sub">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="ok">
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
