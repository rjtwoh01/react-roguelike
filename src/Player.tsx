import React from 'react';
import { Context } from 'vm';

type PlayerProps = {
    x: number;
    y: number;
    size: number;
} 

class Player extends React.Component<PlayerProps> {
    // constructor(x, y, size)
    public x: number;
    public y: number;
    public size: number;

    constructor(props: PlayerProps) {
        super(props);
        this.x = props.x;
        this.y = props.y;
        this.size = props.size
    }

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    draw(context: Context) {
        context.fillStyle = "#f00";
        context.textBaseline = "hanging";
        context.font = '16px Helvetica';
        context.fillText('@', (this.x * this.size), (this.y * this.size));
    }
}

export default Player