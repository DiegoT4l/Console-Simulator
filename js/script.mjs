import Folder from './Carpeta.mjs';
import Command from './commands/loadCommands.mjs';

const carpeta = new Folder('root');
let actualFolder = carpeta;

const consoleContainer = document.getElementById('console');
const input = document.getElementById('input');
const output = document.getElementById('output');

function getCommands(command) { 
    const commands = command.split(' ');
    const commandName = commands[0];
    const params = commands.slice(1);
    return { commandName, params };
}

function executeCommand(command) {
    const { commandName, params } = getCommands(command);
    const commandToExecute = Command[commandName];
    if (!commandToExecute) {
        agregarTexto('error', `El comando <span class="command">${commandName}</span> no existe, por favor ingrese un comando válido.
        <br>Para ver los comandos disponibles ingrese el comando <a class="cmd-suggest"><span class="command">help</span></a>`);
        return;
    }
    const response = commandToExecute(actualFolder, params);

    if (response) {
        agregarTexto('success', response);
    }
}


function agregarTexto(state, text) {
    const status = (
        state === 'error' ? 'error' : 
        state === 'success' ? 'success' :
        state === 'warning' ? 'warning' : ''
    )
    if (state === 'error') searchCommandSuggestions();

    const response = `<br><div>
                        <span class="${status}">$></span>${text}</div>`;
    output.insertAdjacentHTML('beforeend', response);
    output.scrollTop = consoleContainer.scrollHeight;
}

(function () {
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const command = input.value;
            executeCommand(command);
            input.value = '';

            if (command.trim() === '') return;
        }
    });
})();

(() => {  //footer current Year
    const currentYearElement = document.getElementById("currentYear");

    const currentYearFooter = (currentYearElement) => {
        if (currentYearElement) { 
            const currentYear = new Date().getFullYear();
            currentYearElement.textContent = currentYear;
        }
    }

    currentYearFooter(currentYearElement);
})();

function searchCommandSuggestions() {
    const commandSuggestions = document.querySelectorAll('.cmd-suggest');
    commandSuggestions.forEach(command => {
        command.addEventListener('click', function () {
            input.value = command.textContent;
            input.focus();
        });
    });

    if (commandSuggestions.length === 0 || commandSuggestions) {
        setTimeout(searchCommandSuggestions, 1000);
    }
}

