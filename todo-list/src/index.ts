import * as fs from 'fs';
import * as path from 'path';

// Types
interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LogEntry {
  id: string;
  action: 'add' | 'update' | 'toggle' | 'remove' | 'clear' | 'list';
  taskId: string | null;
  timestamp: string;
  details: string;
}

// Constants
const TODOS_FILE = './data/todos.json';
const LOGS_FILE = './data/logs.json';

// Utility functions
function ensureDirectoryExists(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readJSONFile<T>(filePath: string): T[] {
  try {
    ensureDirectoryExists(filePath);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeJSONFile<T>(filePath: string, data: T[]): void {
  try {
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to file: ${filePath}`);
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36).substring(2, 6);
}

function logAction(action: LogEntry['action'], taskId: string | null, details: string): void {
  const logEntry: LogEntry = {
    id: generateId(),
    action,
    taskId,
    timestamp: new Date().toISOString(),
    details
  };

  const logs = readJSONFile<LogEntry>(LOGS_FILE);
  logs.push(logEntry);
  writeJSONFile(LOGS_FILE, logs);
}

// Todo operations
function addTask(title: string): Task {
  const newTask: Task = {
    id: generateId(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const tasks = getTasks();
  tasks.push(newTask);
  writeJSONFile(TODOS_FILE, tasks);

  logAction('add', newTask.id, `Added task: ${title}`);
  return newTask;
}

function getTasks(): Task[] {
  return readJSONFile<Task>(TODOS_FILE);
}

function updateTask(id: string, title: string): Task | null {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) return null;

  tasks[taskIndex].title = title;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  writeJSONFile(TODOS_FILE, tasks);

  logAction('update', id, `Updated task to: ${title}`);
  return tasks[taskIndex];
}

function toggleTask(id: string): Task | null {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) return null;

  tasks[taskIndex].done = !tasks[taskIndex].done;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  writeJSONFile(TODOS_FILE, tasks);

  const status = tasks[taskIndex].done ? 'done' : 'undone';
  logAction('toggle', id, `Toggled task to ${status}`);
  return tasks[taskIndex];
}

function removeTask(id: string): boolean {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) return false;

  const removedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  writeJSONFile(TODOS_FILE, tasks);

  logAction('remove', id, `Removed task: ${removedTask.title}`);
  return true;
}

function clearTasks(onlyCompleted: boolean = false): number {
  const tasks = getTasks();
  const tasksToKeep = onlyCompleted ? tasks.filter(task => !task.done) : [];
  const removedCount = tasks.length - tasksToKeep.length;
  
  writeJSONFile(TODOS_FILE, tasksToKeep);

  const details = onlyCompleted 
    ? `Cleared ${removedCount} completed task(s)` 
    : `Cleared all ${removedCount} task(s)`;
  
  logAction('clear', null, details);
  return removedCount;
}

function getLogs(): LogEntry[] {
  return readJSONFile<LogEntry>(LOGS_FILE);
}

// CLI interface
function printUsage(): void {
  console.log(`
Simple Todo CLI - Usage:
  node dist/index.js add <title>      - Add a new task
  node dist/index.js list             - List all tasks
  node dist/index.js update <id> <title> - Update a task
  node dist/index.js toggle <id>      - Toggle task completion
  node dist/index.js remove <id>      - Remove a task
  node dist/index.js clear            - Clear all tasks
  node dist/index.js clear-completed  - Clear completed tasks
  node dist/index.js logs             - View action logs
  `);
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    printUsage();
    return;
  }

  const command = args[0];

  switch (command) {
    case 'add':
      if (args.length < 2) {
        console.log('Error: Please provide a task title');
        return;
      }
      const task = addTask(args.slice(1).join(' '));
      console.log(`✓ Added task: "${task.title}" (ID: ${task.id})`);
      break;

    case 'list':
      const tasks = getTasks();
      if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
      }
      console.log('\n📋 Your Tasks:');
      tasks.forEach(task => {
        const status = task.done ? '✓' : '✗';
        const title = task.done ? `~~${task.title}~~` : task.title;
        console.log(`${status} ${title} (ID: ${task.id})`);
        console.log(`   Created: ${new Date(task.createdAt).toLocaleString()}`);
        console.log(`   Updated: ${new Date(task.updatedAt).toLocaleString()}`);
        console.log('');
      });
      logAction('list', null, `Listed ${tasks.length} task(s)`);
      break;

    case 'update':
      if (args.length < 3) {
        console.log('Error: Please provide task ID and new title');
        return;
      }
      const updatedTask = updateTask(args[1], args.slice(2).join(' '));
      if (updatedTask) {
        console.log(`✓ Updated task: "${updatedTask.title}"`);
      } else {
        console.log('Error: Task not found');
      }
      break;

    case 'toggle':
      if (args.length < 2) {
        console.log('Error: Please provide task ID');
        return;
      }
      const toggledTask = toggleTask(args[1]);
      if (toggledTask) {
        const status = toggledTask.done ? 'completed' : 'pending';
        console.log(`✓ Marked task as ${status}: "${toggledTask.title}"`);
      } else {
        console.log('Error: Task not found');
      }
      break;

    case 'remove':
      if (args.length < 2) {
        console.log('Error: Please provide task ID');
        return;
      }
      const removed = removeTask(args[1]);
      if (removed) {
        console.log('✓ Task removed successfully');
      } else {
        console.log('Error: Task not found');
      }
      break;

    case 'clear':
      const count = clearTasks();
      console.log(`✓ Cleared all ${count} task(s)`);
      break;

    case 'clear-completed':
      const completedCount = clearTasks(true);
      console.log(`✓ Cleared ${completedCount} completed task(s)`);
      break;

    case 'logs':
      const logs = getLogs();
      if (logs.length === 0) {
        console.log('No logs found.');
        return;
      }
      console.log('\n📝 Action Logs:');
      logs.forEach(log => {
        console.log(`${log.action.toUpperCase()} (${new Date(log.timestamp).toLocaleString()})`);
        console.log(`   Details: ${log.details}`);
        if (log.taskId) {
          console.log(`   Task ID: ${log.taskId}`);
        }
        console.log('');
      });
      break;

    default:
      console.log(`Unknown command: ${command}`);
      printUsage();
  }
}

// Run the application
if (require.main === module) {
  main();
}