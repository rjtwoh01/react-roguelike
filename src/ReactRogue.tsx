import React from 'react';

export interface ReactRogueInterface {
    width: number;
    height: number;
    tileSize: number;
}

const ReactRogue: React.FC<ReactRogueInterface> = (props: ReactRogueInterface) => (
    //canvas isn't currently appearing on the screen after change to props
    <canvas width={props.width * props.tileSize} height={props.height * props.tileSize} style={{ border: '1px solid black' }}/>
)

export default ReactRogue;