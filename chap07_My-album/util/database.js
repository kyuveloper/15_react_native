import * as SQLite from 'expo-sqlite';


const database = SQLite.openDatabase('place.db');

// 모바일 단말기에 데이터베이스를 생성함
export const Connection = () => {
    
    const promise = new Promise((resolve, reject) => {
        database.transaction((tr) => {
            tr.executeSql(`
                CREATE TABLE IF NOT EXISTS place(
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
                [], // 파라미터 넘겨줄 때
                () => { // 성공했을 때
                    resolve();
                },
                (_, error) => { // 실패했을 때
                    reject(error);
                }
            );
        });
    });

    return promise;
}