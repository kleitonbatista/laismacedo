import PersistentDrawerLeft from '../../components/Drawer/drawer';
import firebase from "../../service/firebaseConnection";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useContext, useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

import './itens.css'
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        flexGrow: 1
    }, paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
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
export default function ListarItens() {
    const classes = useStyles();
    const [listaItens, setListaItens] = useState([]);
    const [loadItens, setLoadItens] = useState(true);

    useEffect(() => {
        async function recuperaListaItens() {
            await firebase.firestore().collection("produtos").get().then((snapshot) => {
                let itens = [];
                let nomeCategoria = "";
                snapshot.forEach(async (doc) => {
                    await firebase.firestore().collection("categorias").doc(doc.data().categoriaId).get().then((s)=>{
                        if(s.data().nomeCategoria != undefined){
                            nomeCategoria = s.data().nomeCategoria;
                        }
                    }).catch((e)=>console.log("erro aqui ", e))
                    
                    itens.push({
                        id: doc.id,
                        categoriaId: doc.data().categoriaId,
                        nomeCategoria: nomeCategoria,
                        codigo: doc.data().codigo,
                        descricaoProduto: doc.data().descricaoProduto,
                        numeracao: doc.data().numeracao,
                        observacao: doc.data().observacao,
                        percentual: doc.data().percentual,
                        quantidade: doc.data().quantidade,
                        sugestaoOne: doc.data().sugestaoOne,
                        total: doc.data().total,
                        valor: doc.data().valor,
                        valorVenda: doc.data().valorVenda
                    });
                    setListaItens(itens);
                    setLoadItens(false);
                })
            }).catch((error) => {
                setLoadItens(false);
                console.log("Error ao buscar os protudos");
            })
        }
        recuperaListaItens();
    }, [])
    return (
        <PersistentDrawerLeft>
            <div className="container main box center">
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>

                            <Paper className={classes.paper}>
                                <span className="center">
                                    Laís Macedo Joias e Acessorios
                                    <br />
                                    {/* <Typography variant="h5" className="center" component="h2"> */}
                                    Listagem de Itens
                                    {/* </Typography> */}
                                </span>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Produto</th>
                                        <th scope="col">Valor Venda</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col">Observações</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaItens.map((item, index) => {

                                        return (<tr key={index}>
                                            <td data-label="Categoria">{item.nomeCategoria}</td>
                                            <td data-label="Código">
                                                {item.codigo}
                                            </td>
                                            <td data-label="Produto">{item.descricaoProduto}</td>
                                            <td data-label="Valor Venda">{item.valor}</td>
                                            <td data-label="Quantidade">{item.quantidade}</td>
                                            <td data-label="Observações">{item.observacao}</td>
                                            <td data-label="#">
                                                <button className="action" style={{ backgroundColor: '#3583f6' }}><SearchIcon color="#FFF" /></button>
                                                <Link to={`/cadastro-item/${item.id}`}>  <button className="action" style={{ backgroundColor: '#F6A935' }}><EditIcon color="#FFF" /></button></Link>
                                            </td>
                                        </tr>);
                                    })}

                                </tbody>
                            </table>
                           
                        </Grid>
                    </Grid>
                </div>
            </div>
        </PersistentDrawerLeft>

    );
}