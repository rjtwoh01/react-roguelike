import React from 'react';

class InputManager extends React.Component {
    observers: Function[] = [];

    //Need to keep a list of functions that are subscribed to the input manager
    subscribe(fn: Function) {
        this.observers.push(fn);
    }

    unsubscribe(fn: Function) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    //broadcast will trigger the function call for each observer of InputManager
    //Each of the observers have their own function to handle the action and data
    broadcast(action: any, data: any) {
         this.observers.forEach(subscriber => {
             subscriber(action, data);
         });
    }

    //handleKeys will capture key events and "broadcast" them to each function that subscribes to the input manager
    handleKeys = (e: KeyboardEvent) => {
        e.preventDefault();
        switch (e.code) {
            case 'ArrowLeft': //arrow key
                this.broadcast('move', {x: -1,y:0}); //we want to move left with a vector
                break;
            case 'ArrowRight':
                this.broadcast('move', {x: 1,y:0});
                break;
            case 'ArrowUp':
                this.broadcast('move', {x: 0,y:-1});
                break;
            case 'ArrowDown':
                this.broadcast('move', {x: 0,y:1});
                break;
            default:
                break;
        }
    }

    bindKeys() {
        document.addEventListener('keydown', this.handleKeys);
    }

    unbindKeys() {
        document.removeEventListener('keydown', this.handleKeys);
    }
}

export default InputManager;