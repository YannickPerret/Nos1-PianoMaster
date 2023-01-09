import React, { useState, useMemo, useEffect } from 'react';
import { WebMidi } from 'webmidi';



const PianoMaster = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);
    const notation = [
        ["white e", "c/2", "c4.mp3"],
        ["black ds", "c#/2", "c4D.mp3"],
        ["white d", "d/2", "d4.mp3"],
        ["black cs", "d#/2", "d4D.mp3"],
        ["white c", "e/2", "e4.mp3"],
        ["white b", "f/2", "f4.mp3"],
        ["black as", "f#/2", "f4D.mp3"],
        ["white a", "g/2", "g4.mp3"],
        ["black gs", "g#/2", "g4D.mp3"],
        ["white g", "a/2", "a4.mp3"],
        ["black fs", "a#/2", "a4D.mp3"],
        ["white f", "b/2", "b4.mp3"],

        ["white e", "c/3", "c4.mp3"],
        ["black ds", "c#/3", "c4D.mp3"],
        ["white d", "d/3", "d4.mp3"],
        ["black cs", "d#/3", "d4D.mp3"],
        ["white c", "e/3", "e4.mp3"],
        ["white b", "f/3", "f4.mp3"],
        ["black as", "f#/3", "f4D.mp3"],
        ["white a", "g/3", "g4.mp3"],
        ["black gs", "g#/3", "g4D.mp3"],
        ["white g", "a/3", "a4.mp3"],
        ["black fs", "a#/3", "a4D.mp3"],
        ["white f", "b/3", "b4.mp3"],

        ["white e", "c/4", "c4.mp3"],
        ["black ds", "c#/4", "c4D.mp3"],
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
        
        ["white e", "c/5", "c4.mp3"],
        ["black ds", "c#/5", "c4D.mp3"],
        ["white d", "d/5", "d4.mp3"],
        ["black cs", "d#/5", "d4D.mp3"],
        ["white c", "e/5", "e4.mp3"],
        ["white b", "f/5", "f4.mp3"],
        ["black as", "f#/5", "f4D.mp3"],
        ["white a", "g/5", "g4.mp3"],
        ["black gs", "g#/5", "g4D.mp3"],
        ["white g", "a/5", "a4.mp3"],
        ["black fs", "a#/5", "a4D.mp3"],
        ["white f", "b/5", "b4.mp3"],
        
        ["white e", "c/6", "c4.mp3"],
        ["black ds", "c#/6", "c4D.mp3"],
        ["white d", "d/6", "d4.mp3"],
        ["black cs", "d#/6", "d4D.mp3"],
        ["white c", "e/6", "e4.mp3"],
        ["white b", "f/6", "f4.mp3"],
        ["black as", "f#/6", "f4D.mp3"],
        ["white a", "g/6", "g4.mp3"],
        ["black gs", "g#/6", "g4D.mp3"],
        ["white g", "a/6", "a4.mp3"],
        ["black fs", "a#/6", "a4D.mp3"],
        ["white f", "b/6", "b4.mp3"],
    ];

    const [midiInput, setMidiInput] = useState(null);
    const [midiAllInput, setMidiAllInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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

    useEffect(() => {
        WebMidi.enable((err) => {
            if (err) {
                setErrorMessage('WebMidi could not be enabled. Use Chrome or Edge or Opera');
            } else {

                setMidiAllInput(WebMidi.inputs.map((input, index) => {
                    return (<option key={index} value={index}>{input.name}</option>);
                }));
            }
        });

    }, []);

    useEffect(() => {
        if (midiInput >= 0 && WebMidi.inputs[midiInput]) {
            WebMidi.inputs[midiInput].addListener('noteon', (e => props.onWrite(e.note.name+'/'+e.note.octave)),{ channels: [1, 2, 3] });
        }
    }, [midiInput]);

    return (
        <>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <label>Midi :</label><select onChange={(event) => setMidiInput(event.target.value)}>
                {midiAllInput}
            </select>
            <label>Son du piano</label>
            <input type="checkbox" checked={audioActivated} onChange={(e) => setAudioActivated(e.target.checked)}
            />
            
            <ul className="set" id="piano">
                {pianoKeys}
            </ul>
        </>
    );
};

export default PianoMaster;