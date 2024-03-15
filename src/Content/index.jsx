import { ScrollControls, Scroll } from "@react-three/drei";
import { Color } from "three";
import { useTranslation } from "react-i18next";

export default function Content(){
    const { t } = useTranslation();

    return(
        <ScrollControls
            damping={0.2}
            pages={7}
            style={{ left: '20px' }}
        >
            <Scroll>
                <mesh position={[0, -8.4, -0.5]} rotation={[0, 0, 0]} scale={1}>
                    <planeGeometry args={[10, 15, 1, 1]} />
                    <meshStandardMaterial color={new Color("#101457")}>
                    </meshStandardMaterial>
                </mesh>
            </Scroll>
        </ScrollControls>
    )
}