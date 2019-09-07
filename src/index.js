import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import App from './components/App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
)
