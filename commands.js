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

const ADD_PROJECT_COMMAND = {
  name: 'add-project',
  description: 'Add a new project (requires Manager role)',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Name of the project',
      required: true,
    },
    {
      type: 3,
      name: 'description',
      description: 'Description of the project',
      required: false,
    },
    {
      type: 3,
      name: 'manager',
      description: 'Name of the project manager (defaults to command user)',
      required: false,
    },
    {
      type: 3,
      name: 'channel',
      description: 'Channel name for the project (without #)',
      required: false,
    },
    {
      type: 3,
      name: 'keywords',
      description: 'Comma-separated keywords for the project',
      required: false,
    },
  ],
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
  CHKON7NA_COMMAND,
  ADD_PROJECT_COMMAND
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
