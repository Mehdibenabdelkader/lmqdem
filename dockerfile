FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install
EXPOSE 3000

COPY . /usr/src/bot
RUN npm run register
# Start the bot.
CMD ["npm", "run", "dev"]