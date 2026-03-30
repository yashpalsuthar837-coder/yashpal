import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(0);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    
    // Smooth intro scale
    if (scale < 1) {
      setScale(prev => Math.min(prev + 0.01, 1));
    }
    
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
      <group ref={groupRef}>
        <Sphere ref={meshRef} args={[1, 64, 64]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8 * scale}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <StarField />
        <AnimatedSphere />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
    </div>
  );
}

export default Background3D;
