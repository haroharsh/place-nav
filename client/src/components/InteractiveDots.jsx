import React, { useEffect, useRef } from 'react';

const InteractiveDots = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const dots = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const spacing = 35;
        const radius = 1.5;
        const impactRadius = 180;

        const initDots = () => {
            dots.current = [];
            for (let x = spacing / 2; x < canvas.width; x += spacing) {
                for (let y = spacing / 2; y < canvas.height; y += spacing) {
                    dots.current.push({ x, y, baseRadius: radius });
                }
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDots();
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            dots.current.forEach(dot => {
                const dx = mouse.current.x - dot.x;
                const dy = mouse.current.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let currentRadius = dot.baseRadius;
                let opacity = 0.08; // Base opacity

                if (distance < impactRadius) {
                    const factor = (1 - distance / impactRadius);
                    const powerFactor = Math.pow(factor, 2); // Exponential growth
                    currentRadius = dot.baseRadius + powerFactor * 10; // Enlarges by 10px
                    opacity = 0.08 + powerFactor * 0.92; // Brightness up to 1.0
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default InteractiveDots;
