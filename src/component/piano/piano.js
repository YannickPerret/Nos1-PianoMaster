import React, { useEffect, useRef, useState } from 'react';
import { Piano } from '../../helpers/piano';

const PianoMaster = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);
    const pianoRef = useRef();
    const [notation, setNotation] = useState([
        ["white e", "c/4"],
        ["black ds", "c#/e"],
        ["white d", "d/4"],
        ["black cs", "d#/4"],
        ["white c", "e/4"],
        ["white b", "f/4"],
        ["black as", "f#/4"],
        ["white a", "g/4"],
        ["black gs", "g#/4"],
        ["white g", "a/4"],
        ["black fs", "a#/4"],
        ["white f", "b/4"]
    ])
    let fragment=[];

    useEffect(() => {
        for (let i = 0; i < window.innerWidth; i += 755) {
            notation.map(element => {
                fragment += <li className={element[0]} onClick={(e => [Piano.play(element[1], audioActivated), props.onWrite(element[1])])}></li>
            })
        }
        
        console.log(fragment)
       
    }, [])


    return (
        <>
            <label>Son du piano</label> <input type="checkbox" checked={audioActivated} onChange={(e => setAudioActivated(e.target.checked))} />
            <ul className="set" id="piano">
                {// c = do, d = RÉ, e = MI, f = FA, g = SOL, a = LA , b = SI
            }
            </ul>

            <audio id="c/4" src="../sounds/piano/c4.mp3"></audio>
            <audio id="c#/4" src="../sounds/piano/c4D.mp3"></audio>
            <audio id="d/4" src="../sounds/piano/d4.mp3"></audio>
            <audio id="d#/4" src="../sounds/piano/d4D.mp3"></audio>
            <audio id="e/4" src="../sounds/piano/e4.mp3"></audio>
            <audio id="f/4" src="../sounds/piano/f4.mp3"></audio>
            <audio id="f#/4" src="../sounds/piano/f4D.mp3"></audio>
            <audio id="g/4" src="../sounds/piano/g4.mp3"></audio>
            <audio id="g#/4" src="../sounds/piano/g4D.mp3"></audio>
            <audio id="a/4" src="../sounds/piano/a4.mp3"></audio>
            <audio id="a#/4" src="../sounds/piano/a4D.mp3"></audio>
            <audio id="b/4" src="../sounds/piano/b4.mp3"></audio>
        </>
    );
};

export default PianoMaster;