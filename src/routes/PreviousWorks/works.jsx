import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import CharacterContact from "./CharacterContact";

export default function Contact() {
    const { t } = useTranslation();
    const isMobile = window.innerWidth < 768;

    return (
        <div className="relative w-full h-screen">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <group
                        scale={isMobile ? 0.5 : 0.8}
                        position={[0, -1, 0]}
                    >
                        <CharacterContact />
                    </group>
                </Suspense>
            </Canvas>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center max-w-2xl bg-black bg-opacity-50 p-8 rounded-lg">
                    <h1 className="text-4xl font-bold text-yellow-200 mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-white text-lg mb-4">
                        {t('contact.description')}
                    </p>
                    <div className="flex justify-center gap-4">
                        <a 
                            href="https://www.linkedin.com/in/rodrigo-zea/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-200 hover:text-yellow-300 text-xl"
                        >
                            LinkedIn
                        </a>
                        <a 
                            href="https://github.com/RodrigoZea" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-200 hover:text-yellow-300 text-xl"
                        >
                            GitHub
                        </a>
                        <a 
                            href="mailto:zearodrigo37@gmail.com" 
                            className="text-yellow-200 hover:text-yellow-300 text-xl"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 