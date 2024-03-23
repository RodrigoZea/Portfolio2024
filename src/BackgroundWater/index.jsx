import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color} from "three";
import { degToRad } from "three/src/math/MathUtils";

const fragmentShader = ` 
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform float u_time;
    varying float vZ;
    varying float vLocalY;

    void main() {
        vec3 color = mix(u_colorA, u_colorB, (vLocalY)); 

        gl_FragColor = vec4(color, 1.0);
    }
`

const vertexShader = ` 
    // we are receiving a uniform from our component
    uniform float u_time;
    uniform float u_ampA;
    uniform float u_ampB;
    // we use a varying to send info between vertex and fragment shaders
    varying float vZ;
    varying float vLocalY;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        modelPosition.x *= 5.0;

        modelPosition.y += sin(modelPosition.x * u_ampA + u_time * 2.0) * 0.07;
        modelPosition.y += sin(modelPosition.z * u_ampB + u_time * 3.0) * 0.07;

        vZ = modelPosition.y;
        vLocalY = position.y; // Store the local Y position for color calculation

        // always required to set our changes
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
      
        gl_Position = projectedPosition;
    }
`;


export default function BackgroundWater(props) {
    const mesh = useRef();
    const { ampA, ampB } = props;

    const uniforms = useMemo(
        () => ({
          u_time: {
            value: 0.0,
          },
          u_colorA: { value: new Color("#8d77f2") },
          u_colorB: { value: new Color("#b486ff") },
          u_ampA: { value: ampA },
          u_ampB: { value: ampB }
        }), []
      );
    useFrame(({clock}) => 
        {
            mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        }
    )


    return(
        <group {...props}>
            <mesh ref={mesh} rotation={[degToRad(-70), 0, 0]} scale={1}>
                <boxGeometry args={[3, 2, 0.2, 50, 50, 1]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    wireframe={false}
                    
                />
            </mesh>
        </group>
    )
}