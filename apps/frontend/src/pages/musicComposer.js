import React, { useState, useEffect } from "react"
import Header from "../component/layout/header"
import Menu from "../component/layout/menu"
import { useParams } from "react-router-dom"
import { Vex, Stave, StaveNote, Formatter, Accidental } from "vexflow"
import PianoKeyboard from "../component/piano/piano"
import { uuid } from "@cpnv/functions"

const MusicComposer = () => {
  const [titleCompose, setTitleCompose] = useState("Titre par défaut")
  let { uuidCustom } = useParams();

  let sheet = {
    sol: undefined,
    fa: undefined,
  }

  let notes = {
    sol: [],
    fa: [],
  }

  const staveWidth = 230
  const staveHeight = 120

  let rendererHeight = 1000
  // Récupérez un objet VexFlow
  const VF = Vex.Flow

  const sendDataToApi = async () => {
    if (notes.sol.length > 0 || notes.fa.length > 0) {
      const tempUuid = uuidCustom || uuid()
      uuidCustom = tempUuid
      const flatNotes = getNotesInfo(notes)

      console.log(tempUuid)
      fetch(`http://localhost:3000/temp/music-sheets/${tempUuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sheet: flatNotes }),
      })
        .then((response) => response.json)
        .catch((error) => console.error(error))
    }
  }

  const getDataFormApi = async () => {
    const uuid = uuidCustom;

    fetch(`http://localhost:3000/temp/music-sheets/${uuid}`)
      .then((response) => response.json())
      .then((data) => {

        const res = JSON.parse(data)
        console.log(res)

        data.forEach((note) => {
          addNote(note.note, note.octave, note.duration)
        })
      })
      .catch((error) => console.error(error))
  }

  const getNotesInfo = () => {
    let notesInfo = {
      sol: [],
      fa: [],
    }
    notes.sol.forEach((solRow) => {
      let solRowInfo = []
      solRow.forEach((note) => {
        if (note instanceof Vex.Flow.GhostNote) {
          solRowInfo.push({
            note: null,
            octave: null,
            duration: null,
          })
        } else if (!note.isRest()) {
          solRowInfo.push({
            note: note.getKeys()[0].split("/")[0],
            octave: note.getKeys()[0].split("/")[1],
            duration: note.getDuration(),
          })
        }
      })
      notesInfo.sol.push(solRowInfo)
    })
    notes.fa.forEach((faRow) => {
      let faRowInfo = []
      faRow.forEach((note) => {
        if (note instanceof Vex.Flow.GhostNote) {
          faRowInfo.push({
            note: null,
            octave: null,
            duration: null,
          })
        } else if (!note.isRest()) {
          faRowInfo.push({
            note: note.getKeys()[0].split("/")[0],
            octave: note.getKeys()[0].split("/")[1],
            duration: note.getDuration(),
          })
        }
      })
      notesInfo.fa.push(faRowInfo)
    })
    return notesInfo
  }

  const addNote = (note, octave, duration) => {
    let emptyGhostNote = new Vex.Flow.GhostNote({ duration: duration })

    if (notes.sol.length === 0) notes.sol.push([])
    if (notes.fa.length === 0) notes.fa.push([])

    if (notes.sol[notes.sol.length - 1].length >= 4) {
      notes.sol[notes.sol.length] = []
    }
    if (notes.fa[notes.fa.length - 1].length >= 4) {
      notes.fa[notes.fa.length] = []
    }

    if (octave >= 4) {
      if (note.includes("#"))
        notes.sol[notes.sol.length - 1].push(
          new StaveNote({ clef: "treble", keys: [`${note}/${octave}`], duration: duration }).addModifier(
            new Accidental("#")
          )
        )
      else
        notes.sol[notes.sol.length - 1].push(
          new StaveNote({ clef: "treble", keys: [`${note}/${octave}`], duration: duration })
        )
      notes.fa[notes.fa.length - 1].push(emptyGhostNote)
    } else {
      if (note.includes("#"))
        notes.fa[notes.fa.length - 1].push(
          new StaveNote({ clef: "bass", keys: [`${note}/${octave}`], duration: duration }).addModifier(
            new Accidental("#")
          )
        )
      else
        notes.fa[notes.fa.length - 1].push(
          new StaveNote({ clef: "bass", keys: [`${note}/${octave}`], duration: duration })
        )
      notes.sol[notes.sol.length - 1].push(emptyGhostNote)
    }
    createPianoPartition()
  }

  const renderPianoPartition = () => {
    // Définissez une variable pour stocker la largeur maximale de l'écran
    // en utilisant la largeur de la mesure et la largeur de l'écran
    let myNode = document.getElementById("musicComposer__sheet")
    if (myNode) {
      myNode.innerHTML = ""
    }

    const renderer = new VF.Renderer(myNode, VF.Renderer.Backends.SVG)
    // Configure the rendering context
    // Utilisez la largeur de la fenêtre pour spécifier la largeur du renderer
    renderer.resize(window.innerWidth - 20, rendererHeight)

    const context = renderer.getContext()

    context.setFont("Arial", 20)

    return context
  }

  const setupPianoPartition = () => {
    let context = renderPianoPartition()
    sheet.sol = []
    sheet.fa = []

    sheet.sol.push({ stave: new Stave(0, 0, 230) })
    sheet.sol[0].stave.addClef("treble")
    sheet.sol[0].stave.addTimeSignature("4/4")
    sheet.sol[0].stave.setContext(context).draw()

    sheet.fa.push({ stave: new Stave(0, 100, 230) })
    sheet.fa[0].stave.addClef("bass")
    sheet.fa[0].stave.addTimeSignature("4/4")
    sheet.fa[0].stave.setContext(context).draw()
  }

  const createPianoPartition = () => {
    sheet.sol = []
    sheet.fa = []
    const divMusicSheet = document.getElementById("musicComposer__sheet")
    const maxStaveInWindow = Math.floor(divMusicSheet.clientWidth / staveWidth)

    let numberStaveFa = 0
    let numberStaveSol = 0

    // Définissez une variable pour stocker la largeur maximale de l'écran
    // en utilisant la largeur de la mesure et la largeur de l'écran
    if (divMusicSheet) {
      divMusicSheet.innerHTML = ""
    }

    const renderer = new VF.Renderer(divMusicSheet, VF.Renderer.Backends.SVG)
    // Configure the rendering context
    // Utilisez la largeur de la fenêtre pour spécifier la largeur du renderer
    renderer.resize(window.innerWidth - 20, rendererHeight)

    const context = renderer.getContext()
    context.setFont("Arial", 20)
    if (sheet.sol.length === 0 && sheet.fa.length === 0) {
      sheet.sol.push({ stave: new Stave(0, 0, 230) })
      sheet.sol[0].stave.addClef("treble")
      sheet.sol[0].stave.addTimeSignature("4/4")
      sheet.sol[0].stave.setContext(context).draw()
      numberStaveSol++

      sheet.fa.push({ stave: new Stave(0, 100, 230) })
      sheet.fa[0].stave.addClef("bass")
      sheet.fa[0].stave.addTimeSignature("4/4")
      sheet.fa[0].stave.setContext(context).draw()
      numberStaveFa++
    }
    notes.sol.map((noteInAMeasure) => {
      Formatter.FormatAndDraw(context, sheet.sol[sheet.sol.length - 1].stave, noteInAMeasure)
      if (noteInAMeasure.length > 3) {
        if (numberStaveSol < maxStaveInWindow) {
          sheet.sol.push({
            stave: new Stave(
              sheet.sol[sheet.sol.length - 1].stave.getX() + staveWidth,
              sheet.sol[sheet.sol.length - 1].stave.getY(),
              staveWidth
            ),
          })
          numberStaveSol++
        } else {
          sheet.sol.push({
            stave: new Stave(0, sheet.sol[sheet.sol.length - 1].stave.getY() + (staveHeight + staveHeight), staveWidth),
          })
          numberStaveSol = 1
        }
        sheet.sol[sheet.sol.length - 1].stave.setContext(context).draw()
      }
    })
    notes.fa.map((noteInAMeasure) => {
      Formatter.FormatAndDraw(context, sheet.fa[sheet.fa.length - 1].stave, noteInAMeasure)
      if (noteInAMeasure.length > 3) {
        if (numberStaveFa < maxStaveInWindow) {
          sheet.fa.push({
            stave: new Stave(
              sheet.fa[sheet.fa.length - 1].stave.getX() + staveWidth,
              sheet.fa[sheet.fa.length - 1].stave.getY(),
              staveWidth
            ),
          })
          numberStaveFa++
        } else {
          sheet.fa.push({
            stave: new Stave(0, sheet.fa[sheet.fa.length - 1].stave.getY() + (staveHeight + staveHeight), staveWidth),
          })
          numberStaveFa = 1
        }
        sheet.fa[sheet.fa.length - 1].stave.setContext(context).draw()
      }
    })

    sendDataToApi()
  }

  // Utilisez la fonction useEffect pour ajouter un gestionnaire d'événement pour détecter les changements de la taille de la fenêtre
  useEffect(() => {
    uuidCustom && getDataFormApi();
    setupPianoPartition()
    // Ajoutez un gestionnaire d'événement qui exécute la fonction showStave lorsque la taille de la fenêtre change
    window.addEventListener("resize", () => createPianoPartition())
    // Retourne une fonction qui est exécutée lorsque l'effet est nettoyé (par exemple, lorsque le composant est démonté)
    // Cette fonction sert à nettoyer les gestionnaires d'événement ajoutés par l'effet
    return () => {
      sendDataToApi()
      window.removeEventListener("resize", () => {
        createPianoPartition()
      })
    }
  }, [uuidCustom]) // Le deuxième argument de la fonction useEffect (ici un tableau vide) spécifie quand l'effet doit être exécuté

  return (
    <>
      <Header />
      <main className="musicComposer">
        <div className="musicComposer__title">
          <h2 contentEditable onChange={(e) => setTitleCompose(e.target.name)} suppressContentEditableWarning={true}>
            {titleCompose}
          </h2>
        </div>

        <div id="musicComposer__sheet" className="musicComposer__sheet"></div>
        <div className="musicComposer_piano">
          <PianoKeyboard onAddNote={addNote} />
        </div>
      </main>
      <Menu />
    </>
  )
}

export default MusicComposer
