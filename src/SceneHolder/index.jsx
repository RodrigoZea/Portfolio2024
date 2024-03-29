import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Loader } from "@react-three/drei";
import { Suspense } from "react";
import Content from "../Content";

export default function SceneHolder() {
    return(
        <>
            <div id="container" >
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <PerspectiveCamera 
                        makeDefault 
                        position={[0, 0, 2]}
                        fov={42}
                    />
                    <Suspense>
                        <Content/>
                    </Suspense>
                </Canvas>
                <Loader/>
            </div>
        </>
    );
}
