import { Canvas } from "@react-three/fiber";
import { Stars, Float, OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    // 1. The Canvas: The portal into our 3D world. 
    // We pull the camera slightly back on the Z-axis (position: [0, 0, 1])
    <Canvas camera={{ position: [0, 0, 1] }}>
      
      {/* 2. Lighting: A soft ambient light so the particles glow properly */}
      <ambientLight intensity={0.5} />

      {/* 3. The Object: We wrap our stars in a 'Float' component so they gently bob up and down */}
      <Float 
        speed={1} // Animation speed
        rotationIntensity={0.2} // Subtle rotation
        floatIntensity={0.5} // Up/down bobbing movement
      >
        {/* The Stars component generates thousands of performant particles instantly */}
        <Stars 
          radius={100}     // How far out the particles spread
          depth={50}       // The depth of the particle field
          count={7000}     // The number of particles (adjust for performance if needed)
          factor={4}       // The size of individual particles
          saturation={0.5} // Adds a slight color tint to the particles
          fade={true}      // Fades particles out at the edges so there are no hard lines
          speed={1.5}      // Internal twinkling speed
        />
      </Float>

      {/* 4. Camera Controls: 
          We disable user interaction so it acts purely as a background,
          but we turn on autoRotate to create a cinematic panning effect.
      */}
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false} 
      />
    </Canvas>
  );
}