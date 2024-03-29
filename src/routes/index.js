import {Switch} from 'react-router-dom';
import Categoria from '../pages/Categoria';
import Dashboard from '../pages/Dashboard';
import CadastroItem from '../pages/CadastroItem';
import RegistrarVenda from '../pages/Venda';

// import PersistentDrawerLeft from '../pages/Drawer/drawer';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';
import ListarItens from '../pages/Itens';
import ListarVendas from '../pages/Venda/listarVenda';

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/cadastro" component={SignUp}/>
            <Route exact isPrivate={true} path="/categoria" component={Categoria}/>
            <Route exact isPrivate={true} path="/dashboard" component={Dashboard}/>
            <Route exact isPrivate={true} path="/cadastro-item/:id?" component={CadastroItem}/>
            <Route exact isPrivate={true} path="/listar-itens" component={ListarItens}/>
            <Route exact isPrivate={true} path="/registrar-venda/:id?" component={RegistrarVenda}/>
            <Route exact isPrivate={true} path="/listar-venda" component={ListarVendas}/>
            {/* <Route exact isPrivate={true} path="/drawer"  component={PersistentDrawerLeft}/> */}
        </Switch>
    );
}