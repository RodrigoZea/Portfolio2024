import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PerspectiveCamera } from '@react-three/drei'
import MascotLookAt from '../../MascotLookAt'
import BackgroundWater from '../../BackgroundWater'

export function HomeScene() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768
  })

  useEffect(() => {
    const onResize = () =>
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768
      })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function calculateScale(width, isMobile) {
    const minW = isMobile ? 360 : 768
    const maxW = 1440
    const [minS, maxS] = isMobile ? [0.35, 0.6] : [0.35, 0.5]
    let t = (width - minW) / (maxW - minW)
    t = Math.min(1, Math.max(0, t))
    return minS + (maxS - minS) * t
  }

  const scalingFactor = calculateScale(dimensions.width, dimensions.isMobile)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={42} />
      <group>
        <group scale={dimensions.isMobile ? scalingFactor * 0.8 : scalingFactor}>
          <MascotLookAt
            position={dimensions.isMobile ? [-1, -0.5, 0.7] : [-1.8, 1, 0]}
            y={dimensions.isMobile ? -2 : -1.8}
          />
        </group>
        <group scale={dimensions.isMobile ? scalingFactor * 0.8 : scalingFactor * 1.7} rotation={[0, 0, 0]}>
          <BackgroundWater
            position={dimensions.isMobile ? [0, -1.6, 0.7] : [0, -1, 0]}
            freqA={dimensions.isMobile ? 6 : 3}
            freqB={dimensions.isMobile ? 6 : 4}
            waveHeight={dimensions.isMobile ? 0.02 : 0.07}
            speedA={dimensions.isMobile ? 3.0 : 2.0}
            speedB={dimensions.isMobile ? 3.0 : 3.0}
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
      <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-4">
        <div className='text-6xl font-golos font-semibold text-center text-purple-main'>
            {t('intro.title')}
        </div>
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
