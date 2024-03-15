import { useState } from 'react'
import './App.css'
import { I18nextProvider } from 'react-i18next'
import i18n from "./i18n"
import SceneHolder from './SceneHolder'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SceneHolder/>
    </I18nextProvider>
  )
}

export default App
