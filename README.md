# Simple Discord.js V14 Bot
This is the bot I have been making while working on teaching myself some of the newer version of Discord.js. There are some simple commands and a couple of owner commands with some commands that have been made specially for my personal Discord Server (closecom and opencom). 

Anyone is free to use this and edit as needed. All I ask is that you do not remove me name from ***anywhere*** in the code due to it being a form of giving me credit for what is made. You can take full credit of any commands you add to it.

#### .ENV Template
```
TOKEN=<your discord bot token>
MONGODB=<mongo db connection link>
ERR_WEB=<discord webhook for error messages to be sent>
```
# Command List

#### Moderation 
| Command | Usage | Description |
| ------- | ----- | ----------- |
| Ban | /ban <@user or ID> <reason> | Ban a user from the guild |
| Kick | /kick <@user or ID> <reason> | Kick a user from the guild |
| Unban | /unban <user id> | Unban a user from the guild |
| Mute | /mute <@user or ID> <duration> <reason> | Mute or timeout a user in the guild |
| Unmute | /unmute <@user> | Unmute or remove a users timeout |
| Lock | /lock | Lock a channel in the guild |
| Unlock | /unlock | Unlock a channel in the guild |
| Clear | /clear <number> <member> | Clear an amount of messages from the channel with optional target |

#### Information
| Command | Usage | Description |
| ------- | ----- | ----------- |
| Bot Info | /botinfo | View information about the bot |
| Uptime | /uptime | View the bots uptime |
| Server Info | /serverinfo | View Information about the server/guild |
| User Info | /userinfo <user> | View information about yourself or another user |

#### Utility
| Command | Usage | Description |
| ------- | ----- | ----------- |
| Url Shorten | /urlshorten <link> | Shorten any URL through Discord |


## Run Locally

Clone the project
```bash
  git clone https://github.com/ksurdican/simple-djs-v14-bot.git
```

Go to the project directory
```bash
  cd my-project
```

Install dependencies
```bash
  npm install
```

Start the bot
```bash
  npm run start
```

#### Other starting options

Run using nodemon
```bash
  npm run dev
```
