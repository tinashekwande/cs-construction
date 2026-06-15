import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const onMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      dot.style.left = `${posX}px`;
      dot.style.top = `${posY}px`;

      // Smooth trail for outline
      outline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: 'forwards' }
      );
    };

    const onMouseDown = () => {
      outline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    };

    const onMouseUp = () => {
      outline.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Event delegation to capture dynamic hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .hover-target, [role="button"]');
      if (target) {
        document.body.classList.add('cursor-active');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .hover-target, [role="button"]');
      if (target) {
        document.body.classList.remove('cursor-active');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-outline" ref={outlineRef}></div>
    </>
  );
}
