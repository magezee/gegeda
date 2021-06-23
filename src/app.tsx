import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Loading from 'src/components/loading'
import Header from 'src/components/header'
import routers from 'src/config/routers'

import './app.scss'

const App:React.FC<any> = () => {
  return (
    <Router>
      <div className="content">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {routers.map((route) => <Route key={route.id} path={route.path} component={route.compoment} exact={route.exact} />)}
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </Router>
  )
}

export default App