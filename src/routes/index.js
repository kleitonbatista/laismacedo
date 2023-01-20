import {Switch} from 'react-router-dom';
import Categoria from '../pages/Categoria';
import Dashboard from '../pages/Dashboard';
// import PersistentDrawerLeft from '../pages/Drawer/drawer';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/cadastro" component={SignUp}/>
            <Route exact isPrivate={true} path="/categoria" component={Categoria}/>
            <Route exact isPrivate={true} path="/dashboard" component={Dashboard}/>
            {/* <Route exact isPrivate={true} path="/drawer"  component={PersistentDrawerLeft}/> */}
        </Switch>
    );
}