import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { motion } from 'framer-motion-3d';
import { animate, useMotionValue } from 'framer-motion';
import { Image, Text, RoundedBox } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import Section from '../../Section/section';

export const currentProjectAtom = atom(null);

const projects = [
  {
    title: 'CSS Narancia',
    url: 'https://codepen.io/rodrigozea/pen/bXwJeq',
    image: '/projects/narancia.jpg',
    description: 'projects.narancia',
  },
  {
    title: 'GoLit',
    url: 'https://rodrigozea.itch.io/bullet-brawl',
    image: '/projects/bulletbrawl.jpg',
    description: 'projects.golit',
  },
  {
    title: 'Deep Rooted Issues',
    url: 'https://rodrigozea.itch.io/deep-rooted-issues',
    image: '/projects/dri.jpg',
    description: 'projects.dri',
  },
  {
    title: 'Bullet Brawl',
    url: 'https://rodrigozea.itch.io/bullet-brawl',
    image: '/projects/bulletbrawl.jpg',
    description: 'projects.bb',
  },
  {
    title: 'Pipe Dreams',
    url: 'https://rodrigozea.itch.io/pipe-dreams',
    image: '/projects/bulletbrawl.jpg',
    description: 'projects.pdreams',
  },
  {
    title: 'Marbles',
    url: 'https://globalgamejam.org/games/2024/marbling-rambling-1',
    image: '/projects/bulletbrawl.jpg',
    description: 'projects.marbles',
  },
];

const fontUrl =
  'https://fonts.gstatic.com/s/golostext/v4/q5uXsoe9Lv5t7Meb31EcOR9UdVTNs822plVjRQ5cEr8zXcyx.ttf';

function Project({ project, highlighted, scale }) {
  const background = useRef();
  const groupRef = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(({ clock }) => {
    background.current.material.opacity = bgOpacity.get();
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.02;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position-z={-0.06} ref={background}>
        <RoundedBox args={[2.2, 1.9, 0.1]} bevelSegments={0}>
          <meshBasicMaterial color="#5622e2" transparent opacity={0.6} />
        </RoundedBox>
      </mesh>
      <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.2} />
      <Text
        maxWidth={2}
        anchorX="center"
        anchorY="middle"
        fontSize={0.2}
        position={[0, -0.65, 0]}
        font={fontUrl}
      >
        {project.title.toLowerCase()}
      </Text>
    </group>
  );
}

export function ProjectsScene() {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [dims, setDims] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768,
  });

  useEffect(() => {
    const onResize = () => setDims({ width: window.innerWidth, isMobile: window.innerWidth < 768 });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const interpolate = (width, [min, max]) => {
    const wMin = 360,
      wMax = 1440;
    let t = (width - wMin) / (wMax - wMin);
    t = Math.max(0, Math.min(1, t));
    return min + (max - min) * t;
  };

  const scaleFactor = interpolate(dims.width, dims.isMobile ? [0.5, 1.0] : [0.8, 1.6]);
  const spacingFactor = interpolate(dims.width, dims.isMobile ? [1.2, 1.8] : [0.8, 1.2]);
  const columns = dims.isMobile ? 2 : 3;
  const rows = Math.ceil(projects.length / columns);

  return (
    <>
      <group position={dims.isMobile ? [0, 0, 0] : [1, 0, 0]}>
        {projects.map((project, idx) => {
          const col = idx % columns;
          const row = Math.floor(idx / columns);
          const x = (col - (columns - 1) / 2) * spacingFactor;
          const y = ((rows - 1) / 2 - row) * spacingFactor;
          return (
            <motion.group key={idx} position={[x, y, 0]} onClick={() => setCurrentProject(idx)}>
              <Project
                project={project}
                highlighted={idx === currentProject}
                scale={dims.isMobile ? scaleFactor * 0.9 : scaleFactor * 0.31}
              />
            </motion.group>
          );
        })}
      </group>
    </>
  );
}

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const [dims, setDims] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768,
  });

  useEffect(() => {
    const onResize = () => setDims({ width: window.innerWidth, isMobile: window.innerWidth < 768 });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!dims.isMobile && currentProject === null) {
      setCurrentProject(0);
    }
  }, [dims.isMobile, currentProject, setCurrentProject]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [dims.width]);

  const columns = dims.isMobile ? 2 : 3;
  const rows = Math.ceil(projects.length / columns);
  const selected = currentProject !== null ? projects[currentProject] : null;
  const overlayActive = selected !== null;

  return (
    <Section>
      {overlayActive && dims.isMobile && (
        <div className="md:hidden fixed inset-0 z-50 bg-purple-light overflow-auto">
          <div className="p-4 w-full h-full flex flex-col">
            <div className="flex justify-end">
              <button
                className="text-2xl text-purple-main hover:text-purple-dark"
                onClick={() => setCurrentProject(null)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold text-purple-main mb-2">{selected.title}</h2>
              <p className="text-sea-white mb-4 text-sm">{t(selected.description)}</p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
              >
                {t('projects.visit')}
              </a>
            </div>
          </div>
        </div>
      )}
      <div
        className={`
          w-full flex-1 flex-col md:flex-row pt-16
          ${overlayActive && dims.isMobile ? 'hidden' : 'flex'}
          ${overlayActive && !dims.isMobile ? 'md:ml-[33.3333%]' : ''}
        `}
      >
        <div className="hidden md:block fixed inset-y-0 left-0 w-1/3 p-8 pt-40 bg-purple-light overflow-auto z-10">
          {overlayActive && (
            <>
              <img src={selected.image} alt={selected.title} className="w-full rounded-md mb-4" />
              <h2 className="text-3xl font-bold text-purple-main mb-2">{selected.title}</h2>
              <p className="text-sea-white text-sm">{t(selected.description)}</p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-300 transition text-3xl"
              >
                {t('projects.visit')}
              </a>
            </>
          )}
        </div>
        <div className="w-full md:w-2/3 xl:w-2/3 h-full flex justify-center"></div>
      </div>
    </Section>
  );
}
