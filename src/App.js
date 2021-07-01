import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Simple from './components/Simple'
import Complex from  './components/Complex'
import Home from './components/Home'
import Satellite from './components/Satellite'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/simple" exact>
            <Simple />
          </Route>

          <Route path="/complex" exact>
            <Complex />
          </Route>

          <Route path="/satellite" exact>
            <Satellite />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
