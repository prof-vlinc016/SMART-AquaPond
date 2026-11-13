export interface DatabaseConnection<TConnection> {
    getPool(): TConnection;
}