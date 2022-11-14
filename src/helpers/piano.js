export class Piano {
    constructor($option){
        
    }

    static play = ($note, $isAudioEnabled) => {

        console.log($note);
        const audio=document.getElementById($note);
        if(audio && $isAudioEnabled){
            audio.currentTime=0;
            audio.play();
        }
    }

   

}




