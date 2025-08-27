import React, { useRef, useMemo, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface Element {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    type: number;
}

interface ErrorPageProps {
  statusCode: number;
  title: string;
  message: string;
}

// Floating streaming icons component
const FloatingElements: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const elementsRef = useRef<(THREE.Group | null)[]>([]);

    const elements = useMemo<Element[]>(() => {
        return Array.from({ length: 15 }, () => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
            scale: Math.random() * 0.5 + 0.3,
            type: Math.floor(Math.random() * 3),
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) groupRef.current.rotation.y += 0.002;

        elementsRef.current.forEach((el, idx) => {
            if (!el) return;
            el.rotation.x += 0.01 * (idx % 2 === 0 ? 1 : -1);
            el.rotation.y += 0.008 * (idx % 3 === 0 ? 1 : -1);
            el.position.y += Math.sin(state.clock.elapsedTime + idx) * 0.002;
        });
    });

    return (
        <group ref={groupRef}>
            {elements.map((el, idx) => (
                <group
                    key={idx}
                    ref={(r) => (elementsRef.current[idx] = r)}
                    position={el.position}
                    rotation={el.rotation}
                    scale={el.scale}
                >
                    {el.type === 0 && <Box args={[1, 1, 1]}><meshStandardMaterial color="#8B5CF6" transparent opacity={0.6} /></Box>}
                    {el.type === 1 && <Sphere args={[0.5, 16, 16]}><meshStandardMaterial color="#EF4444" transparent opacity={0.7} /></Sphere>}
                    {el.type === 2 && <Torus args={[0.5, 0.2, 8, 16]}><meshStandardMaterial color="#10B981" transparent opacity={0.6} /></Torus>}
                </group>
            ))}
        </group>
    );
};

// Animated Status
const AnimatedStatus: React.FC<{ code: number }> = ({ code }) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      textRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={3}
      color="#EF4444"
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff"
      position={[0, 2, 0]}
    >
      {code}
      <meshStandardMaterial
        color="#EF4444"
        emissive="#EF4444"
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </Text>
  );
};

// Particle system
const StreamingParticles: React.FC = () => {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 100;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 30;
            pos[i + 1] = (Math.random() - 0.5) * 20;
            pos[i + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!particlesRef.current) return;
        const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount * 3; i += 3) {
            posArray[i] += Math.sin(state.clock.elapsedTime + i) * 0.01;
            posArray[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.008;

            if (posArray[i] > 15) posArray[i] = -15;
            if (posArray[i] < -15) posArray[i] = 15;
            if (posArray[i + 1] > 10) posArray[i + 1] = -10;
            if (posArray[i + 1] < -10) posArray[i + 1] = 10;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} args={[]} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#8B5CF6" transparent opacity={0.8} />
        </points>
    );
};

// Main 3D Scene
const Scene3D: React.FC<{ statusCode: number }> = ({ statusCode }) => {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ background: 'transparent', height: '100vh', width: '100vw' }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EF4444" />
            <spotLight position={[0, 10, 0]} intensity={0.8} color="#10B981" />

            <AnimatedStatus code={statusCode} />
            <FloatingElements />
            <StreamingParticles />

            <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        </Canvas>
    );
};

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, title, message }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogout = () => {
    router.post(route("logout"), {}, { onSuccess: () => router.visit(route("login")) });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${
            50 + mousePosition.y * 20
          }%, #8B5CF6 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 z-10">
        <Scene3D statusCode={statusCode} />
      </div>

      <div className="relative z-20 text-center px-4 mt-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
          {title}
          <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-[glitch1_2s_infinite]">{title}</span>
          <span className="absolute top-0 left-0 text-purple-500 opacity-70 animate-[glitch2_2s_infinite]">{title}</span>
        </h2>

        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 max-w-lg mx-auto mb-8">
          <p className="text-gray-300 mb-4 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            Back to Login
          </button>
          <Link
            href={route("home")}
            className="px-8 py-3 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg font-semibold transition-all duration-300"
          >
            Home
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center text-xs text-gray-500">
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
          <span>Error Code: {statusCode}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
