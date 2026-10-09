"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Globe() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.08;
  });

  const nodes = [
    [-1.1, 1.2, 2.1],
    [-0.2, 1.65, 1.95],
    [0.9, 1.1, 2.15],
    [1.35, 0.1, 2.05],
    [0.55, -0.8, 2.2],
    [-0.65, -1.1, 2.0],
    [-1.55, -0.15, 1.8],
    [0.05, 0.25, 2.45],
  ];

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2.5, 32, 20]} />
        <meshBasicMaterial
          color="#08d9ff"
          wireframe
          transparent
          opacity={0.24}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.62, 32, 20]} />
        <meshBasicMaterial
          color="#006bff"
          transparent
          opacity={0.06}
        />
      </mesh>

      {nodes.map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial
            color={i === 3 ? "#ff4655" : "#52edff"}
          />
        </mesh>
      ))}

      {[0, Math.PI / 3, -Math.PI / 3].map((r, i) => (
        <mesh key={i} rotation={[r, 0.35, 0]}>
          <torusGeometry args={[2.85, 0.012, 8, 80]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.38}
          />
        </mesh>
      ))}

      <pointLight
        color="#00cfff"
        intensity={5}
        distance={8}
      />
    </group>
  );
}

export default function WaterWorld() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />

      <Globe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}