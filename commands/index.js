// Command registry for Lm9adem bot
import { handleChkonCommand } from './chkon.js';

// Command handlers mapping
export const commandHandlers = {
  'chkon': handleChkonCommand,
  // Future commands will be added here
  // 'mchrou3at': handleMchrou3atCommand,
  // 'mchrou3': handleMchrou3Command,
  // 'sugg': handleSuggCommand,
  // 'tasks': handleTasksCommand,
};

// Get command handler by name
export function getCommandHandler(commandName) {
  return commandHandlers[commandName] || null;
}

// Check if command exists
export function commandExists(commandName) {
  return commandName in commandHandlers;
}
