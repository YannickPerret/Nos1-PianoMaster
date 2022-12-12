import React from 'react';
import { Link } from 'react-router-dom';
import dataSheetUser from '../../helpers/personnalSheet.json';
import dataSheet from '../../helpers/sheets.json';

const CurrentPartition = (props) => {
    return (
        <div className="currentProgress">
        <h2 className="currentProgress__title">Suivis de partitions</h2>

        <table>
            <thead>
                <tr>
                    <th>Nom de la partition</th>
                    <th>Progression</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataSheetUser.map(element => {
                    if (element.userId === props.userId)
                    {
                        return element.sheet.map(sheetUser => {
                            return dataSheet.map(sheet => {
                                if(sheet.id === sheetUser.sheetId){
                                    return  <tr key={sheetUser.id}>
                                                <th>{sheet.title}</th>
                                                <th>{sheetUser.purcent}%</th>
                                                <th><Link to={'musicSheet/'+sheetUser.sheetId}>Consulter</Link></th>
                                            </tr>
                                }
                            })
                        })
                    }   
                })}
            </tbody>
        </table>
    </div>
    );
};

export default CurrentPartition;