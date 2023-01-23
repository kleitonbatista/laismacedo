import { useState, useContext } from "react";
import "./signin.css";
import logo from "../../assets/logo.png";
import logoLm from "../../assets/laisMacedo.png";

import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handelSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      signIn(email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logoLm} alt="logo do sistema" />
        </div>
        <form onSubmit={handelSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
          <button type="submit">
            {loadingAuth ? "Carregando ...." : "Acessar"}
          </button>
        </form>
        <Link to="/cadastro">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
