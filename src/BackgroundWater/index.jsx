import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color } from 'three'
import { degToRad } from 'three/src/math/MathUtils'

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vLocalY;

void main() {
  vec3 color = mix(u_colorA, u_colorB, vLocalY);
  gl_FragColor = vec4(color, 1.0);
}
`

const vertexShader = `
uniform float u_time;
uniform float u_freqA;
uniform float u_freqB;
uniform float u_waveH;
uniform float u_speedA;
uniform float u_speedB;
varying float vLocalY;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.x *= 5.0;
  modelPosition.y += sin(modelPosition.x * u_freqA + u_time * u_speedA) * u_waveH;
  modelPosition.y += sin(modelPosition.z * u_freqB + u_time * u_speedB) * u_waveH;
  vLocalY = position.y;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`

export default function BackgroundWater({
  freqA = 3,
  freqB = 4,
  waveHeight = 0.07,
  speedA = 2.0,
  speedB = 3.0,
  ...props
}) {
  const mesh = useRef()
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_colorA: { value: new Color('#8d77f2') },
      u_colorB: { value: new Color('#b486ff') },
      u_freqA: { value: freqA },
      u_freqB: { value: freqB },
      u_waveH: { value: waveHeight },
      u_speedA: { value: speedA },
      u_speedB: { value: speedB }
    }),
    []
  )

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
  })

  return (
    <group {...props}>
      <mesh ref={mesh} rotation={[degToRad(-70), 0, 0]} scale={1}>
        <boxGeometry args={[3, 2, 0.5, 50, 50, 1]} />
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
