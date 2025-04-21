import { useState } from 'react'
import './App.css'
import { I18nextProvider } from 'react-i18next'
import i18n from "./i18n"
import Header from "./Header"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './routes/Home/home'
import About from './routes/About/about'
import Interests from './routes/Interests/interests'
import Contact from './routes/Contact/contact'

function ContainerWithBG() {
  const { pathname } = useLocation()
  const bgColor = pathname === '/' ? '#c4e1f5' : '#101457'

  return (
    <div
      id="container"
      style={{
        position: 'absolute',
        width:    '100%',
        height:   '100%',
        overflow: 'hidden',
        backgroundColor: bgColor,
      }}
    >
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/about"  element={<><Header /><About/></>} />
        <Route path="/interests" element={<><Header /><Interests/></>} />
        <Route path="/works" element={<><Header /><Interests/></>} />
        <Route path="/contact" element={<><Header /><Contact /></>} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ContainerWithBG />
      </Router>
    </I18nextProvider>
  )
}

export default App
