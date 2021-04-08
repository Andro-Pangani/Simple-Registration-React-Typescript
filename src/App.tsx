import './styles.css'
import React from 'react'
import { FormComponent } from './Components/FormComponent'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from './Components/Dashboard'
import { Wrapper } from './App.styled'

export const App: React.FC = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={FormComponent} />
          <Route path="/dashboard" exact={true}>
            <Dashboard />
          </Route>
          <Route path="/" render={() => <div>Nothing found 404</div>} />
        </Switch>
      </BrowserRouter>
    </Wrapper>
  )
}
