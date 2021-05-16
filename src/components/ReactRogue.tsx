import React, { useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';
import Player from './Player';

export interface ReactRogueInterface {
    width: number;
    height: number;
    tileSize: number;
}

const ReactRogue: React.FC<ReactRogueInterface> = (props: ReactRogueInterface) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [player, setPlayer] = useState(new Player({x: 1, y: 2, size: props.tileSize}));
    const canvasWidth = props.width * props.tileSize;
    const canvasHeight = props.height * props.tileSize;
    let inputManager = new InputManager({});

    //Receives action and data from Input manager
    //For the move action, take the vector data and pass it to player move
    //Update the player position on the canvas
    const handleInput = (action: any, data: any) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newPlayer = new Player({x: player.x, y: player.y, size: player.size});
        newPlayer.move(data.x, data.y);
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
            player.draw(ctx)
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