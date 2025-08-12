import { DatabaseConnection } from './implementation';

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log('Same instance?', db1 === db2);
