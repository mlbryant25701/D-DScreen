document.addEventListener('DOMContentLoaded', function() {
    let roundCounter = 1;
    let currentPlayerIndex = -1;
    let monsterCounter = 1;
    let npcCounter = 1;
    const playersAdded = new Set();
    const initiativeList = document.getElementById("initiativeList");

    function updateHighlight() {
        const items = Array.from(initiativeList.querySelectorAll('li'));
        if (items.length === 0) return;

        items.forEach(item => item.classList.remove('highlighted'));

        do {
            currentPlayerIndex = (currentPlayerIndex + items.length) % items.length;
        } while (items[currentPlayerIndex].classList.contains('dead') && items.some(item => !item.classList.contains('dead')));

        items[currentPlayerIndex].classList.add('highlighted');
    }

    function makeItemDraggable(item) {
        item.draggable = true;
        item.ondragstart = (event) => {
            event.dataTransfer.setData("text", event.target.id);
        };
    }

    initiativeList.ondragover = (event) => {
        event.preventDefault();
    };

    initiativeList.ondrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const droppedItem = document.getElementById(data);
        const dropTarget = event.target.closest('li');
        if (dropTarget && dropTarget !== droppedItem) {
            initiativeList.insertBefore(droppedItem, dropTarget);
            
        }
    };

//AI created crap code using the DOM model, so each button has to have it's onclick event added here
/*
    =====
    START 
    =====
    Stupid Code needed for the stupid way AI did this
*/
    // Function to add player by name
    document.getElementById("addPlayer1").onclick = () => {
        playerName = this.getElementById("player1name").innerHTML;
        if (!playersAdded.has(playerName)) {
            addItem(playerName, 'player-${playerName}');
            playersAdded.add(playerName);
        }
    }
    // Function to add player by name
    document.getElementById("addPlayer2").onclick = () => {
        playerName = this.getElementById("player2name").innerHTML;
        if (!playersAdded.has(playerName)) {
            addItem(playerName, 'player-${playerName}');
            playersAdded.add(playerName);
        }
    }
    // Function to add player by name
    document.getElementById("addPlayer3").onclick = () => {
        playerName = this.getElementById("player3name").innerHTML;
        if (!playersAdded.has(playerName)) {
            addItem(playerName, 'player-${playerName}');
            playersAdded.add(playerName);
        }
    }
    // Function to add player by name
    document.getElementById("addPlayer4").onclick = () => {
        playerName = this.getElementById("player4name").innerHTML;
        if (!playersAdded.has(playerName)) {
            addItem(playerName, 'player-${playerName}');
            playersAdded.add(playerName);
        }
    }
    // Function to add player by name
    document.getElementById("addPlayer5").onclick = () => {
        playerName = this.getElementById("player5name").innerHTML;
        if (!playersAdded.has(playerName)) {
            addItem(playerName, 'player-${playerName}');
            playersAdded.add(playerName);
        }
    }

/*
    =====
     END 
    =====
    Stupid Code needed for the stupid way AI did this
*/
    function addItem(name, id, isDead = false) {
        const li = document.createElement("li");
        li.id = id;
        li.textContent = name + " ";
        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.onclick = () => {
            li.remove();
            playersAdded.delete(name);
            updateHighlight();
            
        };
        const deadButton = document.createElement("button");
        deadButton.textContent = "\u2620";
        deadButton.onclick = () => {
            li.classList.toggle("dead");
            updateHighlight();
            
        };
        li.appendChild(removeButton);
        li.appendChild(deadButton);
        initiativeList.appendChild(li);
        makeItemDraggable(li);
        updateHighlight();
        
    }


    document.getElementById("addMonster").onclick = () => {
        addItem(`Monster ${monsterCounter}`, `monster-${monsterCounter}`);
        monsterCounter++;
    };

    document.getElementById("addNPC").onclick = () => {
        addItem(`NPC ${npcCounter}`, `npc-${npcCounter}`);
        npcCounter++;
    };

    document.getElementById("next").onclick = () => {
        do {
            currentPlayerIndex++;
        } while (initiativeList.children[currentPlayerIndex % initiativeList.children.length].classList.contains('dead'));
        updateHighlight();
        if (currentPlayerIndex % initiativeList.children.length === 0) {
            roundCounter++;
            document.getElementById("roundCounter").textContent = `Round: ${roundCounter}`;
        }
    };

    document.getElementById("previous").onclick = () => {
        do {
            currentPlayerIndex = (currentPlayerIndex - 1 + initiativeList.children.length) % initiativeList.children.length;
        } while (initiativeList.children[currentPlayerIndex].classList.contains('dead'));
        updateHighlight();
    };

    document.getElementById("clearList").onclick = () => {
        initiativeList.innerHTML = '';
        playersAdded.clear();
        monsterCounter = 1;
        npcCounter = 1;
        currentPlayerIndex = -1;
        roundCounter = 1;
        document.getElementById("roundCounter").textContent = `Round: ${roundCounter}`;
        
    };

   

  
});