import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
import Dashboard from './dashboard'
const routes = [
  {
    path: "/admin/dashboard",
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: "/admin/add-book",
    exact: false,
    main: () => <Dashboard />
  },
  {
    path: "/admin/analytics",
    exact: false,
    main: () => () => <Dashboard />
  }
];
function HomeAdmin(props) {

  return (
    <Router>
      <div class="bg-gray-100 font-family-karla flex" >
        <div style={{
          zIndex: '10000'
        }}>
          <Sidebar url={props.match.params.id} />
        </div>
        <div class="w-full flex flex-col h-screen overflow-y-hidden">
          {/* <Header /> */}
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>

      </div>
    </Router>
  )
}
export default HomeAdmin
