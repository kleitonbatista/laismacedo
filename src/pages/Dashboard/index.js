import { Button, Container, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../service/firebaseConnection";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import logoLm from "../../assets/laisMacedo.png";



import "./style.css";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const [codigo, setCodigo] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [total, setTotal] = useState('');
  const [percentaul, setPercentual] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [sugestaoMin, setSugestaoMin] = useState('');
  const [sugestaoMax, setSugestaoMax] = useState('');
  const [numeracao, setNumeracao] = useState();
  const [lucroUnitario, setLucroUnitario] = useState('');
  const [lucroTotal, setLucroTotal] = useState('');

  useEffect(() => {
    function calculaValorDeVenda() {
      if (valor > 0 && percentaul > 0) {
        let percent = percentaul / 100;
        let valorFinal = valor * percent
        setValorVenda((parseFloat(valorFinal) + parseFloat(valor)).toFixed(2));
        setSugestaoMin(Math.floor(valorVenda));
      }
    }
    calculaValorDeVenda()
  }, [percentaul, valor, valorVenda])

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
  }, [valorVenda])

  function calculaTotal() {
    if (valor > 0 && quantidade > 0) {
      setTotal((valor * quantidade).toFixed(2));
    }
  }
  function limpar() {
    setCodigo('');
    setProduto('');
    setQuantidade('');
    setValor('');
    setSugestaoMax('');
    setSugestaoMin('');
    setNumeracao('');
    setValor('');
    setTotal('');
    setPercentual('');
    setValorVenda('');
    setLucroTotal('');
    setLucroUnitario('');
  }
  function salvar() {
    firebase.firestore().collection("produtos").add({
      codigo: codigo,
      descricaoProduto: produto,
      quantidade: quantidade,
      valor: valor,
      total: total,
      percentual: percentaul,
      valorVenda: valorVenda,
      sugestaoOne: sugestaoMin,
      sugestaoTwo: sugestaoMax,
      numeracao: numeracao
    }).then((res) => {
      console.log(res);
      toast.success("salvo com sucesso! " + res.id);
    }).catch((err) => {
      console.log("erro");
      console.log(err);
    });
  }
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className="container">
      <Container maxWidth="md" className="main">
        <div className="titulo">
          <img src={logoLm} className="logoLm" alt="logo do sistema" />
          <div className="sub-titulo">
            <h1>Laís Macedo</h1>
            <h3>Joias e Acessórios</h3>
          </div>
        </div>
        <div className="box">
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <span className="center">
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <span className="center">Laís Macedo Joias e Acessorios</span>
                </Typography>
              </span>
              <Typography variant="h5" className="center" component="h2">
                Cadastro de Itens
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {/* adjective */}
              </Typography>
              {/* <Typography variant="body2" > */}
              <div className="topo">

                <TextField type="number" label="Código" onChange={(e) => setCodigo(e.target.value)} value={codigo} id="outlined-basic" variant="standard" />

                {/*  */}
                <InputLabel id="demo-simple-select-label" className="lbl-select">Categoria</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  className="select"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Colar</MenuItem>
                  <MenuItem value={20}>Brinco</MenuItem>
                  <MenuItem value={30}>Pingente</MenuItem>
                  <MenuItem value={40}>Conjunto</MenuItem>
                </Select>
              </div>
              {/*  */}
              <br />
              <TextField className="largura space-height" type="text" label="Produto" onChange={(e) => setProduto(e.target.value)} value={produto} id="outlined-basic" variant="standard" />
              <br />
              <TextField type="number" label="Quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} className="space-height" id="outlined-basic" variant="standard" />
              <TextField type="text" label="Valor" onChange={(e) => { setValor(e.target.value) }} onKeyUp={calculaTotal} value={valor} className="area-valor-space space-height" id="outlined-basic" variant="standard" />
              {total > 0 && (
                <>
                  <TextField type="text" label="Total" value={total} className="area-valor-space space-height" id="outlined-basic" variant="standard" />
                  <br />
                  <TextField type="text" label="Percentual %" onChange={(e) => setPercentual(e.target.value)} value={percentaul} className="space-height" id="outlined-basic" variant="standard" />
                  <TextField type="text" label="Venda Unitário" onChange={(e) => setValorVenda(e.target.value)} value={valorVenda} className="area-valor-space space-height" id="outlined-basic" variant="standard" />
                  <TextField type="text" label="Valor Sugerido" value={sugestaoMin} className="area-valor-space space-height" id="outlined-basic" variant="standard" />
                  <br />
                  <TextField type="text" label="Lucro Unitário" value={lucroUnitario} className="space-height" id="outlined-basic" variant="standard" />
                  <TextField type="text" label="Lucro Total" value={lucroTotal} className="area-valor-space space-height" id="outlined-basic" variant="standard" />
                </>)}
              {/* <TextField type="text" label="Valor Sugerido 2" onChange={(e) => setSugestaoMax(e.target.value)} value={sugestaoMax} className="" id="outlined-basic" variant="standard" /> */}
              <br />
              <TextField type="number" label="Numeração" onChange={(e) => setNumeracao(e.target.value)} value={numeracao} className="space-height" id="outlined-basic" variant="standard" />
              <TextField multiline type="text" label="Observações" maxRows={4} className="space-height area-valor-space line" id="outlined-basic" variant="standard" />
              {/* </Typography> */}
            </CardContent>
            <CardActions className="group-btn">
              <Button onClick={salvar} className="btn-salvar" color="primary" variant="outlined">Salvar</Button>
              <Button onClick={limpar} className="btn-salvar" variant="outlined">Limpar</Button>

            </CardActions>
          </Card>
        </div>
      </Container >
    </div>
  );
}
