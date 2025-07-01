import mysql, { PoolOptions } from 'mysql2/promise';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

export class Connection {
    protected pool:any = undefined;
    private access: PoolOptions = {};

    constructor() {
        if (!this.pool) {
            this.access.database = process.env.DB_NAME;
            this.access.user = process.env.DB_USER;
            this.access.host = process.env.DB_HOST;
            this.access.password = process.env.DB_USER_PASSWD;

            this.pool = mysql.createPool(this.access);
        }
    }

}