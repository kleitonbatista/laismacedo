import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <div></div>
      </>
    );
  }
  // nao ta logado e quer acessar area privada
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  /** ta logado e quer a cessar tela que nao precisa de login */
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
