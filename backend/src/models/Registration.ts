import Connection from "./Connection";
import { RegistrationInterface } from "../interface/interface";
import mysql, { Pool, QueryResult, ResultSetHeader, RowDataPacket} from "mysql2/promise";
class Registration {

    protected email: string = '';
    protected name: string = '';
    protected mobile: string = '';
    protected postcode: string = '';
    protected services: string[] = [];
    private _myDb: Connection;
    private _pool: Pool;
    private _id:number = 0

    public dbData: RegistrationInterface = {};

    constructor(){
        this._myDb = Connection.getConnectionInstance();
        this._pool = this._myDb.getPool();
        
    }

    public load() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql_load = `SELECT * FROM registration_survey WHERE email = ?`;
                const [rows, fields ]= await this._pool.query(sql_load, [this.dbData['email']]);
                const dataRows = rows as mysql.RowDataPacket[]; 
                this.dbData = { ...dataRows[0] };                
                resolve(true);
            } catch(error) {
                console.log(error);
                reject(error);
            }
        });
    }

    public  dbInsert() {
        return new Promise( async (resolve, reject) => {
            try {
                const sql = `INSERT IGNORE INTO registration_survey (
                        email,
                        name,
                        mobile,
                        postcode,
                        services
                    ) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE services = ?`;

                const params = [
                    this.dbData['email'],
                    ('name' in this.dbData) ? this.dbData['name'] : null,
                    ('mobile' in this.dbData) ? this.dbData['mobile'] : null,
                    ('postcode' in this.dbData) ? this.dbData['postcode'] : null,
                    this.dbData['services'],
                    this.dbData['services'] 
                ];
                const [result, fields] = await this._pool.execute<ResultSetHeader>(sql, params);
                let id = result.insertId;
                if (id == 0) {
                    // duplicate key detected 
                    await this.load();
                    resolve(this.dbData['id']);
                } else {
                    resolve(id);
                }
                // console.log(result.insertId);
                
            } catch(error){
                console.log(error);
                reject(error);
            }
        })
    }

    public set(field:string, value:any) {
        this.dbData[field] = value;
    }

    public create(createData:RegistrationInterface) {
        return new Promise( async (resolve, reject) => {
            try {
                for (let key in createData ) {
                    this.dbData[key] = createData[key];
                }
                const id = await this.dbInsert();
                resolve(id);
            } catch(error) {
                reject(error);
            }
            
        });
    }

    public getCollection(){
        return new Promise( async(resolve, reject) => {
            try {
                const sql = `SELECT id, name, email, mobile, postcode, services FROM registration_survey`;
                const [rows, fields ]= await this._pool.query(sql);
                const dataRows = rows as mysql.RowDataPacket[]; 
                dataRows.forEach(item => {
                    let parsedString = JSON.parse(item['services']);
                    item['services'] = parsedString;                    
                })
                resolve(dataRows);

            } catch(error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

export default Registration;