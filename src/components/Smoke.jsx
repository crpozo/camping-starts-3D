import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Smoke = ({ count = 20 }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    return new Array(count).fill().map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 1.85) * 0.5, // x
        Math.random() * -0.5,         // y
        (Math.random() + 0.55) * 0.5  // z
      ),
      initialY: Math.random() * 0.5,
      scale: Math.random() * 0.3 + 0.2,
      speed: Math.random() * 0.005 + 0.0015,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    data.forEach((d, i) => {
      d.position.y += d.speed;

      // Si sube mucho, reinicia
      if (d.position.y > 2.5) {
        d.position.y = d.initialY; // vuelve a su altura inicial
      }

      const scale = d.scale * (1 + Math.sin(state.clock.elapsedTime + d.offset) * 0.2);

      dummy.position.copy(d.position);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.y = Math.sin(state.clock.elapsedTime + d.offset);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <icosahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="white" transparent opacity={0.8} />
    </instancedMesh>
  );
};

export default Smoke;
