import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
}

function SmokeEffect({
  color = "#26cef3",
  particlesPerEmit = 2,
}: {
  color?: string;
  particlesPerEmit?: number;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastEmitTime, setLastEmitTime] = useState(0);

  const createParticle = useCallback(
    (x: number, y: number, id: number) => ({
      id,
      x,
      y,
      angle: Math.random() * Math.PI * 1,
      speed: Math.random() * 0.8 + 0.5,
      size: Math.random() * 12 + 10,
      opacity: Math.random() * 0.6 + 0.3,
    }),
    [],
  );

  const emitParticles = useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      if (now - lastEmitTime < 10) return;
      setLastEmitTime(now);

      const newParticles = Array.from({ length: particlesPerEmit }, (_, i) =>
        createParticle(x, y, now + i),
      );

      setParticles((prev) => {
        const updatedParticles = [...prev, ...newParticles];
        if (updatedParticles.length > 50) {
          return updatedParticles.slice(updatedParticles.length - 50);
        }
        return updatedParticles;
      });

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
        );
      }, 1200);
    },
    [createParticle, particlesPerEmit, lastEmitTime],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      emitParticles(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [emitParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-md"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: particle.opacity,
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle) * 120 * particle.speed,
              y: particle.y + Math.sin(particle.angle) * 120 * particle.speed,
              scale: 2,
              opacity: 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function MouseSmokeEffect() {
  return <SmokeEffect />;
}
