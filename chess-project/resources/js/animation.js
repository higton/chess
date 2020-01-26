class Animation{
    static hideStartPage(){
        const startPage = document.getElementsByClassName('start-page');
        const title = document.getElementById("title");

        startPage[0].style.transition = "all 1s"
        startPage[1].style.transition = "all 1s"

        title.style.display = "none"
        /* hide swords */
        startPage[0].style.opacity = 0
        /* hide pieces */
        startPage[1].style.opacity = 0
    }
    static showLines(){
        const boardLines = document.getElementsByClassName('board');
        boardLines[0].children[0].classList.add("animate")

        const lines = document.getElementsByClassName('line');
        for(let i=0; i<=13; i++){
            lines[0].children[i].classList.add('animate')
        }
        for(let i=0; i<=13; i++){
            setTimeout(function(){
                lines[0].children[i].classList.remove('animate') }, 3700);
        }
        debugger
    }
    static showGameTable(){
        const gameTable = document.getElementsByClassName('game-table');
        gameTable[0].classList.add("animate")
        setTimeout(function(){
            gameTable[0].classList.remove("animate") }, 3000);}
    static showScores(){
        const gameScore = document.getElementsByClassName('game-score');
        gameScore[0].classList.add("animate")
        gameScore[1].classList.add("animate")
        setTimeout(function(){
            gameScore[0].classList.add("setFont")
            gameScore[0].classList.remove("animate") }, 3700);
        setTimeout(function(){
            gameScore[1].classList.add("setFont")
            gameScore[1].classList.remove("animate") }, 3700);
    }
    static animateUndoButton(undoButton){
        undoButton.classList.add("animate")
        setTimeout(function(){
            undoButton[0].classList.remove("animate") }, 3000);
    }
    static setBoardTableTransition(gameTable, time, i, j){
        gameTable[0].children[i].children[j].style.transition = "all " + time + "s";
        setTimeout(function(){
            gameTable[0].children[i].children[j].style.transition = "all 0s"}, 3000);
    }
    static delayInsertingImages(DOM_img, line, column){    
        if(line === 0) DOM_img.style.transitionDelay = 0.5 + column/5 + 's';
        if(line === 1) DOM_img.style.transitionDelay = 2.0 + column/5 + 's';
        if(line === 6) DOM_img.style.transitionDelay = 2.0 + column/5 + 's';
        if(line === 7) DOM_img.style.transitionDelay = 0.5 + column/5 + 's';
        setTimeout(function(){
            DOM_img.style.transitionDelay = '0s'}, 3000);
      }
    static animateImages(DOM_img, line, column){
        //flushes all pending style changes and forces the layout engine to compute the element's current state, 
        DOM_img.getBoundingClientRect()

        DOM_img.style.transform = "translateY(+275px)";

        DOM_img.style.opacity = 1;
    }
    static setImageTransition(DOM_img){
        DOM_img.style.transition = 'all 0.2s ease';
    }
}