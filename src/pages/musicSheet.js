import React, { useEffect, useState } from 'react';
import { useMatch} from 'react-router-dom';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import dataSheetUser from '../helpers/personnalSheet.json';
import dataSheet from '../helpers/sheets.json';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import MusicAudio from '../component/sheets/musicAudio';

//https://github.com/forthealllight/react-read-pdf
const MusicSheet = () => {

    let idSheet =  useMatch('musicSheet/:idSheet').params.idSheet;
    const [sheet, setSheet] = useState({});
    const [currentPageNumber, setcurrentPageNumber] = useState(1);
    const [isLoading, setIsloading] = useState(false);
    const [audioActivated, setAudioActivated] = useState(true)

    const options = {
        cMapPacked: true,
    };

    useEffect(()=> {
        let temps = {};
        dataSheet.map(sheetInfo => {
            if(sheetInfo.id === Number(idSheet)){
                dataSheetUser.map(userSheetList => {
                    userSheetList.sheet.map(personnalSheet =>{
                        if(personnalSheet.sheetId === Number(idSheet)){
                            temps = {...sheetInfo, ...personnalSheet}
                        }
                    })
                })
                
            }
        })
        setSheet({...temps})
        
    },[])

    return (
        <>
            <Header />
            {sheet ?
            <main className='musicSheet'>
                <div className='musicSheet__header'>
                    <h1>{sheet.title}</h1>
                    <ul className='musicSheet__header__info'>
                        <li>Auteur : {sheet.autor}</li>
                        <li>Genre : {sheet.genre}</li>
                        <li>Date : {sheet.date}</li>
                        <li>Audio : <input type="checkbox" checked={audioActivated} onChange={(e => setAudioActivated(e.target.checked))} /></li>
                    </ul>
                </div>

                <div className='musicSheet__body'>

                    {window.innerWidth >= 1200 ? 
                    <object type="application/pdf"
                        data={'../dist/sheets/'+sheet.sheetLocationName+'#toolbar=0&#view=fitH'}
                        width="100%"
                        height="100%">
                        <p>It appears you don't have Adobe Reader or PDF support in this web browser</p>
                    </object> 
                    : 
                    <Document className={'pdfViewer'} file={'../dist/sheets/'+sheet.sheetLocationName} onLoadSuccess={(e => [setcurrentPageNumber(e.numPages), setIsloading(false)])} options={options}> 
                    {!isLoading &&
                        Array.from(new Array(currentPageNumber), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>}
                    <MusicAudio file={"../dist/music/"+sheet.audioLocalName} isActivated={audioActivated} />
                </div>
            </main>
            : null}
            <Menu />
        </>
        
        
    );
};

export default MusicSheet;