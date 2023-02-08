import PersistentDrawerLeft from "../../components/Drawer/drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@mui/material";
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
  const [formaPagamentoSelected, setFormaPagamentoSelected] = useState(0);
  const [listaFormaPagamento, setListaFormaPagamento] = useState([]);
  const [isParcelado, setIsParcelado] = useState(false);
  const [listaQuantidadeParcelas, setListaQuantidadeParcelas] = useState([]);
  const [quantidadeParcelaSelected, setQuantidadeParcelasSelected] =
    useState(0);
  const [valorEntrada, setValorEntrada] = useState();
  const [valorVenda, setValorVenda] = useState();
  const [valorParcela, setValorParcela] = useState();
  const [descricaoFormaPagamento, setDescricaoFormaPagamento] = useState();
  const [dataPrimeiraParcela, setDataPrimeiraParcela] = useState();

  // id do produto a ser editado
  const { id } = useParams();

  function handleChangeQuantidadeParcelas(e) {
    setQuantidadeParcelasSelected(e.target.value);
  }
  async function handleChangeFormaPagamento(e) {
    setFormaPagamentoSelected(e.target.value);
    await firebase
      .firestore()
      .collection("dominioTipoPagamento")
      .doc(e.target.value)
      .get()
      .then((snap) => {
        setIsParcelado(snap.data().codigo == 10);
      })
      .catch((error) => {
        toast.error("Erro ao recuperar formas de pagamento");
      });
  }

  useEffect(() => {
    async function criaArrayQuantidadeParcelas() {
      let parcelas = [];
      for (let i = 1; i <= 10; i++) {
        parcelas.push({
          value: i,
          label: `${i} x`,
        });
      }
      setListaQuantidadeParcelas(parcelas);
    }
    async function recuperaFormasPagamento() {
      await firebase
        .firestore()
        .collection("dominioTipoPagamento")
        .get()
        .then((snapshot) => {
          let tipoPagamento = [];
          snapshot.forEach((doc) => {
            if (doc.data().status === true) {
              tipoPagamento.push({
                id: doc.id,
                descricao: doc.data().descricao,
                codigo: doc.data().codigo,
              });
              console.log(doc.data());
            } else {
              console.log("false");
            }
            if (tipoPagamento.length === 0) {
              console.log(
                "Nenhuma forma de pagamento encontrada no banco de dados"
              );
              setFormaPagamentoSelected([
                { id: 1, nomeCategoria: "Selecione" },
              ]);
              return;
            }

            setListaFormaPagamento(tipoPagamento);
          });
        })
        .catch((err) => {
          toast.error("Erro ao recuperar formas de pagamento!");
        });
    }
    recuperaFormasPagamento();
    criaArrayQuantidadeParcelas();
  }, []);
  useEffect(() => {
    async function recuperarDadosItensVenda() {
      let categoriaDesc = "";
      await firebase
        .firestore()
        .collection("produtos")
        .doc(id)
        .get()
        .then(async (snapshot) => {
          await firebase
            .firestore()
            .collection("categorias")
            .doc(snapshot.data().categoriaId)
            .get()
            .then((snap) => {
              categoriaDesc = snap.data().nomeCategoria;
            })
            .catch((err) => console.log("Erro ao recuperar a categoria", err));
          let produtoRecuperado = {
            id: id,
            categoria: categoriaDesc,
            ...snapshot.data(),
          };
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

  useEffect(() => {
    function calculoValorParcela() {
      if (
        valorEntrada < 0 ||
        valorEntrada == undefined ||
        valorEntrada.length == 0
      ) {
        setValorEntrada(0);
      }
      if (parseFloat(valorVenda) > 0 && quantidadeParcelaSelected > 0) {
        let valorDaParcela =
          (valorVenda - parseFloat(valorEntrada)) / quantidadeParcelaSelected;
        setValorParcela(valorDaParcela.toFixed(2));

        let descricaoPag =
          (valorEntrada > 0 ? `R$ ${valorEntrada.toFixed(2)} + ` : "") +
          `${quantidadeParcelaSelected}x R$ ${valorDaParcela.toFixed(2)}`;

        setDescricaoFormaPagamento(descricaoPag);
      }
    }
    calculoValorParcela();
  }, [valorEntrada, valorVenda, quantidadeParcelaSelected]);

  async function salvarVenda(e){
    let venda = {
      produtoId : produto.id ,
      categoriaId: produto.categoriaId,
      codigoProduto: produto.codigo,
      descricaoProduto: produto.descricaoProduto,
      percentualPrevisto: produto.percentual,
      valorOriginal: produto.valor,
      valorPrevistoVenda: produto.valorVenda,
      valorVendaReal : valorVenda,
      formaPagamento: formaPagamentoSelected,
      quantidadeParcela: quantidadeParcelaSelected,
      dataVenda: "",
      dataPrimeiraParcela: "",
      valorEntrada:  valorEntrada,
      cliente : "",
      contatoCliente : "",
      recebidoCompleto : true,
      quantidadeItemVendido : 1
    }
    await firebase.firestore().collection("venda").add(venda).then((res)=>console.log(res)).catch((err)=>console.log(err))
    alert("salvar");
    e.preventdefault();

    console.log(produto);
  }
  return (
    <PersistentDrawerLeft>
      <div className="container main box center">
        <div className={classes.root}>
          <form >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {" "}
                  <span className="center">
                    Laís Macedo Joias e Acessorios
                    <br />
                    {/* <Typography variant="h5" className="center" component="h2"> */}
                    Cadastro de Itens
                    {/* </Typography> */}
                  </span>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <h2>Produto</h2>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Categoria</th>
                      <th scope="col">Código</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Valor Venda</th>
                      <th scope="col">Estoque</th>
                      <th scope="col">Número</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Categoria">{produto.categoria}</td>
                      <td data-label="Código">{produto.codigo}</td>
                      <td data-label="Produto">{produto.descricaoProduto}</td>
                      <td data-label="Valor Venda">{produto.valorVenda}</td>
                      <td data-label="Estoque">{produto.quantidade}</td>
                      <td data-label="Número">{produto.numeracao}</td>
                      <td data-label="Ação"></td>
                    </tr>
                  </tbody>
                </table>
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  // required
                  type="date"
                  label="Data da venda"
                  // value="22/10/2023"
                  className="input"
                  id="outlined-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  // required
                  type="number"
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)}
                  label="Valor Vendido"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  className="input"
                  id="outlined-basic"
                  variant="standard"
                />{" "}
              </Grid>
              <Grid item xs={6} sm={3}>
                <InputLabel
                  // required
                  id="demo-simple-select-label"
                  className="lbl-select"
                >
                  Forma da Pagamento
                </InputLabel>

                <Select
                  // required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formaPagamentoSelected}
                  className="select input"
                  onChange={handleChangeFormaPagamento}
                >
                  {listaFormaPagamento.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.descricao}
                      </MenuItem>
                    );
                  })}
                </Select>
                {/* </div> */}
              </Grid>
              {isParcelado && (
                <Grid item xs={6} sm={3}>
                  <InputLabel
                    // required
                    id="demo-simple-select-label"
                    className="lbl-select"
                  >
                    Quantidade de Parcelas
                  </InputLabel>

                  <Select
                    // required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantidadeParcelaSelected}
                    className="select input"
                    onChange={handleChangeQuantidadeParcelas}
                  >
                    {listaQuantidadeParcelas.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              {isParcelado && (
                <Grid item xs={6} sm={3}>
                  <TextField
                    type="number"
                    label="Valor Entrada"
                    value={valorEntrada}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                    onChange={(e) => setValorEntrada(e.target.value)}
                    className="input"
                    id="outlined-basic"
                    variant="standard"
                  />
                </Grid>
              )}

              {isParcelado && (
                <Grid item xs={6} sm={3}>
                  <TextField
                    type="text"
                    label=" "
                    disabled={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                    value={descricaoFormaPagamento}
                    // onChange={(e) => setValorEntrada(e.target.value)}
                    className="input"
                    id="outlined-basic"
                    variant="standard"
                  />
                </Grid>
              )}

              {isParcelado && (
                <Grid item xs={6} sm={3}>
                  <TextField
                    type="date"
                    label="Data Primeira Parcela"
                    value={dataPrimeiraParcela}
                    onChange={(e) => setDataPrimeiraParcela(e.target.value)}
                    className="input"
                    id="outlined-basic"
                    variant="standard"
                  />
                </Grid>
              )}
              {isParcelado && (
                <Grid item xs={6} sm={3}>
                  <Accordion className="input">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Parcelas</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TabelaDatasPagamento
                        dataInicial={dataPrimeiraParcela}
                        valorParcela={valorParcela}
                        quantidadeParcela={quantidadeParcelaSelected}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* <table className="input" style={{fontSize : '8px', with: '30%'}}>
                  <thead>
                    <tr>
                      <th>N</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>24/02/2023</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>24/02/2023</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>24/02/2023</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>24/02/2023</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>24/02/2023</td>
                    </tr>
                  </tbody>
                </table> */}
                </Grid>
              )}
              <Grid item xs={6} sm={6}>
                <TextField
                  type="text"
                  label="Cliente"
                  // value={valorEntrada}
                  // onChange={(e) => setValorEntrada(e.target.value)}
                  className="input"
                  id="outlined-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type="text"
                  label="Contato"
                  // value={valorEntrada}
                  // onChange={(e) => setValorEntrada(e.target.value)}
                  className="input"
                  id="outlined-basic"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CardActions className="group-btn">
                  <Button
                  // type="submit"
                     onClick={salvarVenda}
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

    //           <fieldset>
    //             <legend>Dados Sobre a Venda</legend>
    //             <label>Data da venda dd/mm/yyyy</label>
    //             <br />
    //             <label>valor vendido: R$ xx</label>
    //             <br />
    //             <label>Forma te pagamento: Pix, Dinheiro, Parcelado</label>
    //             <br />
    //             <label>Quantidade de parcelas N</label>
    //             <br />
    //             <label>Data primeira parecela dd/mm/yyyy</label>
    //             <br />
    //             <label>Valor previsto das parcelas: R$ xx.xx</label>
    //             <br />
    //             <label>Entrada: S, Valor: R$ XX </label>
    //             <br />
    //             <label>Nome Cliente: Fulano de Tal</label>
    //             <br />
    //             <label>Telefone contato: (xx) xxxxx-xxxx</label> <br />
    //           </fieldset>
    //         </div>
    //       </Grid>
    //     </div>
    //   </div>
    // </PersistentDrawerLeft>
  );
}
