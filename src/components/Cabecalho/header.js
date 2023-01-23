import logoLm from "../../assets/laisMacedo.png";
export default function Header() {
  return (
    <>
      <div className="titulo">
        <img src={logoLm} className="logoLm" alt="logo do sistema" />
        <div className="sub-titulo">
          <h1>Laís Macedo</h1>
          <h3>Joias e Acessórios</h3>
        </div>
      </div>
    </>
  );
}
