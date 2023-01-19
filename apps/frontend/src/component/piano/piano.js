import React, { useState, useMemo, useEffect } from 'react';
import { WebMidi } from 'webmidi';



const PianoMaster = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);
    const notation=[
        {note: 'c', octave: '2', name: 'white e'},
        {note: 'c#', octave: '2', name: 'black ds'},
        {note: 'd', octave: '2', name: 'white d'},
        {note: 'd#', octave: '2', name: 'black cs'},
        {note: 'e', octave: '2', name: 'white c'},
        {note: 'f', octave: '2', name: 'white d'},
        {note: 'f#', octave: '2', name: 'black as'},
        {note: 'g', octave: '2', name: 'white a'},
        {note: 'g#', octave: '2', name: 'black gs'},
        {note: 'a', octave: '2', name: 'white g'},
        {note: 'a#', octave: '2', name: 'black fs'},
        {note: 'b', octave: '2', name: 'white f'},
        
        {note: 'c', octave: '3', name: 'white e'},
        {note: 'c#', octave: '3', name: 'black ds'},
        {note: 'd', octave: '3', name: 'white d'},
        {note: 'd#', octave: '3', name: 'black cs'},
        {note: 'e', octave: '3', name: 'white c'},
        {note: 'f', octave: '3', name: 'white d'},
        {note: 'f#', octave: '3', name: 'black as'},
        {note: 'g', octave: '3', name: 'white a'},
        {note: 'g#', octave: '3', name: 'black gs'},
        {note: 'a', octave: '3', name: 'white g'},
        {note: 'a#', octave: '3', name: 'black fs'},
        {note: 'b', octave: '3', name: 'white f'},

        {note: 'c', octave: '4', name: 'white e'},
        {note: 'c#', octave: '4', name: 'black ds'},
        {note: 'd', octave: '4', name: 'white d'},
        {note: 'd#', octave: '4', name: 'black cs'},
        {note: 'e', octave: '4', name: 'white c'},
        {note: 'f', octave: '4', name: 'white d'},
        {note: 'f#', octave: '4', name: 'black as'},
        {note: 'g', octave: '4', name: 'white a'},
        {note: 'g#', octave: '4', name: 'black gs'},
        {note: 'a', octave: '4', name: 'white g'},
        {note: 'a#', octave: '4', name: 'black fs'},
        {note: 'b', octave: '4', name: 'white f'},

        {note: 'c', octave: '5', name: 'white e'},
        {note: 'c#', octave: '5', name: 'black ds'},
        {note: 'd', octave: '5', name: 'white d'},
        {note: 'd#', octave: '5', name: 'black cs'},
        {note: 'e', octave: '5', name: 'white c'},
        {note: 'f', octave: '5', name: 'white d'},
        {note: 'f#', octave: '5', name: 'black as'},
        {note: 'g', octave: '5', name: 'white a'},
        {note: 'g#', octave: '5', name: 'black gs'},
        {note: 'a', octave: '5', name: 'white g'},
        {note: 'a#', octave: '5', name: 'black fs'},
        {note: 'b', octave: '5', name: 'white f'},
    ]

    
    const [midiInput, setMidiInput] = useState(null);
    const [midiAllInput, setMidiAllInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Utilisez la fonction useMemo pour mémoriser le résultat de la fonction map()
    const pianoKeys = useMemo(() => {

        return notation.map((element, index) => {
            return (
                <li key={index} className={element.name} onClick={() => {
                    props.onAddNote(element.note, element.octave, "q"),
                        // Seulement jouer le son si audioActivated est true
                        audioActivated && new Audio('../dist/music/piano/' + `${element.note}${element.octave}.mp3`).play()
                }}>
                </li>
            )
        });
    }, [audioActivated]);
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