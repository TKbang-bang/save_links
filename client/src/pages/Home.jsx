import React, { useEffect } from "react";
import axios from "axios";

function Home() {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getData = async () => {
      try {
        const rq = await axios.get("http://localhost:3000");
        console.log(rq.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
