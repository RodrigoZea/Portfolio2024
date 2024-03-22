import { ScrollControls, Scroll } from "@react-three/drei";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { useTranslation } from "react-i18next";
import Interface from "../Interface";
import MascotLookAt from "../MascotLookAt";
import BackgroundWater from "../BackgroundWater";
import WavingMascot from "../WavingMascot";
import RotatingPush from "../RotatingPush";
import BubbleContainer from "../BubbleContainer";
import PreviousWorks from "../PreviousWorks";
import CharacterContact from "../CharacterContact";

export default function Content(){
    const { t } = useTranslation();
    const scalingFactor = Math.min(Math.max(window.innerWidth / 1300, 0.3), 0.6);
    const isMobile = window.innerWidth < 768;
    const { viewport } = useThree()

    return(
        <ScrollControls
            damping={0.2}
            pages={7}
            style={{ left: '20px' }}
        >
            <Scroll>
                <group>
                    <mesh position={[0, -8.01, -0.5]} rotation={[0, 0, 0]} scale={1}>
                        <planeGeometry args={[10, 15, 1, 1]} />
                        <meshStandardMaterial color={new Color("#101457")}>
                        </meshStandardMaterial>
                    </mesh>

                    {/* Everything related to start screen */}
                    <group scale={isMobile ? scalingFactor*0.8: scalingFactor}>
                        <MascotLookAt 
                            position={
                                isMobile ? [-1, 1, 0]
                                : [-1.8, 1, 0]
                            } 
                            y={isMobile ? -1.8:-1.5} 
                        />
                    </group>

                    <group>
                        <BackgroundWater
                            position={
                                isMobile ? [0, -0.61, 0]
                                : [0, -0.6, 0]
                            }
                        />
                    </group>

                    {/* About me */}
                    <group>
                        <WavingMascot 
                            scale={isMobile ? scalingFactor*0.8 : scalingFactor}
                            position={
                                isMobile ? [0, -viewport.height*1.25, 0]
                                : [-viewport.width*0.2, -viewport.height*1, 0]
                            }
                        />
                    </group>

                    {/* Interests */}
                    <group
                        scale={
                            isMobile ? scalingFactor*0.8
                            : scalingFactor*1.5
                        }
                        position={
                            isMobile ? [0, -viewport.height*2+0.55, 0]
                            : [0, -viewport.height*2, 0]
                        }
                    >
                        <group                                    
                            position={
                                isMobile 
                                ? [0, 0, 0]
                                : [-1, 0, 0]
                            }
                        >
                            <RotatingPush offset={0.02} >
                                <BubbleContainer  text="ux" desc={t('interests.one')}/>
                            </RotatingPush>
                        </group>

                        <group 
                            position={
                                isMobile 
                                ? [0, -1.2, 0]
                                : [0, 0, 0]
                            }
                        >
                            <RotatingPush offset={0.02}>
                                <BubbleContainer text="gd" desc={t('interests.two')} vertical={isMobile}/>
                            </RotatingPush>
                        </group>

                        <group 
                            position={
                                isMobile 
                                ? [0, -2.4, 0]
                                : [1, 0, 0]
                            }
                        >
                            <RotatingPush offset={0.02} >
                                <BubbleContainer text="wd" desc={t('interests.three')}/>
                            </RotatingPush>
                        </group>
                    </group>

                    {/* Previous works */}
                    <group 
                        scale={
                            scalingFactor*2
                        }
                        position={
                            isMobile ? [0, -viewport.height*4, 0]
                            : [0, -viewport.height*4, 0]
                        }
                    >
                        <PreviousWorks />
                    </group>

                    <group
                        scale={
                            isMobile 
                            ? scalingFactor*0.7
                            : scalingFactor}
                        position={
                            isMobile ? [0, -10, -0.3]
                            : [0, -viewport.height*5.3, -0.8]
                        }  
                    >      
                        <CharacterContact />                
                    </group>

                </group>
            </Scroll>
            <Scroll html>
                <Interface />
            </Scroll>
        </ScrollControls>
    )
}