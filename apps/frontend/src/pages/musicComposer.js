import React, { useState, useEffect } from 'react';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import { Vex, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import PianoKeyboard from '../component/piano/piano';

const MusicComposer = () => {
    const [titleCompose, setTitleCompose] = useState('Titre par défaut')

    let sheet = {
        'sol':undefined,
        'fa':undefined,
    }
    let notes = {
        "sol":[],
        "fa":[],
    };

    const staveWidth = 220;
    const staveHeight = 120;

    let rendererHeight = 1000;
    // Récupérez un objet VexFlow 
    const VF = Vex.Flow;
    
    const addNote = (note, octave, duration) => {

        let emptyGhostNote = new Vex.Flow.GhostNote({duration: duration});

        if(notes.sol.length === 0) notes.sol.push([])
        if(notes.fa.length === 0) notes.fa.push([])

        if(notes.sol[notes.sol.length-1].length >= 4){
            notes.sol[notes.sol.length] = []
        }
        if(notes.fa[notes.fa.length-1].length >= 4){
            notes.fa[notes.fa.length] = []
        }

        if(octave >= 4){
            if (note.includes("#")) 
                notes.sol[notes.sol.length-1].push(new StaveNote({clef: "treble", keys: [`${note}/${octave}`], duration: duration }).addModifier(new Accidental("#")));
            else
                notes.sol[notes.sol.length-1].push(new StaveNote({clef: "treble", keys: [`${note}/${octave}`], duration: duration }));
            notes.fa[notes.fa.length-1].push(emptyGhostNote);
        }

        else{
            if (note.includes("#")) 
                notes.fa[notes.fa.length-1].push(new StaveNote({clef: "bass", keys: [`${note}/${octave}`], duration: duration }).addModifier(new Accidental("#")));
            else
                notes.fa[notes.fa.length-1].push(new StaveNote({clef: "bass", keys: [`${note}/${octave}`], duration: duration }));
            notes.sol[notes.sol.length-1].push(emptyGhostNote);
        }
        createPianoPartition();
    } 

    const renderPianoPartition = () => {
        // Définissez une variable pour stocker la largeur maximale de l'écran
        // en utilisant la largeur de la mesure et la largeur de l'écran
        let myNode = document.getElementById("musicComposer__sheet");
        if(myNode){
            myNode.innerHTML = ""
        }
        
        const renderer = new VF.Renderer(myNode, VF.Renderer.Backends.SVG);
        // Configure the rendering context
        // Utilisez la largeur de la fenêtre pour spécifier la largeur du renderer
        renderer.resize(window.innerWidth - 20, rendererHeight);

        const context = renderer.getContext();

        context.setFont("Arial", 20);

        return context
    }


    const setupPianoPartition = () => {
        
        let context = renderPianoPartition()

        sheet.sol.push({ stave: new Stave(0, 0, 380)})
        sheet.sol[0].stave.addClef("treble");
        sheet.sol[0].stave.addTimeSignature('4/4');
        sheet.sol[0].stave.setContext(context).draw();

        sheet.fa.push({ stave: new Stave(0, 100, 180)})
        sheet.fa[0].stave.addClef("bass");
        sheet.fa[0].stave.addTimeSignature('4/4');
        sheet.fa[0].stave.setContext(context).draw();
    }

    const createPianoPartition = () => {  
        sheet.sol=[]
        sheet.fa=[]
        const maxStaveInWindow = Math.floor(window.innerWidth / staveWidth);

        let numberStaveFa = 0
        let numberStaveSol = 0

        // Définissez une variable pour stocker la largeur maximale de l'écran
        // en utilisant la largeur de la mesure et la largeur de l'écran
        let myNode = document.getElementById("musicComposer__sheet");
        if(myNode){
            myNode.innerHTML = ""
        }
        
        const renderer = new VF.Renderer(myNode, VF.Renderer.Backends.SVG);
        // Configure the rendering context
        // Utilisez la largeur de la fenêtre pour spécifier la largeur du renderer
        renderer.resize(window.innerWidth - 20, rendererHeight);

        let context = renderer.getContext();
        context.setFont("Arial", 20);

        sheet.sol.push({ stave: new Stave(0, 0, 220)})
        sheet.sol[0].stave.addClef("treble");
        sheet.sol[0].stave.addTimeSignature('4/4');
        sheet.sol[0].stave.setContext(context).draw();

        numberStaveSol++

        sheet.fa.push({ stave: new Stave(0, 100, 220)})
        sheet.fa[0].stave.addClef("bass");
        sheet.fa[0].stave.addTimeSignature('4/4');
        sheet.fa[0].stave.setContext(context).draw();

        numberStaveFa++


        notes.sol.map((noteInMeasure) => {

            Formatter.FormatAndDraw(context, sheet.sol[sheet.sol.length-1].stave, noteInMeasure);

            if(noteInMeasure.length > 3){
                if (numberStaveSol < maxStaveInWindow) 
                {
                    sheet.sol.push({ stave: new Stave(sheet.sol[sheet.sol.length-1].stave.getX() + staveWidth, sheet.sol[sheet.sol.length-1].stave.getY(), staveWidth) })
                    numberStaveSol++
                }
                else
                {
                    sheet.sol.push({ stave: new Stave(0, sheet.sol[sheet.sol.length-1].stave.getY() + (staveHeight + staveHeight), staveWidth) })
                    numberStaveSol = 0;
                }
                sheet.sol[sheet.sol.length-1].stave.setContext(context).draw();
            }
        })

        notes.fa.map((noteInMeasure) => {

            Formatter.FormatAndDraw(context, sheet.fa[sheet.fa.length-1].stave, noteInMeasure);

            if(noteInMeasure.length > 3)
            {
                if (numberStaveFa < maxStaveInWindow) 
                {
                    sheet.fa.push({ stave: new Stave(sheet.fa[sheet.fa.length-1].stave.getX() + staveWidth, sheet.fa[sheet.fa.length-1].stave.getY(), staveWidth) })
                    numberStaveFa++
                }
                else
                {
                    sheet.fa.push({ stave: new Stave(0, sheet.fa[sheet.fa.length-1].stave.getY() + (staveHeight + staveHeight), staveWidth) })
                    numberStaveFa = 0;
                }
                sheet.fa[sheet.fa.length-1].stave.setContext(context).draw();
            }
        })
    };  


// Utilisez la fonction useEffect pour ajouter un gestionnaire d'événement pour détecter les changements de la taille de la fenêtre
useEffect(() => {
    // Ajoutez un gestionnaire d'événement qui exécute la fonction showStave lorsque la taille de la fenêtre change
    window.addEventListener('resize', () => createPianoPartition());

    // Retourne une fonction qui est exécutée lorsque l'effet est nettoyé (par exemple, lorsque le composant est démonté)
    // Cette fonction sert à nettoyer les gestionnaires d'événement ajoutés par l'effet
    return () => {
       window.removeEventListener('resize', () => { createPianoPartition() });
    }
}, []); // Le deuxième argument de la fonction useEffect (ici un tableau vide) spécifie quand l'effet doit être exécuté


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
                <PianoKeyboard onAddNote={addNote} />
            </div>
        </main>
        <Menu />
    </>

);
};

export default MusicComposer;