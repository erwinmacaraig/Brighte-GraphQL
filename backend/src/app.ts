import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./graphql/schema";
import root from "./graphql/resolvers";
import { Request, Response, NextFunction } from 'express';
import Registration from "./models/Registration";
import  Connection  from "./models/Connection";
import cors from "cors";

const app = express();

const allowCors = (req: Request, res: Response , next: NextFunction)  => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE');
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
    
};
app.use(cors())
app.use(allowCors);
app.use(express.json());

app.all('/graphql', createHandler({
    schema: schema,
    rootValue: root,
    
}))

app.get("/", async (req: Request, res: Response , next: NextFunction) => {
    const db = Connection.getConnectionInstance();
    const pool = db.getPool();
    try {
        const rs = await pool.execute('SELECT NOW();');
        console.log(rs);
        res.status(200).json({message: "Test OK. DB connection established"});
    } catch(error) {
        console.error('Error fetching data:', error);
        res.status(400).json({message: "Test OK! cannot access db"});
    }
    
});

app.get("/test-insert", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const regObj = new Registration();
        regObj.set('email', 'test3@yahoo.com');
        regObj.set('mobile', '0987654123');
        regObj.set('services', JSON.stringify(['delivery', 'pickup', 'dine-in', 'take-out']));
        const success = await regObj.dbInsert();
        console.log(success);
        if (success) {
            res.status(200).json({message: "OK" + " " + success});
        } else {
            res.status(400).json({message: 'ERROR!'});
        }
    } catch(error) {
        console.log("Error inserting data");
        res.status(400).json({message: 'Error inserting data'});
    }
});

app.get("/test-load", async (req: Request, res: Response, next: NextFunction) => {
    const regObj = new Registration();
    regObj.set('email', 'test2@yahoo.com');
    const data = await regObj.load();
    res.send(data);


});
export default app;