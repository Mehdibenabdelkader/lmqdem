import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Lm9adem bot commands
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
const MCHROU3AT_COMMAND = {
  name: 'mchrou3at',
  description: 'List all available projects with their managers',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const MCHROU3_COMMAND = {
  name: 'mchrou3',
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

const SUGG_COMMAND = {
  name: 'sugg',
  description: 'Create a suggestion ticket for discussion',
  options: [
    {
      type: 3,
      name: 'text',
      description: 'Your suggestion or idea',
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const TASKS_COMMAND = {
  name: 'tasks',
  description: 'Manage tasks for projects',
  options: [
    {
      type: 1, // SUB_COMMAND
      name: 'add',
      description: 'Add a new task (managers only)',
      options: [
        {
          type: 3,
          name: 'description',
          description: 'Task description',
          required: true,
        },
        {
          type: 3,
          name: 'due',
          description: 'Due date (YYYY-MM-DD)',
          required: false,
        },
        {
          type: 3,
          name: 'project',
          description: 'Project name',
          required: false,
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: 'list',
      description: 'List tasks for current or specified project',
      options: [
        {
          type: 3,
          name: 'project',
          description: 'Project name (optional)',
          required: false,
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: 'done',
      description: 'Mark a task as completed (managers only)',
      options: [
        {
          type: 4,
          name: 'id',
          description: 'Task ID to mark as done',
          required: true,
        },
        {
          type: 3,
          name: 'project',
          description: 'Project name (optional)',
          required: false,
        },
      ],
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Register all commands
const ALL_COMMANDS = [
  CHKON_COMMAND,
  MCHROU3AT_COMMAND,
  MCHROU3_COMMAND,
  SUGG_COMMAND,
  TASKS_COMMAND
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
