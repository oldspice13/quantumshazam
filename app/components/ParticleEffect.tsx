import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  rotation: number;
  opacity: number;
}

interface ParticleEffectProps {
  isActive: boolean;
  text: string;
}

export function ParticleEffect({ isActive, text }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles from text
    const createParticles = () => {
      const particles: Particle[] = [];
      const textWidth = ctx.measureText(text).width;
      const textHeight = 24; // Approximate text height
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create particles in a text-like formation
      for (let i = 0; i < 100; i++) {
        const angle = (Math.PI * 2 * i) / 100;
        const radius = Math.random() * textWidth / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        particles.push({
          id: i,
          x,
          y,
          size: Math.random() * 3 + 2,
          color: `hsl(${Math.random() * 60 + 20}, 100%, 50%)`, // Orange to red
          velocity: {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
          },
          rotation: Math.random() * 360,
          opacity: 1,
        });
      }

      return particles;
    };

    particlesRef.current = createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update particle position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.rotation += 2;
        particle.opacity -= 0.01;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Remove dead particles
      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.opacity > 0
      );

      // Continue animation if there are particles
      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, text]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}
    </AnimatePresence>
  );
} 