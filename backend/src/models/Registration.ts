import Connection from "./Connection";
import { RegistrationInterface } from "../interface/interface";
import { Pool } from "mysql2/promise";
class Registration {

    protected email: string = '';
    protected name: string = '';
    protected mobile: string = '';
    protected postcode: string = '';
    protected services: string[] = [];
    private _myDb: Connection;
    private _pool: Pool;

    public dbData: RegistrationInterface = {};

    constructor(){
        this._myDb = Connection.getConnectionInstance();
        this._pool = this._myDb.getPool();
        
    }

    public load() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql_load = `SELECT * FROM registration_survey WHERE email = ?`;
                const rs = await this._pool.query(sql_load, [this.dbData['email']]);
                resolve(rs[0]);
            } catch(error) {
                reject(error);
            }
        });
    }

    public  dbInsert() {
        return new Promise( async (resolve, reject) => {
            try {
                const sql = `INSERT IGNORE INTO registration_survey (
                        email,
                        mobile,
                        postcode,
                        services
                    ) VALUES (?, ?, ?, ?)`;

                const params = [
                    this.dbData['email'],
                    ('mobile' in this.dbData) ? this.dbData['mobile'] : null,
                    ('postcode' in this.dbData) ? this.dbData['postcode'] : null,
                    this.dbData['services'] 
                ];
                await this._pool.execute(sql, params);
                resolve(true)
            } catch(error){
                reject(error);
            }
        })
    }

    public set(field:string, value:any) {
        this.dbData[field] = value;
    }
}

export default Registration;