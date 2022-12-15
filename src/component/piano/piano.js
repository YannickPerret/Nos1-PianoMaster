import React, { useState, useMemo } from 'react';


const PianoMaster = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);
    const notation = [
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
        ["white f", "b/4", "b4.mp3"],
    ];

    // Utilisez la fonction useMemo pour mémoriser le résultat de la fonction map()
    const pianoKeys = useMemo(() => {

        return notation.map(element => {
            return (
                <li key={element[0]} className={element[0]} onClick={() => {
                    props.onWrite(element[1]),
                    // Seulement jouer le son si audioActivated est true
                    audioActivated && new Audio('../dist/music/piano/' + element[2]).play()
                }}>
                </li>
            )
        });
    }, [notation, audioActivated]);
    // c = do, d = RÉ, e = MI, f = FA, g = SOL, a = LA , b = SI

    return (
        <>
            <label>Son du piano</label>
            <input type="checkbox" checked={audioActivated} onChange={(e => setAudioActivated(e.target.checked))} />
            <ul className="set" id="piano">
                {pianoKeys}
            </ul>
        </>
    );
};
export default PianoMaster;