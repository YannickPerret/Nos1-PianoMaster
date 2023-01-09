import React, { useState, useEffect } from 'react';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import { Vex, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import PianoKeyboard from '../component/piano/piano';

const MusicComposer = () => {
    const [titleCompose, setTitleCompose] = useState('Titre par défaut')

    // Utilisez l'état local pour enregistrer les informations sur les notes
    const [notes, setNotes] = useState([]);

    const [sheet, setSheet] = useState({
        'sol':
            [],
        'fa':
            [],
    })

    const staveWidth = 180;

    // Ajoutez une variable pour stocker le numéro de ligne actuel des mesures
    let currentLine = 0;

    let rendererHeight = 300;

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

          // Itérez sur les portées de l'objet "sheet" et dessinez-les
 /* Iterating over the sheet object and drawing the staves and notes. */
        for (const [test, stave] of Object.entries(sheet)) {
            console.log(stave)
            stave.forEach(element => {
            element.stave.setContext(context).draw();
            
            });

           

            //Formatter.FormatAndDraw(context, element.stave, element.notes);
        }
    }

    const writeMusic = (_key = null) => {
        // Définissez une variable pour stocker la largeur maximale de l'écran
        // en utilisant la largeur de la mesure et la largeur de l'écran
        const maxScreenWidth = Math.floor(currentWindowWidth / staveWidth);

        // Si le tableau de notes est vide, ajoutez une mesure
        if(sheet.sol.length === 0 && sheet.fa.length === 0){
        //if (measures.length === 0) {

            sheet.sol.push({ stave: new Stave(0, 0, staveWidth), notes: [] })
            sheet.sol[0].stave.addClef("treble");
            sheet.sol[0].stave.addTimeSignature('4/4');

            sheet.fa.push({ stave: new Stave(0, 100, staveWidth), notes: [] })
            sheet.fa[0].stave.addClef("bass");
            sheet.fa[0].stave.addTimeSignature('4/4');

            // Réinitialisez la valeur de la variable currentLine lorsqu'une mesure est ajoutée
            currentLine = 1;
        }

        // Récupérez la dernière mesure du tableau de notes
        //const lastMeasure = measures[measures.length - 1];

        const lastMesureSol = sheet.sol.at(-1)
        const lastMesureFa = sheet.fa.at(-1)

        if(lastMesureSol.notes.length >= 3 || lastMesureFa.notes.length >= 3){
            if (currentLine < maxScreenWidth) {
                sheet.sol.push({ stave: new Stave(lastMesureSol[lastMesureSol.length - 1].stave.getX() + staveWidth, lastMesureSol[lastMesureSol.length - 1].stave.getY(), staveWidth), notes: [] })
                sheet.fa.push({ stave: new Stave(lastMesureFa[lastMesureFa.length - 1].stave.getX() + staveWidth, lastMesureFa[lastMesureFa.length - 1].stave.getY(), staveWidth), notes: [] })

                // Incrémentez la valeur de la variable currentLine lorsqu'une mesure est ajoutée
                currentLine++;
            } else {
                // Si le tableau de notes a atteint la largeur maximale de l'écran,
                // ajoutez une mesure en dessous de la dernière mesure et réinitialisez
                // la position en X de la mesure pour qu'elle recommence au début de l'écran
                sheet.sol.push({ stave: new Stave(0, lastMesureSol[lastMesureSol.length - 1].stave.getY() + 300, staveWidth), notes: [] })
                sheet.fa.push({ stave: new Stave(0, lastMesureFa[lastMesureFa.length - 1].stave.getY() + 300, staveWidth), notes: [] })

                rendererHeight += 100;
                currentLine = 1;
            }
        }

        if (_key !== null) {
            // Ajoutez la nouvelle note à la dernière mesure du tableau en utilisant une boucle for
            for (let i = 0; i < 1; i++) {
                if(_key.match(/\d+/g) < 4){
                    if (_key.includes("#")) {
                        sheet.fa.at(-1).notes.push(new StaveNote({keys: [_key], duration: 'q'}).addModifier(new Accidental("#")));
                    }
                    else{
                        sheet.fa.at(-1).notes.push(new StaveNote({ keys: [_key], duration: "q" }));
                    }
                }
                else{
                    if (_key.includes("#")) {
                        sheet.sol.at(-1).notes.push(new StaveNote({ keys: [_key], duration: "q" }));
                    }
                    else {
                        sheet.sol.at(-1).notes.push(new StaveNote({keys: [_key], duration: 'q'}).addModifier(new Accidental("#")));
                    }
                }
            }
           //console.log(sheet)
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