import React, { useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';

export interface ReactRogueInterface {
    width: number;
    height: number;
    tileSize: number;
}

const ReactRogue: React.FC<ReactRogueInterface> = (props: ReactRogueInterface) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [player, setPlayer] = useState({x: 64, y:128});
    const canvasWidth = props.width * props.tileSize;
    const canvasHeight = props.height * props.tileSize;
    let inputManager = new InputManager({});

    const handleInput = (action: any, data: any) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newPlayer = {...player}; //shallow copy of player
        newPlayer.x += (data.x * props.tileSize);
        newPlayer.y += (data.y * props.tileSize);
        setPlayer(newPlayer);
    }

    useEffect(() => {
        console.log('Bind input');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        
        //Returning a function in useEffect acts as CompnentWillUnmount
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput)
        }
    })

    useEffect(() => {
        console.log('Draw to canvas')
        const ctx = null != canvasRef.current ? canvasRef.current.getContext('2d') : null;
        if (ctx !== null) {
            ctx.clearRect(0,0, canvasWidth, canvasHeight);
            ctx.fillStyle = "#000"
            ctx.fillRect(player.x, player.y, 16, 16);
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