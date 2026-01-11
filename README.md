A highly modular and scalable Discord bot template written in TypeScript with MongoDB support.

## Features

- **Modular Architecture**: Separate handlers for commands, events, and utilities.
- **Sharding Support**: Automatically enabled in production for large-scale usage.
- **Hybrid Commands**: Supports both Slash (`/`) and Prefix (`!`) commands.
- **Environment Management**: Easy switching between Development (`.env.dev`) and Production (`.env`).
- **Path Aliases**: Clean imports like `@functions/utils`.
- **MongoDB Integration**: Built-in connection setup using Mongoose.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env` to `.env` (for production) and fill in the details.
   - Copy `.env.dev` to `.env.dev` (for development) and fill in the details.

## Running the Bot

### Development
```bash
npm run dev
# OR for canary environment
npm run canary
```

### Production
Build the TypeScript code and start the bot (Sharding enabled):
```bash
npm run build
npm start
```

## Structure

- `src/commands`: Slash and Prefix commands.
- `src/events`: Discord event listeners.
- `src/functions`: Utility functions and helpers.
- `src/config`: Configuration files (`config.json`, `constants.json`).
- `src/database`: MongoDB connection logic.
- `src/handlers`: Command and Event loaders.
