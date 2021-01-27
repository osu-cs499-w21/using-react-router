import React from 'react';
import {
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import './App.css';

const menu = {
  tacos: "https://media.giphy.com/media/KfxPgR9Xb6lRvlFa8x/giphy.gif",
  pizza: "https://media.giphy.com/media/VCDSo9xqCJOjC/giphy.gif",
  sushi: "https://media1.tenor.com/images/a7087e13ce68524779c9b6946818986b/tenor.gif"
};

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function People() {
  return <h1>People</h1>;
}

function Menu() {
  const match = useRouteMatch();
  console.log("== match:", match);
  const { url, path } = match;
  return (
    <>
      <h1>Menu</h1>
      <ul>
        <li><Link to={`${url}/pizza`}>Pizza</Link></li>
        <li><Link to={`${url}/tacos`}>Tacos</Link></li>
        <li><Link to={`${url}/sushi`}>Sushi</Link></li>
      </ul>
      <Switch>
        <Route path={`${path}/:menuItem`}>
          <MenuItem />
        </Route>
        <Route exact path={path}>
          <h2>Please select a menu item above</h2>
        </Route>
      </Switch>
    </>
  );
}

function MenuItem() {
  const { menuItem } = useParams();
  const { url, path } = useRouteMatch();
  // console.log("== params:", params);
  return (
    <div>
      <h2>Menu item: {menuItem}</h2>
      <img src={menu[menuItem]} alt={menuItem} />
      <p>Matched part of the URL: {url}</p>
      <p>Matched part of the route path: {path}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/people">People</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
      </ul>
      <Switch>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
      <Link to="/">Navigate to home page</Link>
    </>
  );
}

export default App;
