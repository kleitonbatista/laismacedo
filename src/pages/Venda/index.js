import PersistentDrawerLeft from "../../components/Drawer/drawer";
import firebase from "../../service/firebaseConnection";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import "./venda.css";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
export default function RegistrarVenda() {
  const classes = useStyles();

  // id do produto a ser editado
  const { id } = useParams();

  useEffect(() => {
    async function recuperarDadosItensVenda() {
      await firebase
        .firestore()
        .collection("produtos")
        .get(id)
        .then((snapshot) => {
            console.log(snapshot.data());
            console.log(snapshot.data().descricaoProduto);
            console.log(snapshot.data().valor);
            console.log(snapshot.data().valorVenda);
        })
        .catch((err) => {
          console.log("erro ", err);
        });
    }

    if (id != undefined) {
      recuperarDadosItensVenda();
    }
  }, [id]);

  return (
    <PersistentDrawerLeft>
      <div className="container main box center">
        <div className={classes.root}>
          <h1>Registrar venda</h1>
        </div>
      </div>
    </PersistentDrawerLeft>
  );
}
