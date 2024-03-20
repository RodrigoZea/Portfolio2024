import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Text } from "@react-three/drei";
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

// refactor to {props} and conditionally render the <Text> components depending if they're empty or not
// cleaner and would be easy to refactor for background purposes
// do the same refactoring w everything else
const fontUrl = 'https://fonts.gstatic.com/s/golostext/v4/q5uXsoe9Lv5t7Meb31EcOR9UdVTNs822plVjRQ5cEr8zXcyx.ttf';
export default function BubbleContainer({position=[0, 0, 0], text, desc, vertical=false}) {
    const mesh = useRef();

    const initialDistort = useMemo(() => {
      return Math.random() * 0.2 + 0.1;
    }, []);

    const uniforms = useMemo(
        () => ({
          u_time: {
            value: 0.0,
          },
          u_radius: {
            value: 0.4,
          },
          u_distort: {
            value: initialDistort,
          },
          diffuse: {
            value: new THREE.Color('black'),
          },
          fresnelColor: {
            value: new THREE.Color("#8d77f2"),
          }
        }), []
      );
      useFrame(({ clock, mouse }) => {
        mesh.current.rotation.z = clock.getElapsedTime();
        // Iterate through each bubble and calculate distance from mouse
        mesh.current.children.forEach(child => {
            const distance = child.position.distanceTo(mouse);
            // Apply rotation only to bubbles within a certain range
            if (distance < 2) {
                child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, mouse.x * Math.PI, 0.1);
                child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, mouse.y * Math.PI, 0.1);
            }
        });
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    });


    return(
        <group>
            <mesh ref={mesh} renderOrder={1} size={1} position={[position[0], position[1], position[2]]}>
                <icosahedronGeometry args={[1, 10]} />
                <shaderMaterial 
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    wireframe={false}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            <Text 
              color={"#9999CC"} 
              fontSize={0.2} 
              font={fontUrl} 
              anchorX="center" 
              anchorY="middle" 
              position={[position[0], position[1], position[2]+0.1]}
              maxWidth={50}
            >
                {text}
            </Text>
            <Text 
              color={"#6633CC"} 
              fontSize={0.1} 
              font={fontUrl} 
              anchorX="center" 
              anchorY="middle" 
              position={[position[0], position[1]-0.5, position[2]+0.1]}
              maxWidth={vertical ? 50 : 0.8}
              textAlign='center'
            >
                {desc}
            </Text>
        </group>
    )
}