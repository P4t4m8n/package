import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
// import { Route, Routes, HashRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { ItemIndex } from './pages/ItemIndex'
import { HomePage } from './pages/HomePage'
import { ItemDetails } from './pages/ItemDetails'
import { ItemEdit } from './pages/ItemEdit'
import './style/main.scss'
import { AppFooter } from './cmps/AppFooter'
import { About } from './pages/About'
import { AppHeader } from './Cmps/AppHeader'


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-container grid'>
          <AppHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/items' element={<ItemIndex />} />
            <Route path='/items/:itemId' element={<ItemDetails />} />
            <Route path="/items/edit" element={<ItemEdit />} />
            <Route path="/items/edit/:itemId" element={<ItemEdit />} />
          </Routes>
          <AppFooter />
        </section>
      </Router>
    </Provider >
  )


}
