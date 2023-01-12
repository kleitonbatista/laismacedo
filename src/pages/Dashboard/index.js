import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import "./style.css";
export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const [codigo, setCodigo] = useState('');
  const [produto,setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentaul, setPercentual] = useState(0);
  const [valorVenda, setValorVenda] = useState(0);
  const [sugestaoMin, setSugestaoMin] = useState(0);
  const [sugestaoMax, setSugestaoMax] = useState(0);
  const [numeracao, setNumeracao] = useState(0);
  return (
    <div className="container">
      <div className="form">
          <div className="form-input">
          <TextField type="number" label="Código" onChange={(e)=> setCodigo(e.target.value)}  value={codigo} className="col-md-8" id="outlined-basic" variant="standard"/>
          <TextField type="text"  label="Produto" onChange={(e)=>setProduto(e.target.value)} value={produto} className="col-md-12" id="outlined-basic"  variant="standard"/>
          <div className="area-valor">
            <TextField type="number" label="Quantidade" onChange={(e)=>setQuantidade(e.target.value)} value={quantidade} className="col-md-12" id="outlined-basic"  variant="standard"/>
            <TextField type="text" label="Valor" onChange={(e)=>setValor(e.target.value)} value={valor} className="area-valor-space" id="outlined-basic"  variant="standard"/>
            <TextField type="text"label="Total" onChange={(e)=>setTotal(e.target.value)} value={total} className="area-valor-space" id="outlined-basic"  variant="standard"/>
          </div>
          <div className="area-valor-final">
            <TextField type="text"  label="Percentual %" onChange={(e)=>setPercentual(e.target.value)} value={percentaul} className="col-md-12" id="outlined-basic"  variant="standard"/>
            <TextField type="text" label="Valor de Venda" onChange={(e)=>setValorVenda(e.target.value)} value={valorVenda} className="col-md-12" id="outlined-basic"  variant="standard"/>
            <TextField type="text" label="Valor Sugerido" onChange={(e)=>setSugestaoMin(e.target.value)} value={sugestaoMin} className="col-md-12" id="outlined-basic"  variant="standard"/>
            <TextField type="text" label="Valor Sugerido 2" onChange={(e)=>setSugestaoMax(e.target.value)} value={sugestaoMax} className="col-md-12" id="outlined-basic"  variant="standard"/>
         </div>
          <TextField type="number" label="Numeração" onChange={(e)=>setNumeracao(e.target.value)} value={numeracao} className="col-md-12" id="outlined-basic"  variant="standard"/>
          <Button className="btn-salvar" variant="outlined">Salvar</Button>
          </div>
        
      </div>
      <button onClick={() => signOut()}>Fazer Logout</button>

    </div>
  );
}
