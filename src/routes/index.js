import {Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/cadastro" component={SignUp}/>
            <Route exact isPrivate={true} path="/dashboard" component={Dashboard}/>
        </Switch>
    );
}