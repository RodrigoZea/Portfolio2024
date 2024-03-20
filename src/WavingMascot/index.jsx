import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import CharacterWaving from './CharacterWaving';

export default function WavingMascot(props) {
    const meshRef = useRef(null);
      
    return(
        <mesh ref={meshRef} {...props}>
            <CharacterWaving position={[0, -0.7, 0]} />
        </mesh>
    )
}