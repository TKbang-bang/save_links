import React, { useEffect, useRef, useState } from "react";
import UploadIcon from "../icons/UploadIcon.jsx";
import axios from "axios";

function Photo() {
  const [file, setFile] = useState(null);
  const [no, setNo] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        document.getElementById("ref").src = ev.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    setNo("");
    if (file) {
      const formData = new FormData();
      formData.append("img", file);
      try {
        axios.post("http://localhost:3000/photo", formData);
      } catch (error) {
        console.log(error);
      }
    } else {
      setNo("No has elegido ningun archivo");
    }
  };

  useEffect(() => {
    document.getElementById("ref").src = "/user-solid.svg";
  }, []);

  return (
    <div className="container">
      <div className="sub">
        <img src="/photo.svg" alt="" />
        <div className="info">
          <div className="img-cont">
            <img src="" id="ref" alt="" />
          </div>
          <div className="elejir">
            <input
              id="myini"
              type="file"
              className="in"
              onChange={handleChange}
            />
            <label htmlFor="myini" className="e">
              <UploadIcon /> Elegir archivo
            </label>
            <button onClick={handleSend} className="a">
              Agregar
            </button>
          </div>
          <p className="no">{no}</p>
        </div>
      </div>
    </div>
  );
}

export default Photo;
