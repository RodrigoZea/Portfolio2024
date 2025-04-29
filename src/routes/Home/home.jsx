import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PerspectiveCamera } from '@react-three/drei'
import MascotLookAt from '../../MascotLookAt'
import BackgroundWater from '../../BackgroundWater'

export function HomeScene() {
  const isMobile = window.innerWidth < 768
  const scale = window.innerWidth / 10
  const scalingFactor = Math.min(Math.max(scale, 0.35), 0.5)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={42} />
      <group>
        <group scale={isMobile ? scalingFactor * 0.8 : scalingFactor}>
          <MascotLookAt
            position={isMobile ? [-1, 1, 0] : [-1.8, 1, 0]}
            y={isMobile ? -1.8 : -1.5}
          />
        </group>
        <group scale={isMobile ? scalingFactor * 0.8 : scalingFactor * 1.7}>
          <BackgroundWater
            position={isMobile ? [0, -1, 0] : [0, -0.6, 0]}
            ampA={isMobile ? 1.0 : 3.0}
            ampB={isMobile ? 1.0 : 4.0}
          />
        </group>
      </group>
    </>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onClick={() => navigate('/about')}
          className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-purple-main text-purple-main text-2xl bg-transparent transition-colors hover:bg-purple-main hover:text-white"
        >
          {t('enter')}
        </button>
      </div>
    </div>
  )
}
