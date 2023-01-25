import PersistentDrawerLeft from "../../components/Drawer/drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import firebase from "../../service/firebaseConnection";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import "./venda.css";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

import Titulo from "../../components/Titulo/titulo.js";

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
  const [produto, setProduto] = useState({});

  // id do produto a ser editado
  const { id } = useParams();

  useEffect(() => {
    async function recuperarDadosItensVenda() {
      await firebase
        .firestore()
        .collection("produtos")
        .doc(id)
        .get()
        .then((snapshot) => {
          let produtoRecuperado = { id: id, ...snapshot.data() };
          setProduto(produtoRecuperado);
          console.log(produtoRecuperado);
          // console.log(snapshot.data());
          // console.log(snapshot.data().descricaoProduto);
          // console.log(snapshot.data().valor);
          // console.log(snapshot.data().valorVenda);
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
        {/* <div className={classes.root}> */}
          <Grid container spacing={3}>
            <Titulo textoTitulo="Registrar Venda" />
          </Grid>
        {/* </div> */}

        <div>
          <fieldset>
            <legend>Dados Recuperado Base</legend>
            <label>Codigo do protudo:{produto.codigo}</label>
            <br />
            <label>Item a ser vendido: {produto.descricaoProduto} </label>
            <br />
            <label>Observacao: {produto.observacao}</label>
            <br />
            <label>Numeracao: {produto.numeracao}</label>
            <br />
            <label>Quantidade em estoque: {produto.quantidade}</label>
            <br />
            <label>Valor de venda : {produto.valorVenda} </label>
            <br />
            <label>Valor sugerido : {produto.sugestaoOne}</label>
            <br />
          </fieldset>
          <br />
          <Divider />
          <fieldset>
            <legend>Dados Sobre a Venda</legend>
            <label>Data da venda dd/mm/yyyy</label>
            <br />
            <label>valor vendido: R$ xx</label>
            <br />
            <label>Forma te pagamento: Pix, Dinheiro, Parcelado</label>
            <br />
            <label>Quantidade de parcelas N</label>
            <br />
            <label>Data primeira parecela dd/mm/yyyy</label>
            <br />
            <label>Valor previsto das parcelas: R$ xx.xx</label>
            <br />
            <label>Entrada: S, Valor: R$ XX </label>
            <br />
            <label>Nome Cliente: Fulano de Tal</label>
            <br />
            <label>Telefone contato: (xx) xxxxx-xxxx</label> <br />
          </fieldset>
        </div>
      </div>
    </PersistentDrawerLeft>
  );
}
