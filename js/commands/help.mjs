import commands from './loadCommands.mjs';
function help() {
    function getCommands() {
        const commandsList = Object.keys(commands);
        return commandsList;
    }
    const commandsList = getCommands();
    const commandsListHTML = commandsList.map(command => `<li class="command">${command}</li>`).join('');

    return `Comandos disponibles: <br><ul>${commandsListHTML}</ul>`;
}
export default help;