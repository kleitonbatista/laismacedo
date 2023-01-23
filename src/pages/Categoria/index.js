
import { Button, Chip, Container, Divider, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth";
import firebase from "../../service/firebaseConnection";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";

import logoLm from "../../assets/laisMacedo.png";


import "./categoria.css";
import PersistentDrawerLeft from "../../components/Drawer/drawer";

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


export default function Categoria() {

    const [categoria, setCategoira] = useState("");

    const classes = useStyles();
    const [status, setStatus] = useState('A');

    const [listaCategorias, setListaCategorias] = useState([]);
    const [loadListaCategoria, setLoadListaCategoria] = useState(true);

    const handleChangeRadio = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        
        recuperarTodos();
    }, []);
    async function recuperarTodos() {
        await firebase.firestore().collection("categorias").get().then((snapshot) => {
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nomeCategoria: doc.data().nomeCategoria,
                    statusCategoria: doc.data().statusCategoria

                });
                setLoadListaCategoria(false);
                setListaCategorias(lista);

            });
        }).catch((err) => {
            console.log("erro ao recuperar categorias");
            setLoadListaCategoria(false);
        })
    }
    function salvar(e) {
        if (categoria.trim().length == 0 || status.trim().length == 0) {
            toast.error("Todos os campos devem ser preenchidos");
            return;
        }
        firebase.firestore().collection("categorias").add({
            nomeCategoria: categoria,
            statusCategoria: status
        }).then(async (res) => {
            toast.success("Categoria salva com sucesso! ");
            await recuperarTodos();
            limpar();

        }).catch((err) => {
            toast.error("Falha ao salvar!");
        });
    }
    function limpar() {
        setCategoira('');
        setStatus('')
    }

    return (
        <PersistentDrawerLeft>
            <div className="container">
                <Container maxWidth="md" className="main">
                    <div className="box">

                        <Card className={classes.root} variant="outlined">
                            

                            <CardContent>
                                <span className="center">
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        <span className="center">Laís Macedo Joias e Acessorios</span>
                                    </Typography>
                                </span>
                                <Typography variant="h5" className="center" component="h2">
                                    Cadastro de Categorias
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {/* adjective */}
                                </Typography>
                                {/* <Typography variant="body2" > */}
                                <div className="topo">
                                    <TextField className="input-categoria" type="text" label="Nome Categoria"
                                        onChange={(e) => setCategoira(e.target.value)}
                                        value={categoria} id="outlined-basic" variant="standard" />
                                    {/* <Radio
                                    checked={selectedValue === 'a'}
                                    onChange={handleChangeRadio}
                                    value="a"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                    label="Ativo"
                                    labelPlacement="start"
                                /> */}


                                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                        <FormControlLabel
                                            value="A"
                                            checked={status === 'A'}
                                            onChange={handleChangeRadio}
                                            control={<Radio color="primary" />}
                                            label="Ativo"
                                            labelPlacement="start"
                                        />

                                        <FormControlLabel
                                            value="I"
                                            checked={status === 'I'}
                                            onChange={handleChangeRadio}
                                            control={<Radio color="primary" />}
                                            label="Inativo"
                                            labelPlacement="start"
                                        />

                                    </RadioGroup>
                                </div>

                            </CardContent>
                            <CardActions className="group-btn">
                                <Button onClick={salvar} className="btn-salvar" color="primary" variant="outlined">Salvar</Button>
                                <Button onClick={limpar} className="btn-salvar" variant="outlined">Limpar</Button>

                            </CardActions>
                            <br/>
                            <Divider/>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Situação</th>
                                        <th scope="col">Data Cadastro</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaCategorias.map((item, index) => {

                                        return (<tr key={index}>
                                            <td data-label="Categoria">{item.nomeCategoria}</td>
                                            <td data-label="Situação">
                                                <Chip label={item.statusCategoria == 'A' ? 'Ativo' : 'Inativo'} color={item.statusCategoria == 'A' ? 'success' : 'default'}/>
                                                
                                            </td>
                                            <td data-label="Data">{item.id}</td>
                                            <td data-label="#">
                                                <button className="action" style={{ backgroundColor: '#3583f6' }}><SearchIcon color="#FFF" /></button>
                                                <button className="action" style={{ backgroundColor: '#F6A935' }}><EditIcon color="#FFF" /></button>
                                            </td>
                                        </tr>);
                                    })}

                                </tbody>
                            </table>
                        </Card>
                    </div>
                </Container >
            </div>
        </PersistentDrawerLeft>
    );
}