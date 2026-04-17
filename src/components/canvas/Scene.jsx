import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Sphere, Box, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. THE CAMERA RIG (Handles Mouse Parallax)
// This component listens to the user's mouse position and smoothly moves the camera.
function CameraRig() {
  useFrame((state) => {
    // lerp (Linear Interpolation) makes the movement buttery smooth instead of snapping
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0); // Keep the camera pointing at the center
  });
  return null;
}

// 2. THE ABSTRACT GEOMETRIES
function BackgroundShapes() {
  return (
    <>
      {/* Liquid Neon Blue Blob - Placed to the left */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-6, 3, -12]}>
        <Sphere args={[2.5, 64, 64]}>
          <MeshDistortMaterial 
            color="#3b82f6" 
            attach="material" 
            distort={0.5} // How "liquid" it looks
            speed={2}     // How fast it morphs
            roughness={0.2} 
            metalness={0.8} 
          />
        </Sphere>
      </Float>

      {/* Liquid Purple Blob - Placed to the right */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[7, -4, -15]}>
        <Sphere args={[3, 64, 64]}>
          <MeshDistortMaterial 
            color="#8b5cf6" 
            attach="material" 
            distort={0.4} 
            speed={1.5} 
            roughness={0.1} 
            metalness={1} 
          />
        </Sphere>
      </Float>

      {/* Scattered Floating Wireframe Cubes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={i}
          speed={Math.random() * 2 + 0.5}
          rotationIntensity={Math.random() * 3}
          floatIntensity={Math.random() * 3}
          // Randomly position them in the background space
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15 - 10,
          ]}
        >
          <Box args={[0.6, 0.6, 0.6]}>
            <meshStandardMaterial 
              color="#ffffff" 
              wireframe 
              transparent 
              opacity={0.15} 
            />
          </Box>
        </Float>
      ))}
    </>
  );
}

// 3. THE MASTER SCENE
export default function Scene() {
  return (
    // We pull the camera back to z: 5 to give the scene plenty of depth
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      
      {/* Complex Lighting Setup for the Liquid Metal */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#3b82f6" />
      <pointLight position={[10, -10, -10]} intensity={5} color="#8b5cf6" />

      {/* Deep Space Stars */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={1} fade speed={1} />

      {/* Magical Glowing Dust */}
      <Sparkles count={300} scale={25} size={3} speed={0.4} opacity={0.3} color="#93c5fd" />

      {/* Inject our custom shapes */}
      <BackgroundShapes />

      {/* Inject the mouse movement tracker */}
      <CameraRig />
      
    </Canvas>
  );
}