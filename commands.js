import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// lmqdem bot commands
const CHKON_COMMAND = {
  name: 'chkon',
  description: 'Ask who is responsible for a specific topic or project',
  options: [
    {
      type: 3,
      name: 'topic',
      description: 'What topic or project are you asking about?',
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Future commands (commented out for now)
const LMACHARI3_COMMAND = {
  name: 'lmachari3',
  description: 'List all available projects with their managers',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const KIFACH_COMMAND = {
  name: 'kifach',
  description: 'Show details of a specific project',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Name of the project to show details for',
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const CHBANLIK_COMMAND = {
  name: 'chbanlik',
  description: 'Suggest an idea for discussion',
  options: [
    {
      type: 3,
      name: 'idea',
      description: 'The idea you want to suggest',
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const CHKON7NA_COMMAND = {
  name: 'chkon7na',
  description: 'Get a brief description of the community and available commands',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


// Register all commands
const ALL_COMMANDS = [
  CHKON_COMMAND,
  LMACHARI3_COMMAND,
  KIFACH_COMMAND,
  CHBANLIK_COMMAND,
  CHKON7NA_COMMAND
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
