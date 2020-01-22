import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

export default function App() {
  
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function load() {      
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    load();
  }, []);  

  return (
    <div id="app">
      <aside>
        <strong> Cadastrar </strong>
        <DevForm />
      </aside>
      <main>
        <ul>
          {devs.length > 0 &&
            devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
        </ul>
      </main>
    </div>
  );
}
