# lmqdem Discord Bot

**lmqdem** is a Discord bot inspired by the Moroccan concept of a local representative who helps people and points them to the right person. The bot helps manage projects and coordinate team members in your Discord server.

## Features

### Phase 1 - Core Features
- **`/chkon [topic]`** - Ask who is responsible for a specific topic or project
- **`/lmachari3`** - List all available projects with their managers
- **`/kifach [name]`** - Show detailed information about a specific project
- **`/chbanlik [task]`** - Suggest a task or idea for discussion
- **`/tasks`** - Manage project tasks (add, list, mark as done)

### Future Features
- **`/dkker`** - Set reminders
- **`/m3lomat`** - FAQ/guide system
- Weekly project digest

## Project Structure

```
discord-example-app/
├── app.js                 # Main bot application
├── commands.js           # Command registration
├── commands/             # Modular command handlers
│   ├── index.js         # Command registry
│   ├── chkon.js         # /chkon command implementation
│   ├── lmachari3.js     # /lmachari3 command implementation
│   ├── kifach.js        # /kifach command implementation
│   ├── chbanlik.js      # /chbanlik command implementation
│   └── chkon7na.js      # /chkon7na command implementation
├── utils/               # Utility functions
│   ├── darija.js        # Darija language utilities
│   └── projects.js      # Project management utilities
├── data/                # Data storage
│   └── projects.json    # Projects database
└── package.json         # Dependencies and scripts
```

## Setup

### Prerequisites
- Node.js 18.x or higher
- Discord Application with bot token
- Discord server with appropriate permissions

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   APP_ID=your_discord_app_id
   PUBLIC_KEY=your_discord_public_key
   BOT_TOKEN=your_discord_bot_token
   PORT=3000
   ```

3. **Register commands:**
   ```bash
   npm run register
   ```

4. **Start the bot:**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

## Usage

### Commands

#### `/chkon [topic]`
Ask who is responsible for a specific topic or project.

**Example:**
```
/chkon design
```
**Response:**
```
Chkon li kaydir "design"?

Design Project
Manager: @Sarah (Sarah)
Description: UI/UX design for the new mobile app interface
Channel: #design-team
Status: Active
```

#### `/lmachari3`
List all available projects with their managers.

#### `/kifach [name]`
Show detailed information about a specific project.

#### `/chbanlik [task]`
Suggest a task or idea for discussion. The suggestion will be posted to the suggestions channel.

#### `/chkon7na`
Get a brief description of the community and available commands.

#### `/tasks`
Manage project tasks with subcommands:
- `add` - Add a new task (managers only)
- `list` - List tasks for current or specified project
- `done` - Mark a task as completed (managers only)

## Configuration

### Projects Data Structure
Projects are stored in `data/projects.json`. Each project includes:
- Name and description
- Manager information
- Keywords for search
- Channel information
- Tasks and suggestions
- Status

### Manager Permissions
- Only users with the "Manager" role can add/close tasks
- Manager permissions are checked by user ID
- Anyone can suggest or ask `/chkon`

## Localization

The bot uses **Darija** (Moroccan Arabic) for all commands and responses:
- Commands are in Darija: `/chkon`, `/lmachari3`, `/kifach`, `/chbanlik`, `/chkon7na`, `/tasks`
- Responses mix Darija and English for clarity
- Friendly and concise communication style

## Future Development

The modular structure makes it easy to add new features:
1. Create new command files in `commands/`
2. Register commands in `commands/index.js`
3. Add command definitions in `commands.js`
4. Update project data structure as needed

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**lmqdem** - Helping you find the right person for the right job!