import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./graphql/schema";
import root from "./graphql/resolvers";
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());
app.all('/graphql', createHandler({
    schema: schema,
    rootValue: root,
    
}))

app.get("/", (req: Request, res: Response , next: NextFunction) => {
    res.status(200).json({message: "Test OK"});
})
export default app;