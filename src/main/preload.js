const { contextBridge, ipcRenderer } = require("electron");

const sqlite = require('better-sqlite3');

//if(process.platform == 'darwin' || process.platform == "linux"){
//    //console.log(`${__dirname}/database/order.db`);
//    database_path = './database/order.db';   //实例化db
//}else if(process.platform == 'win32'){
//    //database_path = `${__dirname}\\database\\order.db`;  
//    database_path = 'C:\\order.db';
//    //const db = new sqlite(`${__dirname}\\database\\order.db`);   //实例化db
//}
//const db = new sqlite('./order.db');   //实例化db
//const dbPath = path.resolve(__dirname, 'dbfile')
//const dbFile = `${path.resolve(dbPath, 'order.db')}`.replace('app.asar', 'dbfile')
//console.log(dbFile);
//database_path = `${process.resourcesPath}/d/order.db`;
const db = new sqlite(`${__dirname}/../../database/order.db`);   //实例化db
const getTrans = (word) => {
    console.log('kaishi chazhao');
    const sql = `SELECT * FROM data WHERE key LIKE '%${word}%';`
    // `SELECT * FROM data WHERE key = '${word}';`
    let statement = db.prepare(sql);
    console.log(statement);
    let res = statement.all();
    console.log(res);
    return res;
}


//暴露到 main world 使browser可以调用
contextBridge.exposeInMainWorld("api",{
    getTrans:getTrans
})


