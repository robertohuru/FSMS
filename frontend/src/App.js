import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";
import ConfigComponent from "./components/ConfigComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route path="/dash" component={DashboardComponent} />
          <Route path="/settings" component={ConfigComponent} />
          <Route path="/services" component={ConfigComponent} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
