const { contextBridge, ipcRenderer } = require("electron");

const sqlite = require('better-sqlite3');
const db = new sqlite('./database/order.db');   //实例化db


const getTrans = (word) => {
    console.log('kaishi chazhao');
    const sql = `SELECT * FROM data WHERE key LIKE '%${word}%'`;
    // `SELECT * FROM data WHERE key = '${word}';`
    let statement = db.prepare(sql);
    console.log(statement);
    let res = statement.all(); //get()返回一个对象
    console.log(res); 
    return res;
}


//暴露到 main world 使browser可以调用
contextBridge.exposeInMainWorld("api",{
    getTrans:getTrans
})


