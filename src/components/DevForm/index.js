import React, { useState, useEffect } from "react";

import api from "../../services/api";

export default function DevForm() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setUsername] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      positon => {
        const { latitude, longitude } = positon.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();
    await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });

    document.location.reload();
  }

  return (
    <form onSubmit={handleAddDev}>
      <div className="input-block">
        <label htmlFor="github_username"> Usuário do Github </label>
        <input
          name="github_username"
          id="github_username"
          required
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="tecnologias"> Tecnologias </label>
        <input
          name="tecnologias"
          id="tecnologias"
          required
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude"> Latitude </label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude"> Longetude </label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit"> Cadastrar </button>
    </form>
  );
}
