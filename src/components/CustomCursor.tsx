'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const style = document.createElement('style');
    style.id = 'cursor-hide';
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let scale = 1, targetScale = 1;
    let visible = false;
    let raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const leave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], .hoverable')) {
        targetScale = 1.5;
        ring.style.borderColor = 'rgba(232, 168, 76, 0.6)';
      }
    };

    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], .hoverable')) {
        targetScale = 1;
        ring.style.borderColor = 'rgba(196, 123, 43, 0.4)';
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      scale += (targetScale - scale) * 0.12;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);

    return () => {
      style.remove();
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-amber"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-10 h-10 rounded-full"
        style={{
          opacity: 0,
          willChange: 'transform',
          border: '1.5px solid rgba(196, 123, 43, 0.4)',
          transition: 'border-color 0.3s ease',
        }}
      />
    </>
  );
}
