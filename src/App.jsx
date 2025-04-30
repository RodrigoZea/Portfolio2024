import './App.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Home, { HomeScene } from './routes/Home/home'
import About, { AboutScene } from './routes/About/about'
import Interests, { InterestsScene } from './routes/Interests/interests'
import ProjectsSection, { ProjectsScene } from './routes/PreviousWorks/works'
import Contact, { ContactScene } from './routes/Contact/contact'
import BubbleBackground from './BubbleBackground'

function ContainerWithBG() {
  const { pathname } = useLocation()
  const bgColor = pathname === '/' ? '#c4e1f5' : '#101457'
  return (
    <div
      id="container"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: bgColor
      }}
    >
      <BubbleBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<><Header /><About /></>} />
        <Route path="/interests" element={<><Header /><Interests /></>} />
        <Route path="/works" element={<><Header /><ProjectsSection /></>} />
        <Route path="/contact" element={<><Header /><Contact /></>} />
      </Routes>
    </div>
  )
}

function PersistentCanvas() {
  const { pathname } = useLocation()
  let Scene = null
  switch (pathname) {
    case '/': Scene = HomeScene; break
    case '/about': Scene = AboutScene; break
    case '/interests': Scene = InterestsScene; break
    case '/works': Scene = ProjectsScene; break
    case '/contact': Scene = ContactScene; break
    default: Scene = null
  }
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Suspense fallback={<>Loading...</>}>
        {Scene && <Scene />}
      </Suspense>
    </Canvas>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ContainerWithBG />
        <PersistentCanvas />
      </Router>
    </I18nextProvider>
  )
}

export default App
