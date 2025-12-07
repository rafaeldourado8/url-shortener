import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BackgroundGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 250,
      y: mousePosition.y - 250,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background -z-10">
      {/* Gradientes estáticos de fundo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-1 blur-[100px] animate-float" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-2 blur-[100px] animate-float" 
          style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-3 blur-[120px] animate-float"
          style={{ animationDelay: '4s' }} />
      </div>

      {/* Gradiente que segue o mouse */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        variants={variants}
        animate="default"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.3) 30%, rgba(249, 115, 22, 0.2) 60%, transparent 70%)',
        }}
      />

      {/* Efeito de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Brilhos pontuais */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-32 w-2 h-2 bg-gradient-2 rounded-full animate-pulse" />
    </div>
  );
};

export default BackgroundGradient;