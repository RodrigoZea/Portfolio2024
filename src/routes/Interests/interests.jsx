import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import RotatingPush from '../../RotatingPush'
import BubbleContainer from '../../BubbleContainer'

function calculateScale(width, isMobile) {
  const minW = isMobile ? 360 : 768
  const maxW = 1440
  const minS = isMobile ? 0.6 : 0.8
  const maxS = isMobile ? 1.2 : 1.6
  let t = (width - minW) / (maxW - minW)
  t = Math.max(0, Math.min(1, t))
  return minS + (maxS - minS) * t
}

function Bubbles({ scalingFactor, isMobile, t }) {
  return (
    <group
      scale={isMobile ? scalingFactor * 1.4 : scalingFactor * 1.5}
      position={isMobile ? [0, 1.2, 0] : [0, 0, 0]}
    >
      <group position={isMobile ? [0, 0, 0] : [-1, 0, 0]}>
        <RotatingPush offset={0.02}>
          <BubbleContainer text="ux" desc={t('interests.one')} />
        </RotatingPush>
      </group>
      <group position={isMobile ? [0, -1.2, 0] : [0, 0, 0]}>
        <RotatingPush offset={0.02}>
          <BubbleContainer text="gd" desc={t('interests.two')} vertical={isMobile} />
        </RotatingPush>
      </group>
      <group position={isMobile ? [0, -2.4, 0] : [1, 0, 0]}>
        <RotatingPush offset={0.02}>
          <BubbleContainer text="wd" desc={t('interests.three')} />
        </RotatingPush>
      </group>
    </group>
  )
}

export function InterestsScene() {
  const { t } = useTranslation()
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

  const scalingFactor = calculateScale(dimensions.width, dimensions.isMobile)

  return (
    <>
      <Bubbles
        scalingFactor={scalingFactor}
        isMobile={dimensions.isMobile}
        t={t}
      />
    </>
  )
}

export default function Interests() {
  return (
    <div className="relative w-full h-screen" />
  )
}
