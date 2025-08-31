# Todo List Storage System
A lightweight command-line todo list manager built with Node.js and TypeScript that persists data to JSON files.
## Features
    - Add, list, update, toggle, and remove tasks
    - Clear all tasks or only completed ones
    - Comprehensive action logging
    - JSON file persistence
    - Simple CLI interface
    - No external dependencies

## Installation
1. Clone or download the project files
2. Install dependencies:
```
npm install
```
3. Build the TypeScript code:
```
npm run build
```
## Usage
Basic Commands
```
# Add a new task
node dist/index.js add "Buy groceries"

# List all tasks
node dist/index.js list

# Update a task title
node dist/index.js update abc123 "Buy groceries and cook dinner"

# Toggle task completion
node dist/index.js toggle abc123

# Remove a task
node dist/index.js remove abc123

# Clear all tasks
node dist/index.js clear

# Clear only completed tasks
node dist/index.js clear-completed

# View action logs
node dist/index.js logs

# Show help
node dist/index.js
```
## Task Format
Each task contains:

    id: Unique identifier (auto-generated)

    title: Task description

    done: Completion status (true/false)

    createdAt: Creation timestamp

    updatedAt: Last update timestamp

## Logging

All actions are automatically logged to data/logs.json with:

    Action type (add, update, toggle, remove, clear, list)

    Task ID (if applicable)

    Timestamp

    Details about the operation