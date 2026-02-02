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

---

# Conceptos clave de React y librerías

## Hooks vs Dependencias vs Plugins

### Dependencia

Un paquete npm que instalas en tu proyecto. Ejemplo:

- `react`
- `gsap`
- `react-responsive`

### Hook

Una función que una dependencia exporta. Todos los hooks:

- Empiezan con `use` (convención)
- Solo se usan dentro de componentes React
- Acceden a estado y ciclo de vida

Ejemplos:

- `useState`, `useEffect` → vienen de `react`
- `useMediaQuery` → viene de `react-responsive`
- `useGSAP` → viene de `@gsap/react`

**Un hook siempre es una función de una dependencia.**

### Plugin

Herramienta que se integra en otro sistema para extender funcionalidad.

- Plugin de Vite, ESLint, Webpack, etc.

### Relación

```
Dependencia (gsap)
    ↓
Hook (@gsap/react exporta useGSAP)
    ↓
Tu componente usa useGSAP()
```

## GSAP en React

### Instalación

Necesitas ambos paquetes:

```
npm install gsap @gsap/react
```

- **gsap**: librería base de animaciones (vanilla)
- **@gsap/react**: integración oficial con React que proporciona `useGSAP`

### Por qué dos?

- `gsap` funciona en cualquier JavaScript
- `@gsap/react` lo adapta a React, manejando automáticamente cleanup y ciclo de vida

### ScrollTrigger: start y end

Cuando configuras un ScrollTrigger, defines cuándo empieza y termina la animación durante el scroll.

**Formato:** `'posición-del-elemento posición-de-la-pantalla'`

```jsx
scrollTrigger: {
  trigger: '#showcase',
  start: 'top top',      // empieza cuando el tope de #showcase toca el tope de la pantalla
  end: 'end top'         // termina cuando el final de #showcase toca el tope de la pantalla
}
```

**Explicación simple:**

- `start: 'top top'` → "Inicia cuando el **inicio de la sección** llega al **tope de la pantalla**"
- `end: 'end top'` → "Termina cuando el **final de la sección** llega al **tope de la pantalla**"

**Ejemplo de scroll:**

1. Haces scroll hacia abajo
2. Cuando el inicio de `#showcase` toca el tope de tu pantalla → animación empieza
3. Sigues haciendo scroll
4. Cuando el final de `#showcase` toca el tope de tu pantalla → animación termina

**Otras opciones comunes:**

- `'top center'` → elemento toca el centro de la pantalla
- `'bottom bottom'` → parte inferior del elemento toca el fondo de la pantalla
- `'top 80%'` → elemento toca el 80% de altura de la pantalla

## Media Queries en CSS y React

### Sintaxis CSS

Toda media query entre paréntesis:

```css
@media (max-width: 1024px) {
  /* estilos */
}
```

### Con useMediaQuery (react-responsive)

```jsx
import { useMediaQuery } from "react-responsive";

const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
```

- El hook evalúa la consulta CSS
- Devuelve `true` o `false`
- Se actualiza cuando cambia el tamaño de ventana

### Entender max-width

`max-width: 1024px` = "si el ancho es **1024px o menos**"

Analogía: "Si mides 1.40m **o menos**, entra gratis al parque"

### Breakpoints en Tailwind

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px ← Breakpoint "large"
- `xl`: 1280px
- `2xl`: 1536px

### Ejemplo en Tailwind

```jsx
<div className="lg:max-w-md"></div>
```

- En pantallas menores a 1024px: sin límite (puede ocupar todo el ancho)
- En pantallas 1024px o mayores: ancho máximo limitado a 28rem (≈448px)

## Tailwind: lg: prefix

`lg:` es un **breakpoint prefix** que significa "aplica esta clase solo en pantallas `lg` o mayores"

```jsx
<div className="text-base lg:text-2xl"></div>
```

- Mobile/tablet: `text-base`
- Desktop: `text-2xl`
