import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorInside = new THREE.Color('#ff6030');
    const colorOutside = new THREE.Color('#1b3984');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * 5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 5);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Continuous rotation
    pointsRef.current.rotation.y += delta * 0.05;
    
    // Mouse interaction
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouse.x * 0.2, 0.1);

    // Twinkle effect
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions.positions} colors={positions.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Nebulae() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Nebula */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4338ca"
            distort={0.6}
            speed={2}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>

      {/* Outer Nebula 1 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[2, 32, 32]} position={[2, 1, -2]}>
          <MeshDistortMaterial
            color="#3b82f6"
            distort={0.4}
            speed={1.5}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>

      {/* Outer Nebula 2 */}
      <Float speed={1} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[1.8, 32, 32]} position={[-2, -1, 1]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.5}
            speed={1}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff6030" />
        <Galaxy />
        <Nebulae />
      </Canvas>
      {/* Vignette and overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/30 to-[#020617] pointer-events-none" />
    </div>
  );
}

export default Background3D;

