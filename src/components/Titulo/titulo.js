import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";


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

export default function Titulo({textoTitulo}){
    const classes = useStyles();

    return (
        // <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {" "}
                <span className="center">
                  Laís Macedo Joias e Acessorios
                  <br />
                  {/* <Typography variant="h5" className="center" component="h2"> */}
                  {textoTitulo}
                  {/* </Typography> */}
                </span>
              </Paper>
            </Grid>
        //  </Grid>
    );
}