import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Fix for missing type definitions in the current environment
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      instancedMesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      lineSegments: any;
      bufferGeometry: any;
      lineBasicMaterial: any;
      ambientLight: any;
      fog: any;
      color: any;
    }
  }
}

// Configuration
const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 3.0;
const PARTICLE_SIZE = 0.06;
const BOUNDARY = 6;

// Signal (Pulse) Configuration
const SIGNAL_COUNT = 12;
const SIGNAL_SPEED = 0.04; // Speed of the pulse
const SIGNAL_LENGTH = 0.25; // Length of the trail relative to connection distance

interface Signal {
  source: number;
  target: number;
  progress: number;
}

interface NetworkLogicProps {
    onHover: (hover: boolean) => void;
}

const NetworkLogic: React.FC<NetworkLogicProps> = ({ onHover }) => {
  const { mouse } = useThree();
  
  // Refs for meshes
  const pointsRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const signalLinesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Initialize Particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      });
    }
    return temp;
  }, []);

  // Initialize Adjacency Graph (reused to avoid GC)
  const adjacency = useMemo(() => {
    return new Array(PARTICLE_COUNT).fill(0).map(() => [] as number[]);
  }, []);

  // Initialize Signals
  const signals = useRef<Signal[]>([]);
  useEffect(() => {
    for (let i = 0; i < SIGNAL_COUNT; i++) {
      signals.current.push({
        source: Math.floor(Math.random() * PARTICLE_COUNT),
        target: -1, // will be found in first frame
        progress: 0
      });
    }
  }, []);

  // Initialize Node Colors
  useEffect(() => {
    if (pointsRef.current) {
      const colors = [
        new THREE.Color('#FFFFFF'), // White
        new THREE.Color('#FFFFFF'), // White
        new THREE.Color('#2b0505'), // Very Dark Red
        new THREE.Color('#05052b'), // Very Dark Blue
        new THREE.Color('#1a0202'), // Almost Black Red
        new THREE.Color('#02021a'), // Almost Black Blue
      ];
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        pointsRef.current.setColorAt(i, color);
      }
      pointsRef.current.instanceColor!.needsUpdate = true;
    }
  }, []);

  // Attributes for geometries
  const dummyObj = useMemo(() => new THREE.Object3D(), []);
  const linePosAttribute = useMemo(() => new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), 3), []);
  const signalPosAttribute = useMemo(() => new THREE.BufferAttribute(new Float32Array(SIGNAL_COUNT * 2 * 3), 3), []);

  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute('position', linePosAttribute);
    }
    if (signalLinesRef.current) {
      signalLinesRef.current.geometry.setAttribute('position', signalPosAttribute);
    }
  }, [linePosAttribute, signalPosAttribute]);


  useFrame(() => {
    if (!pointsRef.current || !linesRef.current || !signalLinesRef.current || !groupRef.current) return;

    let lineIndex = 0;
    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Clear adjacency for this frame
    for(let i=0; i<PARTICLE_COUNT; i++) {
      adjacency[i].length = 0;
    }

    // 1. Update Particles & Connections
    particles.forEach((particle, i) => {
      // Move
      particle.position.add(particle.velocity);

      // Boundary Check
      if (Math.abs(particle.position.x) > BOUNDARY) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > BOUNDARY) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > BOUNDARY) particle.velocity.z *= -1;

      // Update Mesh Matrix
      dummyObj.position.copy(particle.position);
      dummyObj.updateMatrix();
      pointsRef.current!.setMatrixAt(i, dummyObj.matrix);

      // Check Connections & Build Graph
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const partner = particles[j];
        const dist = particle.position.distanceTo(partner.position);

        if (dist < CONNECTION_DISTANCE) {
          // Add visual connection line
          positions[lineIndex++] = particle.position.x;
          positions[lineIndex++] = particle.position.y;
          positions[lineIndex++] = particle.position.z;
          
          positions[lineIndex++] = partner.position.x;
          positions[lineIndex++] = partner.position.y;
          positions[lineIndex++] = partner.position.z;

          // Update Graph for signals
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    });

    // Commit updates
    pointsRef.current.instanceMatrix.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // 2. Update Signals (The shooting stars)
    const signalPositions = signalLinesRef.current.geometry.attributes.position.array as Float32Array;
    
    signals.current.forEach((signal, idx) => {
      // Logic to find new target if needed
      if (signal.target === -1 || signal.progress >= 1) {
        // If we finished a path, current target becomes source
        if (signal.target !== -1) {
           signal.source = signal.target;
        }
        
        // Find a neighbor to travel to
        const neighbors = adjacency[signal.source];
        if (neighbors && neighbors.length > 0) {
          signal.target = neighbors[Math.floor(Math.random() * neighbors.length)];
          signal.progress = 0;
        } else {
          // Stuck or isolated? Respawn randomly
          signal.source = Math.floor(Math.random() * PARTICLE_COUNT);
          signal.target = -1;
          signal.progress = 0;
        }
      }

      // Update Position
      if (signal.target !== -1) {
        signal.progress += SIGNAL_SPEED;
        
        const p1 = particles[signal.source].position;
        const p2 = particles[signal.target].position;

        // Calculate trail
        // We want a segment from (progress - length) to (progress)
        const headT = Math.min(1, signal.progress);
        const tailT = Math.max(0, headT - SIGNAL_LENGTH);

        const ix = idx * 6; // 2 points * 3 coords

        // Head
        signalPositions[ix] = p1.x + (p2.x - p1.x) * headT;
        signalPositions[ix+1] = p1.y + (p2.y - p1.y) * headT;
        signalPositions[ix+2] = p1.z + (p2.z - p1.z) * headT;

        // Tail
        signalPositions[ix+3] = p1.x + (p2.x - p1.x) * tailT;
        signalPositions[ix+4] = p1.y + (p2.y - p1.y) * tailT;
        signalPositions[ix+5] = p1.z + (p2.z - p1.z) * tailT;
      } else {
        // Hide if inactive
        const ix = idx * 6;
        signalPositions.fill(0, ix, ix + 6);
      }
    });

    signalLinesRef.current.geometry.attributes.position.needsUpdate = true;

    // 3. Group Rotation
    groupRef.current.rotation.y += 0.001;
    const targetRotX = mouse.y * 0.1; 
    const targetRotY = mouse.x * 0.1; 
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetRotY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <instancedMesh 
        ref={pointsRef} 
        args={[undefined, undefined, PARTICLE_COUNT]}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <sphereGeometry args={[PARTICLE_SIZE, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </instancedMesh>

      {/* Base Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial 
          color="#FFB6C1" 
          transparent 
          opacity={0.35} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </lineSegments>

      {/* Active Signals (Pulses) */}
      <lineSegments ref={signalLinesRef}>
        <bufferGeometry />
        {/* Bright Electric Blue/Cyan for the pulse */}
        <lineBasicMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.9} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          linewidth={2} // Note: linewidth only works in WebGL2 on some browsers, mostly ignored but good to have
        />
      </lineSegments>
    </group>
  );
};

interface NeuralNetworkProps {
    onHover?: (hover: boolean) => void;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ onHover }) => {
  const handleHover = (hover: boolean) => {
      if (onHover) onHover(hover);
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ 
        antialias: true, 
        alpha: false,
        powerPreference: "high-performance" 
      }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <NetworkLogic onHover={handleHover} />
      <fog attach="fog" args={['#000000', 5, 25]} />
    </Canvas>
  );
};
