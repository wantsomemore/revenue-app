import React from 'react'
import List from './components/List/List'
import Item from './components/Coin/Coin'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
    <Switch>
    <Route exact path='/' component={List} />
    <Route path='/item/:id' component={Item} />
    </Switch>
    </Router>
  )
}

export default App

