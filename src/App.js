import { Switch, HashRouter, Route } from "react-router-dom";
import WelcomePage from './pages/WelcomePage';
import Inventory from "./pages/Inventory";
import Laboratory from "./pages/Laboratory";
import Schedule from "./pages/Schedule";
import License from "./pages/License";
import User from './pages/User';
import ListInventory from "./pages/ListInventory";
import ListLaboratory from "./pages/ListLaboratory";
import ListSchedule from "./pages/ListSchedule";
import ListLicenses from "./pages/ListLicenses";
import ListUsers from './pages/ListUsers';
import Login from "./pages/Login";


function App() {
  const isLogged = () => {
    return localStorage.getItem("ap-username") !== null;
  };

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} default/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/inventoryItem" component={Inventory} />
        <Route exact path="/inventoryItem/:id" component={Inventory} />
        <Route exact path="/inventory/list" component={ListInventory} />
        <Route exact path="/laboratories" component={Laboratory} />
        <Route exact path="/laboratories/:id" component={Laboratory} />
        <Route exact path="/laboratory/list" component={ListLaboratory} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/schedule/:id" component={Schedule} />
        <Route exact path="/schedules/list" component={ListSchedule} />
        <Route exact path="/licenses" component={License} />
        <Route exact path="/licenses/:id" component={License} />
        <Route exact path="/license/list" component={ListLicenses} />
        <Route exact path="/user" component={User} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/users/list" component={ListUsers} />
      </Switch>
    </HashRouter>
  );
}

export default App;
