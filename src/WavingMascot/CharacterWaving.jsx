/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

export default function Model(props) {
  const group = useRef();
  const { scene, materials } = useGLTF("./models/mascotFromMixamo.glb");
  const copiedCharacter = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const {nodes} = useGraph(copiedCharacter);

  const { animations: wavingAnimation } = useFBX("./animations/Waving.fbx");

  wavingAnimation[0].name = "Waving";
  const { actions } = useAnimations(wavingAnimation, group)


  useEffect(() => {
    actions["Waving"].reset().play();
  }, [])



  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group 
          name="Armature" 
          rotation={[0, 0, 0]} 
          scale={0.5}
        >
          <skinnedMesh
            name="CharacterRetopo"
            geometry={nodes.CharacterRetopo.geometry}
            skeleton={nodes.CharacterRetopo.skeleton}
            material={materials["Material.004"]}          
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/mascotFromMixamo.glb");

