import { useRef, useState } from "react";
import { motion } from 'framer-motion-3d';
import { useFrame } from "@react-three/fiber";
import CharacterFloating from "./CharacterFloating";
import { radToDeg } from 'three/src/math/MathUtils';

export default function MascotLookAt(props) {
    const { position, y: targetY, ...rest } = props;
    const meshRef = useRef();
    const [ startAnimation, setStartAnimation ] = useState(false)
    
    useFrame(({ clock }) => {
        if (meshRef.current) {
            if(startAnimation){
            meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2 + (targetY !== undefined ? targetY : -1.6);
            }  
        }
    })
      
    return (
        <motion.mesh
            {...rest}
            position={position}
            ref={meshRef}
             // Initial position
            animate={{ 
                y: targetY !== undefined ? targetY : -1.6,  // Target position
                transition: {
                    type: 'spring', // Use spring animation
                    mass: 3,
                    damping: 15,
                },
            }}
            onAnimationComplete={
                () => setStartAnimation(true)
            }
        >
            <CharacterFloating rotation={[0, radToDeg(10), 0]}  />
        </motion.mesh>
    );
}