document.querySelector(".control-buttons span").onclick = function () { 

    let yourName = prompt("Whats your name?");

    if (yourName==null || yourName=="") {

        document.querySelector(".name span").innerHTML='Unkown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    
    document.querySelector(".control-buttons").remove();
    document.getElementById('start').play();
}

let duration =1000;

let blockscontainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockscontainer.children);


// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);


//add order css property to game blocks
blocks.forEach((block, index) => {

    block.style .order = orderRange[index];

    //add click event
    block.addEventListener('click', function(){

        //trigger the flip block function
        flipBlock(block);

    });

});



//flip block function

function flipBlock (selectedBlock) {

    // add class is-flipped
    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(filippBlock => filippBlock.classList.contains('is-flipped'));

    //if theres two selected blocks
    if (allFlippedBlocks.length === 2){

        // console.log('two flipped blocks selected');

        //stop clicking function
        stopclicking();

        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        

    }

}

function stopclicking() {

    //add classno clicking on main container
    blockscontainer.classList.add('no-clicking');

    setTimeout(() => {
        
        //remove class no clicking on main container
        blockscontainer.classList.remove('no-clicking');


    }, duration);
}

//check matching block
function checkMatchedBlocks(firstblock, secondblock){
    let triesElement = document.querySelector('.tries span');

    if(firstblock.dataset.technology === secondblock.dataset.technology){
        
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');
        
        firstblock.classList.add('has-match');
        secondblock.classList.add('has-match');

        document.getElementById('success').play();

    }else {
        triesElement.innerHTML= parseInt(triesElement.innerHTML) + 1;
       
        setTimeout(() => {
            firstblock.classList.remove('is-flipped');
            secondblock.classList.remove('is-flipped');
        },duration);

        document.getElementById('fail').play();
       
    }
}







//shuffle function

function shuffle(array) {
    //settings vars
    let current = array.length , temp , random;

    while(current>0) {
        //Get random number
        random = Math.floor(Math.random() * current);

        //Decrease lenght by one
        current--;

        //[1] save current element in stash
        temp = array[current];
        //[2] current element = random element
        array[current] = array[random];
        //[3] random element = get element from stash
        array[random] = temp;
    }

return array;
}





