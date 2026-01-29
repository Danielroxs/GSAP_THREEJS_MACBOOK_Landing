import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();
  const controlRef = useRef();

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);

  return (
    <>
      <OrbitControls
        ref={controlRef}
        key={isMobile ? "mobile" : "desktop"}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      <group ref={largeMacbookRef}>
        <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
      </group>

      <group ref={smallMacbookRef}>
        <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
      </group>
    </>
  );
};

export default ModelSwitcher;
