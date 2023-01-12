import { useState, useContext } from "react";
// import './signin.css';
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  const { signup, loadingAuth } = useContext(AuthContext);

  function handelSubmit(e) {
    e.preventDefault();
    if (nome !== "" && email !== "" && password !== "") {
      signup(email, password, nome);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema" />
        </div>
        <form onSubmit={handelSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
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
            {loadingAuth ? "Carregando ...." : "Cadastrar"}
          </button>
        </form>
        <Link to="/">Já possui uma conta? Entre!</Link>
      </div>
    </div>
  );
}

export default SignUp;
