import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useThree } from '@react-three/fiber';
import WavingMascot from '../../WavingMascot'
import Section from '../../Section/section'

export function AboutScene() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768
  })

const { viewport } = useThree();

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
    const minW = 360
    const maxW = 1440
    const [minS, maxS] = isMobile ? [0.5, 1.0] : [0.8, 1.6]
    let t = (width - minW) / (maxW - minW)
    t = Math.min(1, Math.max(0, t))
    return minS + (maxS - minS) * t
  }

  const scalingFactor = calculateScale(dimensions.width, dimensions.isMobile)

  return (
    <>
      <WavingMascot
        scale={dimensions.isMobile ? scalingFactor * 1.2 : scalingFactor * 0.8}
        position={dimensions.isMobile ? [0, 0.8, 0] : [-viewport.width / 6, 0, 0]}
      />
    </>
  )
}

export default function About() {
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

  return (
   <div className="relative w-full h-screen">
      {dimensions.isMobile ? (
        <Section>
          <div className="absolute inset-0 w-full h-full max-h-70 top-1/2 flex flex-col items-start justify-start gap-0 p-8 font-golos font-semibold select-none">
            <h1 className="text-purple-subtitle-dark text-4xl xl:text-6xl">
              {t('intro.title').toLowerCase()}
            </h1>

            <motion.h1
              className="text-purple-main text-3xl xl:text-5xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t('intro.subtitle').toLowerCase()}
            </motion.h1>

            <motion.div
              className="bg-yellow-200 w-full h-2 rounded-full my-3"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.div
              className="text-sea-white text-xs xl:text-lg font-light"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="leading-5">
                <Trans components={{ italics: <i />, bold: <b /> }}>
                  <p>{t('intro.description')}</p>
                </Trans>
                <p className="mt-4">{t('intro.description2')}</p>
              </div>
            </motion.div>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="absolute inset-0 w-6/12 h-full max-w-xl max-h-max flex flex-col items-start justify-center gap-0 left-1/2 top-1/4 px-8 font-golos font-semibold select-none">
            <h1 className="text-purple-subtitle-dark text-5xl xl:text-6xl">
              {t('intro.title').toLowerCase()}
            </h1>

            <motion.h1
              className="text-purple-main text-4xl xl:text-5xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t('intro.subtitle').toLowerCase()}
            </motion.h1>

            <motion.div
              className="bg-yellow-200 w-full h-2 rounded-full my-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.div
              className="text-sea-white text-sm xl:text-lg font-light"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="leading-6">
                <Trans components={{ italics: <i />, bold: <b /> }}>
                  <p>{t('intro.description')}</p>
                </Trans>
                <p className="mt-4">{t('intro.description2')}</p>
              </div>
            </motion.div>
          </div>
        </Section>
      )}
    </div>
  )
}
