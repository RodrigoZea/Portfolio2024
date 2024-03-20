import { useTranslation } from "react-i18next";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Image, Text, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { degToRad } from "three/src/math/MathUtils";

const fontUrl = 'https://fonts.gstatic.com/s/golostext/v4/q5uXsoe9Lv5t7Meb31EcOR9UdVTNs822plVjRQ5cEr8zXcyx.ttf';

const Project = (props) => {
    const { project, highlighted } = props;

    const background = useRef();
    const groupRef = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4)
        console.log(highlighted)
    }, [highlighted]);

    useFrame(({clock}) => {
        background.current.material.opacity = bgOpacity.get();
        groupRef.current.position.y = Math.sin(clock.getElapsedTime()*2) * 0.02
    });

    return (
        <group {...props} ref={groupRef}>
            <mesh
                position-z={-0.06}
                onClick={() => window.open(project.url, "_blank")}
                ref={background}
            >
                <RoundedBox args={[2.2, 2, 0.1]} bevelSegments={0} >
                    <meshBasicMaterial color="#5622e2" transparent opacity={0.6} />
                </RoundedBox>    
            </mesh>

            <Image 
                scale={[2, 1.2, 1]} 
                url={project.image} 
                toneMapped={false} 
                position-y={0.3} 
            />
            <Text
                maxWidth={2}
                anchorX={"left"}
                anchorY={"top"}
                fontSize={0.2}
                position={[-1, -0.3, 0]}
                font={fontUrl} 
            >
                {project.title.toLowerCase()}
            </Text>
            <Text
                maxWidth={2}
                anchorX={"left"}
                anchorY={"top"}
                fontSize={0.1}
                position={[-1, -0.5, 0]}
                font={fontUrl}
                color={"#a287ec"}
            >
                {project.description}
            </Text>
        </group>
    )
}

export const currentProjectAtom = atom(3);

export default function PreviousWorks() {
    const { t } = useTranslation();
    const [currentProject] = useAtom(currentProjectAtom);

    const projects = [
        {
            title: "Deep Rooted Issues",
            url: "https://rodrigozea.itch.io/deep-rooted-issues",
            image: "projects/dri.jpg",
            description: t('presentation.title1')
        },
        {
            title: "Bullet Brawl",
            url: "https://rodrigozea.itch.io/bullet-brawl",
            image: "projects/bulletbrawl.jpg",
            description: t('presentation.title1')
        },
        {
            title: "GuatNext",
            url: "https://rodrigozea.itch.io/bullet-brawl",
            image: "projects/bulletbrawl.jpg",
            description: t('presentation.title1')
        },
        {
            title: "CSS Narancia",
            url: "https://codepen.io/rodrigozea/pen/bXwJeq",
            image: "projects/narancia.jpg",
            description: t('presentation.title1')
        },
        {
            title: "BiteFilms",
            url: "https://rodrigozea.itch.io/bullet-brawl",
            image: "projects/bulletbrawl.jpg",
            description: t('presentation.title1')
        },
        {
            title: "Marbles",
            url: "https://globalgamejam.org/games/2024/marbling-rambling-1",
            image: "projects/bulletbrawl.jpg",
            description: t('presentation.title1')
        }
    ]

    return <group>
        {
            projects.map((project, index) =>(
                <motion.group key={"project_"+index} position={[index*1.2, 0, 0]} rotation={[degToRad(-10), 0, 0]}
                    animate={{
                        x: 0 + (index-currentProject) * 1,
                        y: currentProject === index ? 0 : -0.05
                    }}
                >
                    <Project project={project} highlighted={index===currentProject} scale={0.4}/>
                </motion.group>
            ))
        }
    </group>
}
