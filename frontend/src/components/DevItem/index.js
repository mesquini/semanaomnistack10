import React from "react";
import "./style.css";
import MaterialIcon from "material-icons-react";
import api from "../../services/api";

export default function DevItem({ dev }) {
  async function handleRemove(user) {
    await api.delete(`/dev/${user}`);
    document.location.reload();
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong> {dev.name} </strong>
          <span>{dev.techs.join(", ")} </span>
        </div>
      </header>
      <p> {dev.bio} </p>
      <div className="justify">
        <a href={`https://github.com/${dev.github_username}`}>
          Acessar perfil no Github
        </a>
        <button onClick={() => handleRemove(dev.github_username)}>
          <MaterialIcon icon="remove_circle" />
        </button>
      </div>
    </li>
  );
}
