import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppMenu from './components/AppMenu';
import Home from './views/Home';
import Settings from './views/Settings';
import Change from './views/Change';
import About from './views/About';

type Routers = (string | (() => JSX.Element))[][];
export type MenuProps = {
  routers: Routers
};
const routes: Routers = [
  ["home", Home],
  ["settings", Settings],
  ["change", Change],
  ["about", About],
];
function App() {
  return (
    <Router>
      <div className="App">
        <AppMenu routers={routes} />
        <div id="pageContainer" className="page-container">
          <Switch>
            {routes.map(([label, Component]) => (
              <Route
                key={label as string}
                path={`/${label}`}
              >
                <Component />
              </Route>
            ))}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="*"><h1>Page not found.</h1></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
