class Animation{
    static showLines(){
        const lines = document.getElementsByTagName('svg');
        lines[0].style.display = "inherit"
    }
    static showGameTable(){
        const gameTable = document.getElementsByClassName('game-table');
        gameTable[0].style.transition = "all 3s"
        gameTable[0].style.display = "inherit"
    }
    static animateScores(gameScore){
        gameScore[0].style.transition = "3s";
        gameScore[1].style.transition =  "3s";

        gameScore[0].style.transitionDelay = "4s";
        gameScore[1].style.transitionDelay =  "4s";

        gameScore[0].style.opacity = 1;
        gameScore[1].style.opacity = 1;
    }
    static animateUndoButton(undoButton){
        undoButton.style.transition =  "3s";
        undoButton.style.transitionDelay =  "4s";
        undoButton.style.opacity = 1;
    }
    static setBoardTableTransition(gameTable, time, i, j){
        gameTable[0].children[i].children[j].style.transition = "all " + time + "s";
    }
    static setChoicesTransition(items, i, j){
        items[i].children[j].style.transition = "all 0.5s";
    }
    static delayInsertingImages(DOM_img, line, column){    
        if(line === 0) DOM_img.style.transitionDelay = 0.5 + column/5 + 's';
        if(line === 1) DOM_img.style.transitionDelay = 2.0 + column/5 + 's';
        if(line === 6) DOM_img.style.transitionDelay = 2.0 + column/5 + 's';
        if(line === 7) DOM_img.style.transitionDelay = 0.5 + column/5 + 's';
      }
    static animateImages(DOM_img, line, column){
        //flushes all pending style changes and forces the layout engine to compute the element's current state, 
        DOM_img.getBoundingClientRect()

        DOM_img.style.transform = "translateY(+125px)";
        DOM_img.style.opacity = 1;
    }
    static setImageTransition(DOM_img){
        DOM_img.style.transition = 'all 0.2s ease';
    }
}