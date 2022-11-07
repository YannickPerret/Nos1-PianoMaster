import React, { useEffect, useState } from 'react';

const Piano = (props) => {
    const [audioActivated, setAudioActivated] = useState(true);

    const setParentKeyDown = (_key) => {
        if(_key){

            playMusic(_key)
            return props.onWrite(_key)
        }
        return null
    }
    
    // this function will play audio
    const playMusic = (_key) =>{
        const audio=document.getElementById(_key);
        if(audio && audioActivated){
            audio.currentTime=0;
            audio.play();
        }
    }

    return (
        <>
            <label>Son du piano</label> <input type="checkbox" checked={audioActivated} onChange={(e => setAudioActivated(e.target.checked))} />
                <ul className="set">
                {// c = do, d = RÉ, e = MI, f = FA, g = SOL, a = LA , b = SI
                } 
                <li className="white e" onClick={(e => setParentKeyDown("c/4"))}></li>
                <li className="black ds" onClick={(e => setParentKeyDown("c#/4"))}></li>
                <li className="white d" onClick={(e => setParentKeyDown("d/4"))}></li>
                <li className="black cs" onClick={(e => setParentKeyDown("d#/4"))}></li>
                <li className="white c" onClick={(e => setParentKeyDown("e/4"))}></li>

                <li className="white b" onClick={(e => setParentKeyDown("f/4"))}></li>
                <li className="black as" onClick={(e => setParentKeyDown("f/4#"))}></li>
                <li className="white a" onClick={(e => setParentKeyDown("g/4"))}></li>
                <li className="black gs" onClick={(e => setParentKeyDown("g/4#"))}></li>
                <li className="white g" onClick={(e => setParentKeyDown("a/4"))}></li>
                <li className="black fs" onClick={(e => setParentKeyDown("a/4#"))}></li>
                <li className="white f" onClick={(e => setParentKeyDown("b/4"))}></li>

                {window.innerWidth > 390 ?
                    <>
                        <li className="white e" onClick={(e => setParentKeyDown("c/5"))}></li>
                        <li className="black ds" onClick={(e => setParentKeyDown("c#/5"))}></li>
                        <li className="white d" onClick={(e => setParentKeyDown("d/5"))}></li>
                        <li className="black cs" onClick={(e => setParentKeyDown("d#/5"))}></li>
                        <li className="white c" onClick={(e => setParentKeyDown("e/5"))}></li>

                        <li className="white b" onClick={(e => setParentKeyDown("f/5"))}></li>
                        <li className="black as" onClick={(e => setParentKeyDown("f#/5"))}></li>
                        <li className="white a" onClick={(e => setParentKeyDown("g/5"))}></li>
                        <li className="black gs" onClick={(e => setParentKeyDown("g#/5"))}></li>
                        <li className="white g" onClick={(e => setParentKeyDown("a/5"))}></li>
                        <li className="black fs" onClick={(e => setParentKeyDown("a#/5"))}></li>
                        <li className="white f" onClick={(e => setParentKeyDown("b/5"))}></li>
                    </>

                :null}
            </ul>

                
                <audio id="c/4" src="../sounds/piano/c4.mp3"></audio>
                <audio id="c#/4" src="../sounds/piano/c#4.mp3"></audio>
                <audio id="d/4" src="../sounds/piano/d4.mp3"></audio>
                <audio id="d#/4" src="../sounds/piano/d#4.mp3"></audio>
                <audio id="e/4" src="../sounds/piano/e4.mp3"></audio>
                <audio id="f/4" src="../sounds/piano/f4.mp3"></audio>
                <audio id="f/4#" src="../sounds/piano/f#4.mp3"></audio>
                <audio id="g/4" src="../sounds/piano/g4.mp3"></audio>
                <audio id="g/4#" src="../sounds/piano/g#4.mp3"></audio>
                <audio id="a/4" src="../sounds/piano/a4.mp3"></audio>
                <audio id="a/4#" src="../sounds/piano/a#4.mp3"></audio>
                <audio id="b/4" src="../sounds/piano/b4.mp3"></audio>
        </>
 
    );
};

export default Piano;