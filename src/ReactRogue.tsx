import React, { useRef, useEffect } from 'react';

export interface ReactRogueInterface {
    width: number;
    height: number;
    tileSize: number;
}

const ReactRogue: React.FC<ReactRogueInterface> = (props: ReactRogueInterface) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasWidth = props.width * props.tileSize;
    const canvasHeight = props.height * props.tileSize;

    useEffect(() => {
        console.log('Draw to canvas')
        const ctx = null != canvasRef.current ? canvasRef.current.getContext('2d') : null;
        if (ctx !== null) {
            ctx.clearRect(0,0, canvasWidth, canvasHeight);
            ctx.fillStyle = "#000"
            ctx.fillRect(12, 22, 16, 16);
        }
    })
    
    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
        />
    );
}

export default ReactRogue;