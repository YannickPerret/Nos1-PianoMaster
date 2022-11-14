import React, { useState } from 'react';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import { Vex, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import PianoKeyboard from '../component/piano/piano';

const MusicComposer = () => {
    const [titleCompose, setTitleCompose] = useState ('Titre par défaut')

    const [notes, setNotes] = useState([]);

    const staveWidth = 180
    let rendererHeight = 100

    const VF = Vex.Flow;

    const showStave = async () => {
        let div = document.getElementById("musicComposer__sheet");

        div.innerHTML =""

        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        
        // Configure the rendering context
        renderer.resize((window.innerWidth - 20), rendererHeight);
        

        const context = renderer.getContext();
        context.setFont("Arial", 20);

        notes.map((element, index) => {
            // Connect it to the rendering context and draw!
            element.stave.setContext(context).draw();

            // Helper function to justify and draw a 4/4 voice.
            Formatter.FormatAndDraw(context, element.stave, element.notes);
        })
    }

    const writeMusic = (_key) => {

        let tempNote = notes

        if(tempNote.length === 0){
            tempNote.push({stave: new Stave(0, 0 , 180), notes:[]})
            tempNote.at(0).stave.addClef("treble")
        }

        tempNote.at(-1).notes.map((element, index) =>{

            if(index >= 3){
                if((tempNote.length % 2) === 0){
                    tempNote.push({stave: new Stave(0, tempNote.at(-1).stave.getY()+100 , staveWidth), notes:[]})
                    rendererHeight += 100;
                }
                else{
                    tempNote.push({stave: new Stave(tempNote.at(-1).stave.getX() + staveWidth, tempNote.at(-1).stave.getY() , staveWidth), notes:[]})
                }
            }
        })

        if(_key.includes('#')){
            tempNote.at(-1).notes.push(new StaveNote({keys: [_key], duration:"q"}).addModifier(new Accidental("#")))
        }
        else {
            tempNote.at(-1).notes.push(new StaveNote({keys: [_key], duration:"q"}))
        }

        setNotes(tempNote)

        showStave()
    }

    return (
        <>
        <Header />
            <main className='musicComposer'>
                <div className='musicComposer__title'>
                    <h2 contentEditable onChange={(e => setTitleCompose(e.target.name))} suppressContentEditableWarning={true}>{titleCompose}</h2>
                </div>

                <div id="musicComposer__sheet" className='musicComposer__sheet'>

                </div>
                <div className="musicComposer_piano">
                    <PianoKeyboard onWrite={writeMusic} />
                </div>
            </main>
        <Menu />
        </>
        
    );
};

export default MusicComposer;