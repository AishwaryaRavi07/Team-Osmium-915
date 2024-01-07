import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
import Class from "./screens/Class";
import Resources from "./screens/Resources";
import ResourcePageOne from "./screens/resourcescomponent/ResourcePageOne";
import ResourcePageTwo from "./screens/resourcescomponent/ResourcePageTwo";
import ResourcePageThree from "./screens/resourcescomponent/ResourcePageThree";
import ResourcePageFour from "./screens/resourcescomponent/ResourcePageFour";
import ResourcePageFive from "./screens/resourcescomponent/ResourcePageFive";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/resources">
            <Resources/>
          </Route>
          <Route exact path="/resources/1">
            <ResourcePageOne/>
          </Route>
          <Route exact path="/resources/2">
            <ResourcePageTwo/>
          </Route>
          <Route exact path="/resources/3">
            <ResourcePageThree/>
          </Route>
          <Route exact path="/resources/4">
            <ResourcePageFour/>
          </Route>
          <Route exact path="/resources/5">
            <ResourcePageFive/>
          </Route>
          <Route exact path="/dashboard">
            <Navbar />
            <Dashboard />
          </Route>
          <Route exact path="/class/:id">
            <Navbar />
            <Class />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
