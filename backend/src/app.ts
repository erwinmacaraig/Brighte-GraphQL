import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./graphql/schema";
import root from "./graphql/resolvers";
import { Request, Response, NextFunction } from 'express';
import  Connection  from "./models/Connection";


const app = express();
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

    
})
export default app;