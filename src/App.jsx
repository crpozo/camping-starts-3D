import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Stars } from '@react-three/drei'; 

function App() {
  return (
    <>
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <color attach="background" args={["#171720"]} />
      <fog attach="fog" args={["#171720", 10, 30]} />
      <Stars
        radius={100}        // radio de la esfera donde están las estrellas
        depth={50}          // profundidad (z-buffer)
        count={5000}        // número de estrellas
        factor={9}          // tamaño de las estrellas
        saturation={0}      // saturación de color
        fade                // que las estrellas se desvanezcan con la distancia
      />
      <Suspense>
        <Experience />
      </Suspense>
      <EffectComposer>
        <Bloom mipmapBlur intesity={1.2} />
      </EffectComposer>
    </Canvas>
    <UI/>
    </>
  );
}

export default App;
