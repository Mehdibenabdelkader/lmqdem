// Command registry for lmqdem bot
import { handleChkonCommand } from './chkon.js';
import { handleLmachari3Command } from './lmachari3.js';
import { handleKifachCommand } from './kifach.js';
import { handleChbanlikCommand } from './chbanlik.js';
import { handleChkon7naCommand } from './chkon7na.js';

// Command handlers mapping
export const commandHandlers = {
  'chkon': handleChkonCommand,
  'lmachari3': handleLmachari3Command,
  'kifach': handleKifachCommand,
  'chbanlik': handleChbanlikCommand,
  'chkon7na': handleChkon7naCommand,
  // Future commands will be added here
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
