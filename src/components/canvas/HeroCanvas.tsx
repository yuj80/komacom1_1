import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FluidMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Gentle rotation
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.sin(time / 2);
    });

    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[0, 0, -2]} scale={3.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#be123c"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.1}
                    roughness={0.1}
                    distort={0.4} // Strength of distortion
                    speed={2} // Speed of distortion
                />
            </mesh>
        </Float>
    );
};

const HeroText = () => {
    // Use local font for reliability and to avoid CORS issues
    const fontUrl = '/fonts/Pretendard-Black.otf';

    return (
        <group position={[0, 0, 3]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    font={fontUrl}
                    fontSize={0.6}
                    letterSpacing={-0.05}
                    lineHeight={1.2}
                    position={[0, 0.4, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    우리는 광고의
                    <meshBasicMaterial color="#4c0519" toneMapped={false} transparent opacity={0.65} />
                </Text>
                <Text
                    font={fontUrl}
                    fontSize={0.6}
                    letterSpacing={-0.05}
                    lineHeight={1.2}
                    position={[0, -0.4, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    흐름을 디자인합니다
                    <meshBasicMaterial color="#4c0519" toneMapped={false} transparent opacity={0.65} />
                </Text>
            </Float>
        </group>
    );
};

const HeroCanvas = () => {
    return (
        <div className="w-full h-screen absolute top-0 left-0 z-0 bg-gradient-to-br from-rose-50 via-white to-white">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={1.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#f43f5e" />

                <Suspense fallback={null}>
                    <HeroText />
                    <FluidMesh />
                    {/* Lighter environment for light background */}
                    <Environment preset="warehouse" environmentIntensity={1} />
                </Suspense>
            </Canvas>

            {/* Light gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default HeroCanvas;
