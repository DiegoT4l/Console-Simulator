import Folder from './Carpeta.mjs';
import Command from './commands/loadCommands.mjs';

const carpeta = new Folder('root');
let actualFolder = carpeta;

const consoleContainer = document.getElementById('console');
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

function parseParams(input) {
    if (input.length === 2 && input.includes(':')) {
        const disk = input[0];
        const diskList = {
            'c': 'c',
            'd': 'd',
            'e': 'e',
            'f': 'f',
        };
        if (!diskList[disk]) {
            agregarTexto('error', `El sistema no puede encontrar el controlador especificado '<span class="command">${disk.toUpperCase()}:</span>'.`);
            inputElement.value = '';
            return { commandName: 'noDisk', params: [diskList['c']] };
        }
        else{
        inputElement.placeholder = `${diskList[disk]}:\\users\\admin\\root`;
        return { commandName: 'Disk', params: [diskList[disk]] };
        }
    }

    let filteredString = input.replace(/[^a-zA-Z\s_0-9-."']/g, '');
    let parts = filteredString.split(' ');

    const commandName = parts[0];
    let params = parts.slice(1);

    params = params.map(param => {
        if (param.startsWith('"') && param.endsWith('"')) {
            return param.slice(1, -1).replace(/[^\w\s]/g, '_');
        } else {
            return param.replace(/[^\w\s]/g, '_');
        }
    });

    return { commandName, params };
}


function executeCommand(command) {
    const { commandName, params } = parseParams(command);
    const commandToExecute = Command[commandName];

    if (commandName === 'Disk') {
        actualFolder = carpeta[params[0]];
        agregarTexto('success', `Se ha cambiado al disco <span class="command">${params[0].toUpperCase()}:</span>`);
        return;
    }
    if (commandName === 'noDisk') {
        return;
    }
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
    outputElement.insertAdjacentHTML('beforeend', response);
    outputElement.scrollTop = consoleContainer.scrollHeight;
}

(function () { //input
    inputElement.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const command = inputElement.value;
            executeCommand(command);
            inputElement.value = '';

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
            inputElement.value = command.textContent;
            inputElement.focus();
        });
    });

    if (commandSuggestions.length === 0 || commandSuggestions) {
        setTimeout(searchCommandSuggestions, 1000);
    }
}

