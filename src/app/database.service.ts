import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number,
  nome: string,
  moedasAcumuladas: number,
  moedasAtuais: number,
  carta1: number,
  carta2: number,
  carta3: number
}

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  // cria a database e o boolean para ver se pode acessá-la
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 

  users = new BehaviorSubject([]);
  

  constructor(private pltf: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

    // cria a database no construtor
    this.pltf.ready().then(() => {
      this.sqlite.create({
        name: 'users.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase(); // coloca os valores iniciais vvv
      });
    });
  }

  seedDatabase() {
    // pega os valores iniciais
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql) // importa o .sql para a database
        .then(_ => {
          this.loadUsers(); // carrega os users
          this.dbReady.next(true); // todas as classes que estiverem observando irão mudar
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  loadUsers(){ // carrega todos os dados da tabela Users
    return this.database.executeSql('SELECT * FROM users', []).then(data => {
      let users: User[] = []; // array de users
      if (data.rows.length > 0) { // se existir pelo menos uma linha
        for (let i = 0; i < data.rows.length; i++) { 

          // adiciona
          users.push({ 
            id: data.rows.item(i).id,
            nome: data.rows.item(i).nome, 
            moedasAtuais: data.rows.item(i).moedasAtuais,
            moedasAcumuladas: data.rows.item(i).moedasAcumuladas,
            carta1: data.rows.item(i).carta1,
            carta2: data.rows.item(i).carta2,
            carta3: data.rows.item(i).carta3
           });
        }

      }
      this.users.next(users);
    });
  }


  // novo usuário
  addUser(nome, carta1, carta2, carta3, moedasAcumuladas, moedasAtuais) {
    let data = [nome, carta1, carta2, carta3, moedasAcumuladas, moedasAtuais];
    return this.database.executeSql('INSERT INTO users (nome, carta1, carta2, carta3, moedasAcumuladas, moedasAtuais) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadUsers(); // sempre recarrega depois de mudar
    });
  }


  // pegar usuário conforme id e retornar um Promise de novo usuário
  getUser(id): Promise<User>{
    return this.database.executeSql('SELECT * FROM users WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        nome: data.rows.item(0).nome, 
        moedasAtuais: data.rows.item(0).moedasAtuais,
        moedasAcumuladas: data.rows.item(0).moedasAcumuladas,
        carta1: data.rows.item(0).carta1,
        carta2: data.rows.item(0).carta2,
        carta3: data.rows.item(0).carta3
      }
    });

  }


  updateUser(user: User){ // atualiza dados do usuário com mesmo id do user do parâmetro
    let data = [user.nome, user.carta1, user.carta2, user.carta3, user.moedasAcumuladas, user.moedasAtuais];
    return this.database.executeSql(`UPDATE users SET nome = ?, carta1 = ?, carta2 = ?, carta3 = ?, moedasAcumuladas = ?, moedasAtuais = ? WHERE id = ${user.id}`, data).then(data => {
      this.loadUsers(); // sempre recarrega depois de mudar
    })
  }

  // deletar user conforme id
  deleteUser(id){
    return this.database.executeSql('DELETE FROM users WHERE id = ?', [id]).then(_ => {
      this.loadUsers(); // sempre recarrega depois de mudar
    });
  }

}
