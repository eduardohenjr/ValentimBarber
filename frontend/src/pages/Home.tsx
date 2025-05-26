import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home">
      <header>
        <img src="/logo.png" alt="Valentim Barbearia" />
      </header>
      <main>
        <nav className="main-menu">
          <a href="#">SERVIÇOS</a>
          <a href="#">GALERIA</a>
          <a href="#">AGENDAMENTO</a>
        </nav>
        <div className="info-barber">
          <div className="barber-pole">
            <BarberPole3D />
          </div>
          <div className="info-text">
            <p><strong>Horário de Funcionamento:</strong> Manter a Sábado: 08:00 - 19:00</p>
            <p>
              <strong>Endereço:</strong>
              <a href="https://maps.google.com/?q=Rua Aforiso, 123, Cidade, SP" target="_blank" rel="noopener noreferrer" style={{color: '#ffd700', textDecoration: 'none'}}>
                Rua Aforiso: 123, Cidade, SP
              </a>
            </p>
            <p>
              <strong>Telefone:</strong>
              <a href="tel:11967654321" style={{color: '#ffd700', textDecoration: 'none'}}> (11) 96765-4321</a>
            </p>
          </div>
        </div>
      </main>
      <footer className="footer-simple">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Valentim Barbearia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function RotatingCylinder({ stripeTexture }: { stripeTexture: THREE.Texture }) {
  const cylinderRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={cylinderRef}>
      <cylinderGeometry args={[1, 1, 5, 64, 1, true]} />
      <meshStandardMaterial
        map={stripeTexture}
        metalness={0.5}
        roughness={0.25}
      />
    </mesh>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  alert('Copiado: ' + text);
}


function BarberPole3D() {
  const stripeTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    for (let i = 0; i < 24; i++) {
      ctx.fillStyle = i % 3 === 0 ? "#e53935" : i % 3 === 1 ? "#fff" : "#1976d2";
      ctx.save();
      ctx.translate(32, 12 * i);
      ctx.rotate(-Math.PI / 6);
      ctx.fillRect(-64, -6, 128, 12);
      ctx.restore();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={2} />
        <directionalLight position={[0, 0, 10]} intensity={2} color="#fffbe7" />
        <directionalLight position={[0, 10, 0]} intensity={1.5} color="#fffbe7" />
      {/* Cilindro com textura de listras rotacionando */}
      <RotatingCylinder stripeTexture={stripeTexture} />
      {/* Topo dourado mais vivo */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[1.1, 32, 16]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
      {/* Base dourada mais viva */}
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[1.1, 32, 16]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Canvas>
  );
}