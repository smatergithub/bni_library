import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
import Dashboard from './dashboard'
import CreateNewBook from './createNewBook'
import Books from './books'
import Ebooks from './ebooks'
const routes = [
  {
    path: "/admin/dashboard",
    exact: true,
    main: (props) => <Dashboard {...props} />
  },
  {
    path: "/admin/books",
    exact: false,
    main: () => <Books />
  },
  {
    path: "/admin/ebooks",
    exact: false,
    main: () => <Ebooks />
  },
  {
    path: "/admin/analytics",
    exact: false,
    main: () => <Dashboard />
  },
  {
    path: "/admin/add-new-book",
    exact: false,
    main: (props) => <CreateNewBook {...props} />
  }
];


function HomeAdmin(props) {

  function createNewBook() {

    let { history } = props
    history.push('/admin/add-new-book')
  }
  return (

    <div class="bg-gray-100 font-family-karla flex" >
      <div style={{
        zIndex: '10000'
      }}>
        <Sidebar url={props.match.params.id} createNewBook={createNewBook} />
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
              children={<route.main {...props} />}
            />
          ))}
        </Switch>
      </div>

    </div>

  )
}
export default HomeAdmin
