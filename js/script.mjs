import Folder from './Carpeta.mjs';
import Command from './commands/loadCommands.mjs';

const carpeta = new Folder('root');
let actualFolder = carpeta;

const consoleContainer = document.getElementById('console');
const input = document.getElementById('input');
const output = document.getElementById('output');

function agregarTexto(text) {
    const response = `<div>${text}</div>`;
    output.insertAdjacentHTML('beforeend', response);
    output.scrollTop = consoleContainer.scrollHeight;
}

(function () {
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const command = input.value;
            agregarTexto(`<span>$></span> ${command}`);
            input.value = '';

            if (command.trim() === '') return;
        }
    });
})();