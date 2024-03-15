import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Loader } from "@react-three/drei";
import { Suspense } from "react";
import Content from "../Content";

export default function SceneHolder() {
    return(
        <>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]}/>
                <PerspectiveCamera 
                    makeDefault 
                    position={[0, 0, 2]}
                />
                <Suspense>
                    <Content/>
                </Suspense>
            </Canvas>
            <Loader/>
        </>
    );
}
