document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const nameList = document.getElementById('nameList');
    const states = ['normal', 'thanks', 'love you', 'god', 'zeus'];
    let currentStateIndex = 0;
    let lastEnteredName = '';
    let lastEnteredState = 0;

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
        const li = document.createElement('li');
        li.textContent = formatName(name, stateIndex);
        li.className = getClassNameForState(stateIndex);
        nameList.appendChild(li);

        if (nameList.children.length > 10) {
            nameList.removeChild(nameList.firstChild);
        }
    }

    function removeLastNameFromList() {
        if (nameList.children.length > 0) {
            const lastLi = nameList.lastChild;
            nameInput.value = lastLi.textContent.replace(/^[^\w\s]/, '').trim();  // Removing prefix emojis and setting the value
            currentStateIndex = states.indexOf(getStateFromClassName(lastLi.className));
            updateInputState();
            nameList.removeChild(lastLi);
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

    function getStateFromClassName(className) {
        switch (className) {
            case 'state-thanks':
                return 'thanks';
            case 'state-love':
                return 'love you';
            case 'state-god':
                return 'god';
            case 'state-zeus':
                return 'zeus';
            default:
                return 'normal';
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