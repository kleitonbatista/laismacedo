import { Button, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../service/firebaseConnection";

import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@mui/material/InputAdornment";

import "./style.css";
import PersistentDrawerLeft from "../../components/Drawer/drawer";
import { useParams } from "react-router-dom";

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

export default function Dashboard2() {
  const { signOut } = useContext(AuthContext);
  const [codigo, setCodigo] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [total, setTotal] = useState("");
  const [percentaul, setPercentual] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [sugestaoMin, setSugestaoMin] = useState("");
  const [sugestaoMax, setSugestaoMax] = useState("");
  const [numeracao, setNumeracao] = useState();
  const [lucroUnitario, setLucroUnitario] = useState("");
  const [lucroTotal, setLucroTotal] = useState("");
  const [observacao, setObservacao] = useState("");
  const [listaCategorias, setListaCategorias] = useState([]);
  const [loadCategoria, setLoadCategoria] = useState(true);
  const [categoriaSelected, setCategoriaSelected] = useState(0);
  const [saveLoad, setSaveLoad] = useState(false);
  const [itemId, setItemId] = useState(null);

  // id do produto a ser editado
  const { id } = useParams();

  useEffect(() => {
    async function recuperarItemEdicao() {
      await firebase
        .firestore()
        .collection("produtos")
        .doc(id)
        .get()
        .then((snapshot) => {
          let produto = {
            id: snapshot.id,
            categoriaId: snapshot.data().categoriaId,
            codigo: snapshot.data().codigo,
            descricaoProduto: snapshot.data().descricaoProduto,
            numeracao: snapshot.data().numeracao,
            observacao: snapshot.data().observacao,
            percentual: snapshot.data().percentual,
            quantidade: snapshot.data().quantidade,
            sugestaoOne: snapshot.data().sugestaoOne,
            total: snapshot.data().total,
            valor: snapshot.data().valor,
            valorVenda: snapshot.data().valorVenda,
          };
          setCodigo(snapshot.data().codigo);
          setCategoriaSelected(snapshot.data().categoriaId);
          setProduto(snapshot.data().descricaoProduto);
          setNumeracao(snapshot.data().numeracao);
          setObservacao(snapshot.data().observacao);
          setValor(snapshot.data().valor);
          setPercentual(snapshot.data().percentual);
          setQuantidade(snapshot.data().quantidade);
          setTotal(snapshot.data().total);

          console.log(produto);
        })
        .catch((err) => {
          console.log("Erro ao recuperar produto para edição ", err);
        });
    }
    if (id != undefined) {
      setItemId(id);
      recuperarItemEdicao();
    }
  }, [id]);

  useEffect(() => {
    function calculaValorDeVenda() {
      if (valor > 0 && percentaul > 0) {
        let percent = percentaul / 100;
        let valorFinal = valor * percent;
        setValorVenda((parseFloat(valorFinal) + parseFloat(valor)).toFixed(2));
        setSugestaoMin(Math.floor(valorVenda));
      }
    }
    calculaValorDeVenda();
  }, [percentaul, valor, valorVenda]);

  useEffect(() => {
    function calculoLucroUnitario() {
      setLucroUnitario((valorVenda - valor).toFixed(2));
    }
    function caculoLucroTotal() {
      let vendaTotal = valorVenda * quantidade;
      setLucroTotal((vendaTotal - total).toFixed(2));
    }
    if (valorVenda > 0 && valor > 0 && quantidade > 0) {
      calculoLucroUnitario();
      caculoLucroTotal();
    }
  }, [valorVenda]);

  useEffect(() => {
    async function loadCategoriasBD() {
      await firebase
        .firestore()
        .collection("categorias")
        .get()
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            if (doc.data().statusCategoria === "A") {
              lista.push({
                id: doc.id,
                nomeCategoria: doc.data().nomeCategoria,
              });
            }
          });

          if (lista.length === 0) {
            console.log("Nenhuma categoria encontrada no banco de dados");
            setCategoriaSelected([{ id: 1, nomeCategoria: "Selecione" }]);
            setLoadCategoria(false);
            return;
          }

          setListaCategorias(lista);
          setLoadCategoria(false);
        })
        .catch((err) => {
          console.log("deu algum erro", err);
          setLoadCategoria(false);
          setCategoriaSelected([{ id: 1, nomeCategoria: "Selecione" }]);
        });
    }
    loadCategoriasBD();
  }, []);

  function calculaTotal() {
    if (valor > 0 && quantidade > 0) {
      setTotal((valor * quantidade).toFixed(2));
    }
  }
  function limpar() {
    setCodigo("");
    setProduto("");
    setQuantidade("");
    setValor("");
    setSugestaoMax("");
    setSugestaoMin("");
    setNumeracao("");
    setValor("");
    setTotal("");
    setPercentual("");
    setValorVenda("");
    setLucroTotal("");
    setLucroUnitario("");
    setObservacao("");
    setCategoriaSelected(0);
    setItemId(null);
  }
  function validacao() {
    console.log(categoriaSelected);
    if (codigo.trim().length === 0) {
      toast.error("O código do produto deve ser informado!");
      return false;
    }
    if (categoriaSelected === 0) {
      toast.error("A categoria do produto deve ser informado!");
      return false;
    }
    if (produto.trim().length === 0) {
      toast.error("A descrição do produto deve ser informado!");
      return false;
    }
    if (quantidade.trim().length === 0 || quantidade < 0) {
      toast.error("A quantidade do produto deve ser informado!");
      return false;
    }
    if (valor.trim().length === 0 || valor < 0) {
      toast.error("O valor do produto deve ser informado!");
      return false;
    }
    if (percentaul.trim().length === 0 || percentaul < 0) {
      toast.error("O percentual do produto deve ser informado!");
      return false;
    }
    if (numeracao < 0) {
      toast.error("A numeração deve ser informada corretamente!");
      return false;
    }
    return true;
  }
  async function atualizaItem() {
    if (!validacao()) {
      return false;
    } else {
      await firebase.firestore().collection("produtos").doc(itemId).update({
        codigo: codigo,
        descricaoProduto: produto,
        quantidade: quantidade,
        valor: valor,
        total: total,
        percentual: percentaul,
        valorVenda: valorVenda,
        sugestaoOne: sugestaoMin,
        sugestaoTwo: sugestaoMax,
        numeracao: numeracao,
        categoriaId: categoriaSelected,
        observacao: observacao,
      }).then((res)=>{
        toast.success("Item atualizado com sucesso!");
        setSaveLoad(false);
        limpar();
      }).catch((err)=>{
        toast.error("Falha ao atualizar");
        console.log("Erro ao tentar atualizar o registro ", err);
        setSaveLoad(false);

      });
    }
  }
  async function salvar(e) {
    e.preventDefault();
    if (itemId) {
      atualizaItem();
      setSaveLoad(true);
      return;
    }
    if (!validacao()) {
      return false;
    } else {
      setSaveLoad(true);
      await firebase
        .firestore()
        .collection("produtos")
        .add({
          codigo: codigo,
          descricaoProduto: produto,
          quantidade: quantidade,
          valor: valor,
          total: total,
          percentual: percentaul,
          valorVenda: valorVenda,
          sugestaoOne: sugestaoMin,
          sugestaoTwo: sugestaoMax,
          numeracao: numeracao,
          categoriaId: categoriaSelected,
          observacao: observacao,
        })
        .then((res) => {
          toast.success("salvo com sucesso! " + res.id);
          limpar();
          setSaveLoad(false);
        })
        .catch((err) => {
          setSaveLoad(false);
          console.log("erro");
          console.log(err);
        });
    }
  }

  //chamado quando troca a categoria
  function handleChangeCategorias(e) {
    setCategoriaSelected(e.target.value);
  }

  const classes = useStyles();
  return (
    <PersistentDrawerLeft>
      <div className="container main box center">
        <div className={classes.root}>
          <Grid container spacing={3}>
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
            <Grid item xs={12} sm={6}>
              {/* <Paper className={classes.paper}> */}
              <TextField
                type="number"
                label="Código"
                className="input"
                onChange={(e) => setCodigo(e.target.value)}
                value={codigo}
                id="outlined-basic"
                variant="standard"
                // helperText="Código do produto é obrigatório"
                // required
              />
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Paper className={classes.paper}> */}
              <InputLabel
                // required
                id="demo-simple-select-label"
                className="lbl-select"
              >
                Categoria
              </InputLabel>

              <Select
                // required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoriaSelected}
                className=" input"
                onChange={handleChangeCategorias}
              >
                {listaCategorias.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.nomeCategoria}
                    </MenuItem>
                  );
                })}
              </Select>
              {/* </Paper> */}
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                // required
                className="input"
                // fullWidth
                type="text"
                label="Produto"
                onChange={(e) => setProduto(e.target.value)}
                value={produto}
                id="outlined-basic"
                variant="standard"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                // required
                type="number"
                label="Quantidade"
                onChange={(e) => setQuantidade(e.target.value)}
                value={quantidade}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                // required
                type="text"
                label="Valor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setValor(e.target.value);
                }}
                onKeyUp={calculaTotal}
                value={valor}
                className="input"
                id="outlined-basic"
                variant="standard"
              />{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Total"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={total}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Percentual %"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                onChange={(e) => setPercentual(e.target.value)}
                value={percentaul}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Venda Unitário"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                onChange={(e) => setValorVenda(e.target.value)}
                value={valorVenda}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Valor Sugerido"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={sugestaoMin}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Lucro Unitário"
                value={lucroUnitario}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="text"
                label="Lucro Total"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={lucroTotal}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                label="Numeração"
                onChange={(e) => setNumeracao(e.target.value)}
                value={numeracao}
                className="input"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={9}>
              <TextField
                multiline
                type="text"
                label="Observações"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                maxRows={4}
                className="input line txt-area"
                id="outlined-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CardActions className="group-btn">
                <Button
                  onClick={salvar}
                  className="btn-salvar"
                  color="primary"
                  variant="contained"
                  disabled={saveLoad}
                >
                  {saveLoad ? "Aguarde ..." : (itemId) ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  onClick={limpar}
                  className="btn-salvar"
                  variant="contained"
                  color="secondary"
                >
                  Limpar
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </div>
      </div>
    </PersistentDrawerLeft>
  );
}
