# Lm9adem Bot Setup Guide

## Quick Start

1. **Create a Discord Application:**
   - Go to https://discord.com/developers/applications
   - Click "New Application"
   - Give it a name (e.g., "Lm9adem Bot")
   - Go to "Bot" section and create a bot
   - Copy the bot token

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   APP_ID=your_discord_app_id_here
   PUBLIC_KEY=your_discord_public_key_here
   BOT_TOKEN=your_discord_bot_token_here
   PORT=3000
   ```

3. **Install and run:**
   ```bash
   npm install
   npm run register  # Register slash commands
   npm start        # Start the bot
   ```

4. **Invite bot to your server:**
   - Go to OAuth2 > URL Generator
   - Select "bot" and "applications.commands" scopes
   - Select necessary permissions
   - Use the generated URL to invite the bot

## Testing the /chkon Command

Once the bot is running, test it with:
```
/chkon design
/chkon marketing
/chkon development
```

The bot should respond with project information in Darija!

## Customizing Projects

Edit `data/projects.json` to add your own projects:
- Add new projects with managers, descriptions, and keywords
- Update channel IDs to match your server
- Modify manager IDs to match your team members

## Next Steps

- Implement the remaining commands (`/mchrou3at`, `/mchrou3`, `/sugg`, `/tasks`)
- Add more projects to the database
- Customize the Darija responses
- Add your own features!
