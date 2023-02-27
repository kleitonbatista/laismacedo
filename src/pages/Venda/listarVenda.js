import PersistentDrawerLeft from "../../components/Drawer/drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
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
import TabelaDatasPagamento from "../../components/TabelaDatasPagamento/tabelaDatasPagamento";

import SearchIcon from "@mui/icons-material/Search";

import { doc, setDoc } from "firebase/firestore";
import DetalhamentoVenda from "../../components/Modal/modalDetalhamentoVenda";

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
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaIdsCategorias, setIdsCategorias] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    async function recuperaItensVendidos() {
      await firebase
        .firestore()
        .collection("venda")
        .get()
        .then(async (snapshot) => {
          let vendas = [];
          let ids = [];
          snapshot.forEach((doc) => {
            ids.push(doc.data().categoriaId);
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
          });
          setListaVendas(vendas);
          setIdsCategorias(ids);
        })
        .catch((erro) => {
          toast.error("Erro ao recuperar itens vendidos");
        });
    }

    recuperaItensVendidos();
  }, []);
  useEffect(() => {
    async function recuperaCategoria(categoriaId) {
      let categoriaDesc = "";

      await firebase
        .firestore()
        .collection("categorias")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          listaIdsCategorias
        )
        .get()
        .then((snap) => {
          console.log(snap);
          let categorias = [];
          snap.forEach((doc) => {
            categorias.push({
              idCategoria: doc.id,
              nomeCategoria: doc.data().nomeCategoria,
            });
          });
          setListaCategorias(categorias);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao recuperar categorias");
        });
      return categoriaDesc;
    }
    recuperaCategoria();
  }, [listaIdsCategorias]);

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
                <h2>Vendas</h2>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Categoria</th>
                      <th scope="col">Código</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Valor Venda</th>
                      <th scope="col">Lucro</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Pagamento Concluído</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaVendas.map((v, i) => {
                      return (
                        <tr>
                          <td>
                            {listaCategorias.length > 0 &&
                              listaCategorias.find(
                                ({ idCategoria }) =>
                                  idCategoria == v.categoriaId
                              ).nomeCategoria}
                          </td>
                          <td>{v.codigoProduto}</td>
                          <td>{v.descricaoProduto}</td>
                          <td>{v.valorVendaReal}</td>
                          <td>{v.valorVendaReal - v.valorOriginal}</td>
                          <td>{v.cliente}</td>
                          <td>{v.recebidoCompleto ? "Sim" : "Não"}</td>
                          <td>
                            <IconButton color="primary" onClick={(e)=>{handleOpen(); setVendaSelecionada(v.id)}}>
                              <SearchIcon size="small" />
                            </IconButton>
                            {/* </Button> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                <h1> {vendaSelecionada}</h1>

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
      <DetalhamentoVenda openF={handleOpen} open={open} handleClose={handleClose} idVenda={vendaSelecionada}/>
      
    </PersistentDrawerLeft>
  );
}
