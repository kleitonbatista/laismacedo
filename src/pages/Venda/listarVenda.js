import PersistentDrawerLeft from "../../components/Drawer/drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import CardActions from "@material-ui/core/CardActions";

import firebase from "../../service/firebaseConnection";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import "./venda.css";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Titulo from "../../components/Titulo/titulo.js";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TabelaDatasPagamento from "../../components/TabelaDatasPagamento/tabelaDatasPagamento";

import { doc, setDoc } from "firebase/firestore";

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
export default function ListarVendas() {
  const classes = useStyles();
  const [listaVendas, setListaVendas] = useState([]);

  useEffect(() => {
    async function recuperaItensVendidos() {
      await firebase
        .firestore()
        .collection("venda")
        .get()
        .then(async (snapshot) => {
          let vendas = [];
          snapshot.forEach((doc) => {
            vendas.push({
              id: doc.id,
              categoriaId: doc.data().categoriaId,
              cliente: doc.data().cliente,
              codigoProduto: doc.data().codigoProduto,
              contatoCliente: doc.data().contatoCliente,
              dataPrimeiraParcela: doc.data().dataPrimeiraParcela,
              dataVenda: doc.data().dataVenda,
              descricaoProduto: doc.data().descricaoProduto,
              formatoPagamentoId: doc.data().formatoPagamento,
              percentualPrevisto: doc.data().percentualPrevisto,
              produtoId: doc.data().produtoId,
              quantidadeItemVendido: doc.data().quantidadeItemVendido,
              quantidadeParcela: doc.data().quantidadeParcela,
              recebidoCompleto: doc.data().recebidoCompleto,
              valorEntrada: doc.data().valorEntrada,
              valorOriginal: doc.data().valorOriginal,
              valorPrevistoVenda: doc.data().valorPrevistoVenda,
              valorVendaReal: doc.data().valorVendaReal,
            });
            setListaVendas(vendas);
            // await firebase
            //   .firestore("categorias")
            //   .doc(doc.data().categoriaId)
            //   .get()
            //   .then((snap) => {
            //     categoriaDesc = snap.data().nomeCategoria;
            //     console.log("categoria");
            //     console.log(categoriaDesc);
            //   })
            //   .catch((err) => toast.error("error ao recuperar a categoria"));
            /*firebase
              .firestore()
              .collection("produtos")
              .doc(doc.data().produtoId)
              .then((snapProduto) => {
                let produto = snapProduto.data();
                console.log("produto");
                console.log(produto);
              })
              .catch((e) => toast.error("erro ao recuperar o produto"));
            firebase
              .firestore()
              .collection("dominioTipoPagamento")
              .doc(doc.data().formaPagamento)
              .then((snapPagamento) => {
                let formaPagamento = snapPagamento.data();
                console.log("formaPagamento");
                console.log(formaPagamento);
              });*/
            console.log(doc.data());
          });
        })
        .catch((erro) => {
          toast.error("Erro ao recuperar itens vendidos");
        });
    }
    async function recuperaCategoria(categoriaId) {
      let categoriaDesc = "";

      await firebase
        .firestore()
        .collection("categorias")
        .where(firebase.firestore.FieldPath.documentId(), "in", [
          "mfxa3pKHfLHoQoiSsr8E",
          "YRYmVeFhUhWLk1MTUGbe",
        ])
        .get()
        .then((snap) => {
          console.log(snap);
          snap.forEach((doc) => {
            console.log(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao recuperar categorias");
        });
      return categoriaDesc;
    }
    recuperaItensVendidos();
    recuperaCategoria();
  }, []);
  console.log(listaVendas);

  return (
    <PersistentDrawerLeft>
      <div className="container main box center conteudo">
        <div className={classes.root}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {" "}
                  <span className="center">
                    Laís Macedo Joias e Acessorios
                    <br />
                    {/* <Typography variant="h5" className="center" component="h2"> */}
                    Lista de vendas
                    {/* </Typography> */}
                  </span>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <table></table>
                <div>
                  <h3>filtros</h3>
                </div>
                <Divider />
                <div className="conteudo">
                  <h2>Produto</h2>
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <CardActions className="group-btn">
                  <Button
                    // type="submit"
                    // onClick={salvarVenda}
                    className="btn-salvar"
                    color="primary"
                    variant="contained"
                    // disabled={saveLoad}
                  >
                    Salvar
                  </Button>
                  <Button
                    // onClick={limpar}
                    className="btn-salvar"
                    variant="contained"
                    color="secondary"
                  >
                    Limpar
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </PersistentDrawerLeft>
  );
}
