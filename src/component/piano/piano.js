import React, { useEffect, useState } from 'react';

const Piano = (props) => {

    const setParentKeyDown = (_key) => {
        if(_key)
            return props.onWrite(_key)
        return null
    }
    
    return (
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
    );
};

export default Piano;