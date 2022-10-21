import React from 'react';

const CurrentPartition = () => {
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
                <tr>
                    <th>Rivers flow in you</th><th>50%</th><th><a href="#">Consulter</a></th>
                </tr>
                <tr>
                    <th>Arabesque N°2</th><th>20%</th><th><a href="#">Consulter</a></th>
                </tr>
                <tr>
                    <th>Pirate des Caraïbes</th><th>78%</th><th><a href="#">Consulter</a></th>
                </tr>
                <tr>
                    <th>La valse d'Amélie</th><th>98%</th><th><a href="#">Consulter</a></th>
                </tr>
            </tbody>
        </table>
    </div>
    );
};

export default CurrentPartition;