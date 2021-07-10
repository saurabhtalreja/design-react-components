
/* Its an exported request handler, any thing which hits /api/speakers
will end up here*/

import path from "path";
import fs from "fs";

//so that fs can integrated well
const {promisify} = require("util")
const readFile=promisify(fs.readFile);
const delay =(ms)=>new Promise(resolve => setTimeout(resolve,ms));
export default async function handler(req,res){
    const jsonFile = path.resolve("./","db.json")
    try{
        const readFileData = await readFile(jsonFile);
        await delay(1000);
        const speakers = JSON.parse(readFileData).speakers
        if(speakers){
            res.setHeader("Content-Type","application/json")
            res.status(200).send(JSON.stringify(speakers,null,2));
            console.log("GET /api/speakers status:200")
        }
    }
    catch (e){
        console.error("/api/speakers error",e);
        res.status(404).send("File Not Found ")
    }
}