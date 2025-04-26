// src/components/ProjectsSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { atom, useAtom } from "jotai";
import Section from "../../Section/section";
import { Canvas, useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { Suspense } from "react";
import {
  PerspectiveCamera,
  RoundedBox,
  Image,
  Text
} from "@react-three/drei";
import { motion } from "framer-motion-3d";

export const currentProjectAtom = atom(null);
const fontUrl =
  "https://fonts.gstatic.com/s/golostext/v4/q5uXsoe9Lv5t7Meb31EcOR9UdVTNs822plVjRQ5cEr8zXcyx.ttf";

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
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.2}
      />
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

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  // Responsive dims
  const [dims, setDims] = useState({ width: window.innerWidth, isMobile: window.innerWidth < 768 });
  useEffect(() => {
    const onResize = () => setDims({ width: window.innerWidth, isMobile: window.innerWidth < 768 });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reset to first project on desktop
  useEffect(() => {
    if (!dims.isMobile && currentProject === null) {
      setCurrentProject(0);
    }
  }, [dims.isMobile]);

  // Scale and spacing interpolation
  const interpolate = (width, range) => {
    const [wMin, wMax] = [360, 1440];
    let t = (width - wMin) / (wMax - wMin);
    t = Math.max(0, Math.min(1, t));
    return range[0] + (range[1] - range[0]) * t;
  };
  const scaleFactor = interpolate(dims.width, dims.isMobile ? [0.5, 1.0] : [0.8, 1.6]);
  const spacingFactor = interpolate(dims.width, dims.isMobile ? [1.0, 1.8] : [0.8, 1.2]);

  const projects = [
    { title: "CSS Narancia", url: "https://codepen.io/rodrigozea/pen/bXwJeq", image: "/projects/narancia.jpg", description: t("projects.narancia") },
    { title: "GoLit", url: "https://rodrigozea.itch.io/bullet-brawl", image: "/projects/bulletbrawl.jpg", description: t("projects.golit") },
    { title: "Deep Rooted Issues", url: "https://rodrigozea.itch.io/deep-rooted-issues", image: "/projects/dri.jpg", description: t("projects.dri") },
    { title: "Bullet Brawl", url: "https://rodrigozea.itch.io/bullet-brawl", image: "/projects/bulletbrawl.jpg", description: t("projects.bb") },
    { title: "Pipe Dreams", url: "https://rodrigozea.itch.io/pipe-dreams", image: "/projects/bulletbrawl.jpg", description: t("projects.pdreams") },
    { title: "Marbles", url: "https://globalgamejam.org/games/2024/marbling-rambling-1", image: "/projects/bulletbrawl.jpg", description: t("projects.marbles") }
  ];
  
  const columns = dims.isMobile ? 2 : 3;
  const rows = Math.ceil(projects.length / columns);

  const selected = currentProject !== null ? projects[currentProject] : null;
  const overlayActive = selected !== null;
  //const overlayActive = false;

  return (
    <Section>
      {/* Mobile Overlay */}
      {overlayActive && dims.isMobile && (
        <div className="md:hidden fixed inset-0 z-50 bg-purple-light overflow-auto">
          <div className="p-4 bg-white bg-opacity-10 w-full h-full flex flex-col">
            <button className="self-end mb-4 text-2xl text-purple-main hover:text-purple-dark"
              onClick={() => setCurrentProject(null)}
            >
              ✕
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-purple-main mb-2">
              {selected.title}
            </h2>
            <p className="text-sea-white mb-4">
              {selected.description}
            </p>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
            >
              {t("projects.visit")}
            </a>
          </div>
        </div>
      )}

      {/* Grid + Detail */}
      <div className={`${overlayActive && dims.isMobile ? "hidden" : "flex"} flex-col w-full md:flex-row h-full pt-16`}>
        {/* Detail Panel (desktop) */}
        <div className="hidden md:block w-full md:w-1/3 xl:w-1/3 p-8 bg-white bg-opacity-10 rounded-lg overflow-auto">
          {overlayActive && (
            <>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full rounded-md mb-4"
              />
              <h2 className="text-3xl font-bold text-purple-main mb-2">
                {selected.title}
              </h2>
              <p className="text-sea-white mb-4">
                {selected.description}
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
              >
                {t("projects.visit")}
              </a>
            </>
          )}
        </div>

        {/* 3D Grid */}
        <div className="w-full md:w-2/3 xl:w-2/3 flex-1 flex justify-center">
          <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Suspense fallback={null}>
              <group position={[0, 0, 0]}>
                {projects.map((project, idx) => {
                  const col = idx % columns;
                  const row = Math.floor(idx / columns);
                  const x = (col - (columns - 1) / 2) * spacingFactor;
                  const y = ((rows - 1) / 2 - row) * spacingFactor;
                  return (
                    <motion.group
                      key={idx}
                      position={[x, y, 0]}
                      onClick={() => setCurrentProject(idx)}
                    >
                      <Project
                        project={project}
                        highlighted={idx === currentProject}
                        scale={dims.isMobile ? scaleFactor * 0.8 : scaleFactor * 0.31}
                      />
                    </motion.group>
                  );
                })}
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </Section>
  );
}
