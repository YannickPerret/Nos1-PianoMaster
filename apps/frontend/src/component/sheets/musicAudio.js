import React from 'react';

const MusicAudio = (props) => {
    return (
        props.isActivated &&
            <audio controls src={props.file} type='audio/mp3' />
           
    );
};

export default MusicAudio;