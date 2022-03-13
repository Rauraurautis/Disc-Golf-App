import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("players.db")

const createTableIfNotExists = () => {
    db.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Player (id integer primary key not null, name text, throws integer default 0, avgscore real default 0.0, wonrounds integer default 0, playedrounds integer default 0);")
      })
}


export { db, createTableIfNotExists}