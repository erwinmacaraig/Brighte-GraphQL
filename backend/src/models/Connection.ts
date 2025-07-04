import mysql, { PoolOptions, Pool } from 'mysql2/promise';

class Connection {
    private pool:Pool;
    private access: PoolOptions = {};
    private static connectionInstance: Connection;

    constructor() {
        this.access.database = process.env.DB_NAME;
        this.access.user = process.env.DB_USER;
        this.access.host = process.env.DB_HOST;
        this.access.password = process.env.DB_USER_PASSWD;
        this.access.waitForConnections = true;
        this.access.connectionLimit = 10;
        this.access.queueLimit = 0;
        this.pool = mysql.createPool(this.access);
        
    }

    public static getConnectionInstance(): Connection {
        if(!Connection.connectionInstance){
            Connection.connectionInstance = new Connection();
        }
        return Connection.connectionInstance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async closePool(): Promise<void> {
        await this.pool.end();
        console.log('MySQL connection pool closed.');
    }

}

export default Connection;