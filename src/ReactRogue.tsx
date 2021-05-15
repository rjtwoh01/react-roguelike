import React from 'react';

export interface ReactRogueInterface {
    width: number;
    height: number;
    tileSize: number;
}

const ReactRogue: React.FC<ReactRogueInterface> = (props: ReactRogueInterface) => {
    const canvasWidth = props.width * props.tileSize;
    const canvasHeight = props.height * props.tileSize;
    
    return (
        <canvas width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }}/>
    );
}

export default ReactRogue;