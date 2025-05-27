import gsap from "gsap";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  const [fogo, setFogo] = useState(false);
  const [showScissor, setShowScissor] = useState(false);
  const motoRef = useRef(null);
  const rodaTraseiraRef = useRef(null);
  const rodaDianteiraRef = useRef(null);
  const navigate = useNavigate();

  // Função para empinar a moto ao passar o mouse
  function handleMotoHover(empinar) {
    if (motoRef.current) {
      gsap.to(motoRef.current, {
        rotateZ: empinar ? -18 : 0,
        y: empinar ? -18 : 0,
        transformOrigin: "60% 80%",
        duration: 0.35,
        ease: "power2.out"
      });
    }
    setFogo(empinar);
  }

  useEffect(() => {
    let rafId;
    const distancia = 40;
    const isMobile = window.innerWidth <= 600;
    const cenaWidth = isMobile ? window.innerWidth : 220;
    const bonecoWidth = 60;
    const startX = isMobile ? -bonecoWidth * 4 : 0;
    const endX = cenaWidth;
    const duracao = 4;

    let startTime = null;

    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = ((now - startTime) / 1000) % duracao;
      const progress = elapsed / duracao;
      const x = startX + (endX - startX) * progress;

      if (motoRef.current) {
        gsap.set(motoRef.current, { x });
      }

      // Efeito de rotação das rodas
      const raioTraseira = 18;
      const raioDianteira = 16;
      const anguloTraseira = ((x / (2 * Math.PI * raioTraseira)) * 360) % 360;
      const anguloDianteira = ((x / (2 * Math.PI * raioDianteira)) * 360) % 360;

      if (rodaTraseiraRef.current) {
        gsap.set(rodaTraseiraRef.current, {
          transform: `rotate(${anguloTraseira} 35 60)`
        });
      }
      if (rodaDianteiraRef.current) {
        gsap.set(rodaDianteiraRef.current, {
          transform: `rotate(${anguloDianteira} 115 60)`
        });
      }

      if (progress >= 1) {
        startTime = now;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  function handleCadastrarClick() {
    setShowScissor(true);
    setTimeout(() => {
      navigate("/register", { replace: false });
    }, 1200); // tempo da animação
  }

  return (
    <>
      <style>
        {`
          .bonequinho-moto g {
            transform: unset !important;
          }
          .scissor-transition-overlay {
            position: fixed;
            left: 0; right: 0; bottom: 0; top: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            pointer-events: none;
            overflow: hidden;
          }
          .scissor-blade {
            position: absolute;
            top: 0;
            height: 100vh;
            width: 50vw;
            transition: clip-path 1s cubic-bezier(.77,0,.18,1);
            will-change: clip-path;
          }
          .scissor-blade-left {
            left: 0;
            clip-path: polygon(100% 0, 100% 100%, 100% 100%, 100% 0);
            background: #181818;
          }
          .scissor-blade-right {
            right: 0;
            clip-path: polygon(0 0, 0 100%, 0 100%, 0 0);
            background: #181818;
          }
          .scissor-animate .scissor-blade-left {
            clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
            transition: clip-path 1s cubic-bezier(.77,0,.18,1);
          }
          .scissor-animate .scissor-blade-right {
            clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
            transition: clip-path 1s cubic-bezier(.77,0,.18,1);
          }
          .scissor-svg {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(90deg);
            width: 120px;
            height: 120px;
            z-index: 10000;
            animation: scissor-move-side 1s cubic-bezier(.77,0,.18,1) forwards;
          }
          @keyframes scissor-move-side {
            0% { left: 50%; }
            80% { left: 50%; }
            100% { left: 50%; }
          }
        `}
      </style>
      <div className="home">
        <header>
          <img src="/logo.png" alt="Valentim Barbearia" className="logo-img" />
        </header>
        <main>
          <div className="bonequinhos-area">
            <div className="bonequinhos-texto">
              Especialista em cortes
            </div>
            <div className="bonequinhos-cena">
              <div
                className="bonequinho-moto"
                ref={motoRef}
                onMouseEnter={() => handleMotoHover(true)}
                onMouseLeave={() => handleMotoHover(false)}
                onTouchStart={() => handleMotoHover(true)}
                onTouchEnd={() => handleMotoHover(false)}
                style={{ position: "relative" }}
              >
                {/* SVG de uma moto estilo motoclube (chopper) */}
                <svg width="140" height="80" viewBox="0 0 140 80">
                  <defs>
                    {/* Gradientes */}
                    <radialGradient id="pneuGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#222"/>
                      <stop offset="80%" stopColor="#111"/>
                      <stop offset="100%" stopColor="#000"/>
                    </radialGradient>
                    <linearGradient id="aroGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
                      <stop offset="50%" stopColor="#b0b0b0"/>
                      <stop offset="100%" stopColor="#888"/>
                    </linearGradient>
                    <radialGradient id="centroRodaGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#444"/>
                      <stop offset="100%" stopColor="#111"/>
                    </radialGradient>
                    <linearGradient id="quadroGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#232323"/>
                      <stop offset="100%" stopColor="#444"/>
                    </linearGradient>
                    <linearGradient id="bancoGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#232323"/>
                      <stop offset="100%" stopColor="#666"/>
                    </linearGradient>
                    <linearGradient id="tankGradient" x1="60" y1="30" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#b0b0b0"/>
                      <stop offset="60%" stopColor="#232323"/>
                      <stop offset="100%" stopColor="#b0b0b0"/>
                    </linearGradient>
                  </defs>
                  {/* Sombra */}
                  <ellipse cx="70" cy="75" rx="45" ry="8" fill="#000" opacity="0.18"/>
                  {/* Roda traseira */}
                  <g ref={rodaTraseiraRef}>
                    <circle cx="35" cy="60" r="18" fill="url(#pneuGrad)" stroke="url(#aroGrad)" strokeWidth="5"/>
                    {[...Array(12)].map((_, i) => (
                      <rect
                        key={i}
                        x="34.2"
                        y="43"
                        width="1.6"
                        height="17"
                        rx="0.7"
                        fill="#222"
                        opacity="0.55"
                        transform={`rotate(${i * 30} 35 60)`}
                      />
                    ))}
                    <circle cx="35" cy="60" r="9" fill="url(#centroRodaGrad)" stroke="#222" strokeWidth="2"/>
                    <ellipse cx="35" cy="60" rx="15" ry="15" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.18"/>
                  </g>
                  {/* Roda dianteira */}
                  <g ref={rodaDianteiraRef}>
                    <circle cx="115" cy="60" r="16" fill="url(#pneuGrad)" stroke="url(#aroGrad)" strokeWidth="5"/>
                    {[...Array(12)].map((_, i) => (
                      <rect
                        key={100 + i}
                        x="114.2"
                        y="44"
                        width="1.6"
                        height="16"
                        rx="0.7"
                        fill="#222"
                        opacity="0.55"
                        transform={`rotate(${i * 30} 115 60)`}
                      />
                    ))}
                    <circle cx="115" cy="60" r="7" fill="url(#centroRodaGrad)" stroke="#222" strokeWidth="2"/>
                    <ellipse cx="115" cy="60" rx="13" ry="13" fill="none" stroke="#fff" strokeWidth="1" opacity="0.18"/>
                  </g>
                  {/* Outros elementos da moto */}
                  <rect x="110" y="30" width="5" height="35" rx="2.5" fill="#b0b0b0" stroke="#888" strokeWidth="1.5" transform="rotate(-18 112.5 47.5)"/>
                  <rect x="33" y="45" width="5" height="20" rx="2.5" fill="#b0b0b0" stroke="#888" strokeWidth="1.5" transform="rotate(18 35.5 55)"/>
                  <rect x="45" y="48" width="55" height="10" rx="5" fill="url(#quadroGrad)" stroke="#b0b0b0" strokeWidth="3"/>
                  <ellipse cx="80" cy="40" rx="20" ry="10" fill="url(#tankGradient)" stroke="#b0b0b0" strokeWidth="2"/>
                  <rect x="75" y="32" width="10" height="16" rx="5" fill="#b0b0b0" opacity="0.18"/>
                  <rect x="90" y="35" width="28" height="10" rx="5" fill="url(#bancoGrad)" stroke="#b0b0b0" strokeWidth="2"/>
                  <ellipse cx="60" cy="58" rx="10" ry="7" fill="#b0b0b0" stroke="#fff" strokeWidth="2"/>
                  <rect x="55" y="65" width="10" height="7" rx="3.5" fill="#888" stroke="#b0b0b0" strokeWidth="1"/>
                  <rect x="50" y="68" width="40" height="4" rx="2" fill="#b0b0b0" stroke="#fff" strokeWidth="1.2" transform="rotate(-8 70 70)"/>
                  <rect x="55" y="72" width="38" height="3" rx="1.5" fill="#b0b0b0" stroke="#fff" strokeWidth="1" transform="rotate(-6 74 73.5)"/>
                  <rect x="100" y="18" width="4" height="22" rx="2" fill="#b0b0b0" stroke="#fff" strokeWidth="1.2" transform="rotate(-30 102 29)"/>
                  <rect x="120" y="18" width="4" height="22" rx="2" fill="#b0b0b0" stroke="#fff" strokeWidth="1.2" transform="rotate(30 122 29)"/>
                  <ellipse cx="132" cy="32" rx="7" ry="4" fill="#ffe066" stroke="#b0b0b0" strokeWidth="2"/>
                  <ellipse cx="80" cy="40" rx="20" ry="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.13"/>
                  <ellipse cx="60" cy="58" rx="10" ry="7" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.13"/>
                  <ellipse cx="80" cy="40" rx="5" ry="5" fill="#b0b0b0" stroke="#fff" strokeWidth="1.2" opacity="0.7"/>
                  <text x="80" y="43" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#232323" fontFamily="Arial Black, Arial, sans-serif">VB</text>
                </svg>
                {/* Fogo animado no escapamento */}
                {fogo && (
                  <svg
                    width="40"
                    height="30"
                    viewBox="0 0 40 30"
                    style={{
                      position: "absolute",
                      left: 25,
                      top: 55,
                      pointerEvents: "none",
                      zIndex: 10,
                    }}
                  >
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="scale"
                        values="1,1;1.2,1.3;1,1"
                        keyTimes="0;0.5;1"
                        dur="0.4s"
                        repeatCount="indefinite"
                      />
                      <path
                        d="M10 20 Q13 10 20 15 Q25 8 30 18 Q28 12 35 20 Q28 25 20 22 Q15 28 10 20"
                        fill="orange"
                        opacity="0.85"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.85;1;0.7;0.85"
                          dur="0.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill"
                          values="orange;yellow;red;orange"
                          dur="0.4s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M18 22 Q20 17 25 20 Q23 19 28 22 Q24 24 20 22"
                        fill="yellow"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.7;1;0.5;0.7"
                          dur="0.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill"
                          values="yellow;orange;yellow"
                          dur="0.4s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <div className="agendar-area">
              <button
                className="agendar-btn"
                onClick={handleCadastrarClick}
                disabled={showScissor}
              >
                Cadastrar
              </button>
              <button
                className="agendar-btn"
                style={{ marginLeft: '0.5rem' }}
                onClick={() => navigate("/cliente", { replace: false })}
                disabled={showScissor}
              >
                Sou Cliente
              </button>
            </div>
          </div>
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
        {showScissor && (
          <ScissorTransition />
        )}
      </div>
    </>
  );
}

function RotatingCylinder({ stripeTexture }) {
  const cylinderRef = useRef(null);

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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert('Copiado: ' + text);
}

function BarberPole3D() {
  const stripeTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
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
      <RotatingCylinder stripeTexture={stripeTexture} />
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[1.1, 32, 16]} />
        <meshPhysicalMaterial
          color="#e0e0e0"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.5}
          reflectivity={1}
          sheen={1}
          sheenColor="#f5f5f5"
          sheenRoughness={0.55}
        />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[1.1, 32, 16]} />
        <meshPhysicalMaterial
          color="#b0b0b0"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.7}
          reflectivity={1}
          sheen={1}
          sheenColor="#e0e0e0"
          sheenRoughness={0.45}
        />
      </mesh>
    </Canvas>
  );
}

function ScissorTransition() {
  // Inicia aberta e fecha depois, anima de baixo para cima
  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0); // 0 (baixo) até 1 (topo)
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 30);
    setTimeout(() => setOpen(false), 200); // fecha as lâminas após início

    // Anima a subida da tesoura e o corte
    let start;
    const duration = 1000; // ms
    function animateStep(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      let p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(animateStep);
      } else {
        setShowRegister(true);
      }
    }
    requestAnimationFrame(animateStep);
  }, []);

  // Calcula a posição vertical da tesoura e das lâminas
  const scissorY = 100 - progress * 100; // de 100vh até 0vh
  const bladeClip = progress === 0
    ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
    : `polygon(0 ${100 - progress * 100}%, 100% ${100 - progress * 100}%, 100% 100%, 0 100%)`;

  return (
    <>
      {showRegister && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            pointerEvents: "none",
            animation: "registerReveal 0.3s linear forwards"
          }}
        >
          <iframe
            src="/register"
            style={{
              width: "100vw",
              height: "100vh",
              border: "none",
              pointerEvents: "auto",
              background: "#181818"
            }}
            title="Cadastro"
          />
        </div>
      )}
      <div className="scissor-transition-overlay" style={{zIndex: 9999}}>
        {/* Lâmina esquerda */}
        <div
          className="scissor-blade scissor-blade-left"
          style={{
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#181818",
            clipPath: bladeClip,
            transition: "clip-path 0s"
          }}
        />
        {/* Lâmina direita (não usada, corte é central) */}
        {/* Tesoura SVG animada subindo */}
        <svg
          className="scissor-svg"
          viewBox="0 0 120 120"
          style={{
            left: "50%",
            position: "absolute",
            transform: "translateX(-50%)",
            width: 120,
            height: 120,
            zIndex: 10000,
            top: `calc(${scissorY}vh - 60px)`,
            transition: "top 0s"
          }}
        >
          {/* Tesoura com ponta para cima */}
          <g
            style={{
              transformOrigin: "60px 60px",
              transform: "rotate(0deg)"
            }}
          >
            {/* Lâmina esquerda */}
            <g
              style={{
                transformOrigin: "60px 60px",
                transform: open
                  ? "rotate(-32deg)"
                  : "rotate(-5deg)",
                transition: "transform 0.6s cubic-bezier(.77,0,.18,1)"
              }}
            >
              <rect x="56" y="18" width="8" height="60" rx="3.5" fill="#d0d0d0" stroke="#888" strokeWidth="2" />
              <polygon points="60,18 66,78 54,78" fill="#e0e0e0" stroke="#888" strokeWidth="2"/>
            </g>
            {/* Lâmina direita */}
            <g
              style={{
                transformOrigin: "60px 60px",
                transform: open
                  ? "rotate(32deg)"
                  : "rotate(5deg)",
                transition: "transform 0.6s cubic-bezier(.77,0,.18,1)"
              }}
            >
              <rect x="56" y="18" width="8" height="60" rx="3.5" fill="#b0b0b0" stroke="#888" strokeWidth="2" />
              <polygon points="60,18 66,78 54,78" fill="#cccccc" stroke="#888" strokeWidth="2"/>
            </g>
            {/* Parafuso central */}
            <circle cx="60" cy="60" r="7" fill="#888" stroke="#555" strokeWidth="2"/>
            <circle cx="60" cy="60" r="3" fill="#fff" stroke="#aaa" strokeWidth="1"/>
            {/* Cabos */}
            <ellipse cx="38" cy="100" rx="15" ry="18" fill="#fff" stroke="#888" strokeWidth="4" />
            <ellipse cx="82" cy="100" rx="15" ry="18" fill="#fff" stroke="#888" strokeWidth="4" />
            {/* Detalhes dos cabos */}
            <ellipse cx="38" cy="100" rx="7" ry="9" fill="#e0e0e0" stroke="#bbb" strokeWidth="2" />
            <ellipse cx="82" cy="100" rx="7" ry="9" fill="#e0e0e0" stroke="#bbb" strokeWidth="2" />
            {/* Hastes dos cabos */}
            <rect x="57" y="70" width="6" height="30" rx="3" fill="#bbb" stroke="#888" strokeWidth="2" transform="rotate(-18 60 85)" />
            <rect x="57" y="70" width="6" height="30" rx="3" fill="#bbb" stroke="#888" strokeWidth="2" transform="rotate(18 60 85)" />
          </g>
        </svg>
      </div>
      <style>
        {`
          @keyframes registerReveal {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </>
  );
}