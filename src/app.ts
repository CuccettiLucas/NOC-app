import { envs } from "./config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "./generated/prisma";
import {Server} from "./presentation/server";

( async() =>{
    await main();
})();

async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });

    //const prisma = new PrismaClient();
    /*const newLog = await prisma.logModel.create({
        data:{
            level:'HIGH',
            message:'Test message',
            origin:'App.ts'   
        }
    })
    const newLog = await prisma.logModel.findMany();
    console.log(newLog);*/

    // Crear una colección = tables, documento = registro
    /*const newLog = await LogModel.create({
        message:'Test message desde mongo',
        origin:'App.ts',
        level:'low'
    })

    await newLog.save();

    const logs = await LogModel.find();
    console.log(logs);*/


    Server.start();
}