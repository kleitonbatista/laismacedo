
import { Button, Container, TextField } from "@mui/material";
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

import { toast } from "react-toastify";

import logoLm from "../../assets/laisMacedo.png";


import "./categoria.css";

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

    const handleChangeRadio = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        
        recuperarTodos();
    }, []);
    function recuperarTodos() {
        firebase.firestore().collection("categorias").get().then((res) => {
            
            console.log(res.docs.data());
        }).catch((err) => {
            console.log("erro ao recuperar categorias");
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
        }).then((res) => {
            toast.success("Categoria salva com sucesso! ");
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
                    </Card>
                </div>
            </Container >
        </div>
    );
}