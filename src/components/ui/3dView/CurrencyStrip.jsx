// CurrencyStrip.jsx
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ url }) => {
  const group = useRef();

  const { scene } = useGLTF(url ?? "");

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.current.position.set(-center.x, -center.y, -center.z);
  }, [scene]);

  return (
    <group ref={group}>
      <primitive object={scene.clone()} />
    </group>
  );
};

const GLBThumbnail = ({ url, isSelected }) => (
  <div
    className={`
      w-20 h-16 lg:w-[94.577px] lg:h-[88px]  px-2
        overflow-hidden   transition-all duration-200  ${
          isSelected
            ? "border-b-orange-500  border-b-1"
            : "border-b-slate opacity-60 border-b-1"
        }`}
  >
    <Canvas
      camera={{ position: [0, 0, 3] }}
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
    </Canvas>
  </div>
);

const CurrencyStrip = ({ images = [], selectedIndex = 0, onSelect }) => {
  return (
    <div className=" lg:w-full overflow-x-auto no-scrollbar lg:px-3 ">
      <div className="flex    items-center  ">
        {images.map((url, index) => (
          <div
            key={index}
            onClick={() => onSelect(url)}
            className="cursor-pointer "
          >
            <GLBThumbnail url={url} isSelected={index === selectedIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyStrip;
