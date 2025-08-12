export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  private constructor() {
    console.log('DatabaseConnection created.');
  }

  public static getInstance(): DatabaseConnection {
    if (!this.instance) {
      this.instance = new DatabaseConnection();
      console.log('Connecting to database...');
    }
    return this.instance;
  }

  public query(sql: string) {
    console.log(`Executing query: ${sql}`);
  }
}
