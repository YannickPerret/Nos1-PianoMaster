import React, { useState, useEffect } from 'react';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import { Vex, Stave, StaveNote, Formatter, Accidental, Stem } from "vexflow";
import PianoKeyboard from '../component/piano/piano';

const MusicComposer = () => {
    const [titleCompose, setTitleCompose] = useState('Titre par défaut')

    // Utilisez l'état local pour enregistrer les informations sur les notes
    const [notes, setNotes] = useState([]);

    const staveWidth = 180;

    // Ajoutez une variable pour stocker le numéro de ligne actuel des mesures
    let currentLine = 0;

    let rendererHeight = 100;

    let currentWindowWidth = window.innerWidth

    // Récupérez un objet VexFlow 
    const VF = Vex.Flow;


    const showStave = () => {
        // Utilisez document.querySelector pour vérifier si l'élément existe
        let div = document.querySelector("#musicComposer__sheet");
        if (div) {
            // Si l'élément existe, définissez son contenu HTML
            div.innerHTML = "";
        }

        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context
        // Utilisez la largeur de la fenêtre pour spécifier la largeur du renderer
        renderer.resize(window.innerWidth - 20, rendererHeight);

        const context = renderer.getContext();
        context.setFont("Arial", 20);


        notes.map((element) => {
            if (element.notes.length > 0) {
                // Connect it to the rendering context and draw!
                element.stave.setContext(context).draw();

                // Helper function to justify and draw a 4/4 voice.
                Formatter.FormatAndDraw(context, element.stave, element.notes);
            }
        })
    }

    const writeMusic = (_key = null) => {
        // Définissez une variable pour stocker la largeur maximale de l'écran
        // en utilisant la largeur de la mesure et la largeur de l'écran
        const maxScreenWidth = Math.floor(currentWindowWidth / staveWidth);

        //créer un tableau de mesures
        let measures = notes;

        // Si le tableau de notes est vide, ajoutez une mesure
        if (measures.length === 0) {
           /* measures.push({ stave: new Stave(0, 0, staveWidth), notes: [] });
            measures[0].stave.addClef("treble");*/

            measures.push({ stave: new Stave(0, 0, staveWidth), notes: [new Stave({keys:'e/3', duration:'q'})] });
            measures[0].stave.addClef('trebble');
            measures[0].stave.keySignature('F');

            // Réinitialisez la valeur de la variable currentLine lorsqu'une mesure est ajoutée
            currentLine = 1;
        }

        // Récupérez la dernière mesure du tableau de notes
        const lastMeasure = measures[measures.length - 1];

        // Si la dernière mesure contient déjà quatre notes,
        // ajoutez une nouvelle mesure si le tableau de notes n'a pas atteint la largeur maximale de l'écran
        if (lastMeasure.notes.length >= 3) {
            // Utilisez la variable currentLine pour vérifier si le tableau de notes a atteint la largeur maximale de l'écran
            if (currentLine < maxScreenWidth) {
                measures.push({ stave: new Stave(measures[measures.length - 1].stave.getX() + staveWidth, measures[measures.length - 1].stave.getY(), staveWidth), notes: [] });
                // Incrémentez la valeur de la variable currentLine lorsqu'une mesure est ajoutée
                currentLine++;
            } else {
                // Si le tableau de notes a atteint la largeur maximale de l'écran,
                // ajoutez une mesure en dessous de la dernière mesure et réinitialisez
                // la position en X de la mesure pour qu'elle recommence au début de l'écran
                measures.push({ stave: new Stave(0, measures[measures.length - 1].stave.getY() + 100, staveWidth), notes: [] });
                rendererHeight += 100;
                currentLine = 1;
            }
        }
        if (_key !== null) {
            // Ajoutez la nouvelle note à la dernière mesure du tableau en utilisant une boucle for
            for (let i = 0; i < 1; i++) {
                if (_key.includes("#")) {
                    // q: 1 temps, 1 = 4 temps, 2 = 2 temps
                    lastMeasure.notes.push(new StaveNote({ keys: [_key], duration: "q"}).addModifier(new Accidental("#")));
                } else {
                    lastMeasure.notes.push(new StaveNote({ keys: [_key], duration: "q" }));
                }
            }
           
            setNotes(measures);
        }
        showStave();
    };

    // Utilisez la fonction useEffect pour ajouter un gestionnaire d'événement pour détecter les changements de la taille de la fenêtre
    useEffect(() => {
        // Ajoutez un gestionnaire d'événement qui exécute la fonction showStave lorsque la taille de la fenêtre change
        window.addEventListener('resize', () => writeMusic());

        // Retourne une fonction qui est exécutée lorsque l'effet est nettoyé (par exemple, lorsque le composant est démonté)
        // Cette fonction sert à nettoyer les gestionnaires d'événement ajoutés par l'effet
        return () => {
            window.removeEventListener('resize', () => { writeMusic() });
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
                    <PianoKeyboard onWrite={writeMusic} />
                </div>
            </main>
            <Menu />
        </>

    );
};

export default MusicComposer;