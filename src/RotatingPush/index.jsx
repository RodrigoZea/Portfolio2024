import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

export default function RotatingPush({ offset, xPos = 0, yPos = 0, children, rotating=false }) {
  const [MIN_X, MAX_X, MIN_Y, MAX_Y] = [xPos-offset, xPos+offset, yPos-offset, yPos+offset]

  const groupMesh = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const { camera } = useThree();

  const [springProps, api] = useSpring(() => ({
    position: [xPos, yPos, 0],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 300, friction: 30, precision: 0.0001 }
  }));

  useFrame(({ mouse }) => {
    if (!groupMesh.current) return;

    if (rotating) groupMesh.current.rotation.y -= 0.005;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(groupMesh.current, true);

    if (intersects.length > 0) {
      const newX = mouse.x * (MAX_X - MIN_X) + MIN_X;
      const newY = mouse.y * (MAX_Y - MIN_Y) + MAX_Y;

      api.start({
        position: [newX, newY, groupMesh.current.position.z]
      });
    }
  });

  return (
    <animated.group ref={groupMesh} {...springProps} rotation={rotation}>
      {children}
    </animated.group>
  );
}
