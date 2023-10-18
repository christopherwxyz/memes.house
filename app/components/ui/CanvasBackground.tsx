"use client"
// CanvasBackground.tsx
import React, { useEffect, useRef } from 'react';

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const emojis = ['😂', '😢', '😭', '😅', '😍', '😡', '😱', '😓', '😎', '😵'];

  function drawStarField(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rows = 5;  // Halved the number of rows
    const columns = 10;  // Kept the same number of columns for equal spacing width-wise
    const cellWidth = canvas.width / columns;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const x = j * cellWidth + cellWidth / 2;
        const y = Math.random() * canvas.height;  // Random vertical position
        ctx.save();
        ctx.globalAlpha = 0.1;  // Made emojis barely visible
        ctx.translate(x, y);
        ctx.rotate((Math.PI / 180) * (Math.random() * 360));
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 0, 0);
        ctx.restore();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStarField(canvas, ctx);  // Draw once on mount
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 z-0 w-full h-full" />;
};

export default CanvasBackground;
