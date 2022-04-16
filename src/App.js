import logo from './logo.svg';
import './App.css';
import Home_Page from './Components/Home_Page'
import Signup from './Components/Signup'
import Student_Signup from './Components/Student_Signup'
import Login from './Components/Login'
import Student_Login from './Components/Student_Login'
import Dashboard from './Components/Dashboard'
import Student_Dashboard from './Components/Student_Dashboard'
import Proctor from './Components/Proctor'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={Home_Page} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/student-login' component={Student_Login} />
            <Route exact path='/sign-up' component={Signup} />
            <Route exact path='/student-sign-up' component={Student_Signup} />
            <Route exact path='/Proctor/:key' component={Proctor} />
            <PrivateRoute exact path='/student-dashboard' component={Student_Dashboard} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
