import React, { useEffect, useState } from 'react';
import { Piano } from '../../helpers/piano';

const PianoMaster = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);
    const [notation, setNotation] = useState([
        ["white e", "c/4", "c4.mp3"],
        ["black ds", "c#/e", "c4D.mp3"],
        ["white d", "d/4", "d4.mp3"],
        ["black cs", "d#/4", "d4D.mp3"],
        ["white c", "e/4", "e4.mp3"],
        ["white b", "f/4", "f4.mp3"],
        ["black as", "f#/4", "f4D.mp3"],
        ["white a", "g/4", "g4.mp3"],
        ["black gs", "g#/4", "g4D.mp3"],
        ["white g", "a/4", "a4.mp3"],
        ["black fs", "a#/4", "a4D.mp3"],
        ["white f", "b/4", "b4.mp3"]
    ])

    useEffect(() => {
        document.getElementById('piano').innerHTML=""
        for (let i = 0; i < window.innerWidth; i += 755) {
            notation.forEach(element => {
                let temp = document.createElement('li')
                temp.className = element[0];
                temp.addEventListener('click', () =>{
                    [Piano.play(element[1], audioActivated), props.onWrite(element[1])]
                })
                document.getElementById('piano').appendChild(temp)
            })
        }               
    }, [window.innerWidth])


    return (
        <>
            <label>Son du piano</label> 
            <input type="checkbox" checked={audioActivated} onChange={(e => setAudioActivated(e.target.checked))} />
            <ul className="set" id="piano">
                {
                // c = do, d = RÉ, e = MI, f = FA, g = SOL, a = LA , b = SI
                }
            </ul>

            {notation.forEach(element => {
                return (<audio id={element[1]} src={"../dist/music/piano/"+element[2]}></audio>)
            })}
        </>
    );
};

export default PianoMaster;