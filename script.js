document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const nameList = document.getElementById('nameList');
    const states = ['normal', 'thanks', 'love you', 'god', 'zeus'];
    let currentStateIndex = 0;
    let lastEnteredName = '';
    let lastEnteredState = 0;
    let nameCounter = 0;

    nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let name = nameInput.value.trim();
            if (!name && lastEnteredName) {
                name = lastEnteredName;
                currentStateIndex = lastEnteredState;
            } else {
                lastEnteredName = name;
                lastEnteredState = currentStateIndex;
            }

            if (name) {
                addNameToList(name, currentStateIndex);
                nameInput.value = '';
                resetInputState();
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            currentStateIndex = (currentStateIndex + 1) % states.length;
            updateInputState();
        } else if (event.key === 'Backspace' && nameInput.value.trim() === '') {
            event.preventDefault();
            removeLastNameFromList();
        }
    });

    function addNameToList(name, stateIndex) {
        nameCounter++;
        const li = document.createElement('li');
        li.textContent = `${nameCounter}. ${formatName(name, stateIndex)}`;
        li.className = getClassNameForState(stateIndex);
        li.dataset.name = name; // Store the original name without emojis
        li.dataset.stateIndex = stateIndex; // Store the state index for later use
        nameList.appendChild(li);

        if (nameList.children.length > 10) {
            nameList.removeChild(nameList.firstChild);
        }
    }

    function removeLastNameFromList() {
        if (nameList.children.length > 0) {
            const lastLi = nameList.lastChild;
            nameInput.value = lastLi.dataset.name;  // Retrieve the original name without emojis
            currentStateIndex = parseInt(lastLi.dataset.stateIndex, 10);
            updateInputState();
            nameList.removeChild(lastLi);
            nameCounter--;
            updateListNumbers();
        }
    }

    function updateListNumbers() {
        const items = nameList.children;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            item.textContent = `${i + 1}. ${formatName(item.dataset.name, item.dataset.stateIndex)}`;
        }
    }

    function formatName(name, stateIndex) {
        switch (states[stateIndex]) {
            case 'thanks':
                return '👍 ' + name;
            case 'love you':
                return '❤️ ' + name;
            case 'god':
                return '🙏😇 ' + name;
            case 'zeus':
                return '⚡✨🌩️ ' + name;
            default:
                return name;
        }
    }

    function getClassNameForState(stateIndex) {
        switch (states[stateIndex]) {
            case 'thanks':
                return 'state-thanks';
            case 'love you':
                return 'state-love';
            case 'god':
                return 'state-god';
            case 'zeus':
                return 'state-zeus';
            default:
                return '';
        }
    }

    function resetInputState() {
        currentStateIndex = 0;
        updateInputState();
    }

    function updateInputState() {
        nameInput.className = '';
        nameInput.classList.add(getClassNameForState(currentStateIndex));
    }
});