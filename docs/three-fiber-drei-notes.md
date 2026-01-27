# Notas: Three, @react-three/fiber y @react-three/drei

Propósito: recordatorio breve de qué es cada paquete, en qué se diferencian y cuándo usar cada uno.

## ¿Qué es cada paquete?

- **three**: Motor 3D base en JavaScript. Proporciona escena, cámara, luces, geometrías, materiales, shaders y el renderizador WebGL. Es potente pero de bajo nivel.
- **@react-three/fiber**: Renderizador de React para Three.js. Permite describir la escena en JSX, usar hooks (`useFrame`, `useThree`, `useLoader`) y delega el loop de render y el ciclo de vida a React. Es la “puerta” que conecta React con Three.
- **@react-three/drei**: Colección de helpers y componentes listos sobre Fiber para reducir boilerplate. Incluye `OrbitControls`, `Environment`, `useGLTF`, `Text`, `Html`, `CameraControls`, `Stage`, `ContactShadows`, etc.

## Diferencias clave

- **Fiber** (imprescindible): monta el `Canvas`, gestiona el render loop y expone primitivas 3D como componentes React (`mesh`, `boxGeometry`, `pointLight`, `perspectiveCamera`).
- **Drei** (opcional): atajos y utilidades para tareas comunes (cámara, carga de modelos, luces de entorno, sombras, UI en 3D) encima de Fiber.
- **Relación**: Drei se apoya en Fiber; ambos usan Three por debajo.
- **Ambos te dan componentes**: Fiber ofrece los elementos 3D básicos; Drei aporta componentes más específicos y pulidos para cámara, ambientación, carga de modelos y UI en 3D.

## ¿Cuándo usar cada uno?

- **Solo Fiber**: cuando buscas control fino, componentes a medida o minimizar dependencias.
- **Fiber + Drei**: cuando quieres productividad y evitar código repetitivo (controles de cámara, carga GLTF, ambientación, sombras, UI en 3D) sin reescribirlo tú.

## Ejemplo mínimo

```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh rotation={[0.3, 0.4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```

## Glosario rápido

- **Canvas** (Fiber): lienzo WebGL gestionado por React.
- **useFrame** (Fiber): callback por frame para animaciones.
- **useThree** (Fiber): acceso a renderer/scene/camera.
- **useGLTF** (Drei): carga modelos GLTF/GLB.
- **OrbitControls** (Drei): control de cámara con ratón/táctil.
- **Environment** (Drei): iluminación de entorno (HDRI) fácil.
- **Html/Text** (Drei): UI/Texto integrados en la escena 3D.
- **Stage/ContactShadows** (Drei): presets de iluminación/sombras.

## Consejos

- Importa solo lo necesario de `drei` para mantener el bundle pequeño (tree-shaking).
- Usa `Fiber` para la estructura base y estado/animaciones; añade `Drei` cuando un helper te evite código repetitivo.
- Mantén los controles y la carga de recursos (GLTF/texturas) dentro de componentes dedicados para claridad.
