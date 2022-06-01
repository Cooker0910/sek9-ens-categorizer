import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import Views from './views'
import './index.css'
import { Route, Switch } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { THEME_CONFIG } from './configs/AppConfig'

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Router basename="/admin">
            <Switch>
              <Route path="/" component={Views} />
            </Switch>
          </Router>
      </Provider>
    </div>
  )
}

export default App
