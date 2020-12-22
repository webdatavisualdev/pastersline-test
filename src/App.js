import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Modal } from './pages/Modal';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/modal/:id" component={Modal}></Route>
      </Switch>
    </Router>
  );
}

export default App;
