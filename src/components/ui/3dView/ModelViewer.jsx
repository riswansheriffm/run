// ModelViewer.jsx
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Component to load and center the model
function Model({ url, onLoaded }) {
  const group = useRef();
  const { scene } = useGLTF(url ?? "");

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.current.position.set(-center.x, -center.y, -center.z);

    // Callback to parent with bounding box size
    if (onLoaded) {
      const size = new THREE.Vector3();
      box.getSize(size);
      onLoaded(size.length());
    }
  }, [scene, onLoaded]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// Component to reset the camera on modelPath change
function CameraReset({ trigger }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [trigger]);
  return null;
}

// Main viewer component
const ModelViewer = ({ modelPath, bgImg }) => {
  const [pos, setPos] = useState([0, 0, 0]); // OrbitControls target
  const orbitRef = useRef(); // Ref to OrbitControls

  useEffect(() => {
    if (modelPath) {
      setPos([0, 0, 0]); // Center the controls target
      if (orbitRef.current) {
        orbitRef.current.reset(); // Reset camera and controls
      }
    }
  }, [modelPath]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className=" h-[200px] md:h-[300px] lg:h-[410px]  flex justify-center items-center"
    >
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* Reset camera position when modelPath changes */}
        <CameraReset trigger={modelPath} />

        <Suspense fallback={null}>
          <Model url={modelPath} />
        </Suspense>
        <ambientLight intensity={1} />

        <OrbitControls
          ref={orbitRef}
          target={pos}
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.1}
          zoomSpeed={0.2}
          minDistance={2}
          maxDistance={10}
        />
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
