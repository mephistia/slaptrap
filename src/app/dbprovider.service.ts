import { Injectable } from '@angular/core';
import { User, UserResponse } from '../app/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})

export class DBProviderService {

  usrListRef = this.db.list<User>('users-list');
  user: User;

  constructor(private fbAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }


  // criar user (autenticação)
  private async register(user: User){
    try {
      // retorna email e uid se criar
      return <UserResponse>{
        result: await this.fbAuth.auth.createUserWithEmailAndPassword(user.email, user.senha)
      };
    } catch (e){
      console.log(e);
      return <UserResponse>{
        error: e
      };
    }
  }

  // salvar dados em database
  private saveUserData (user: User){
    return this.usrListRef.push(user); // retorna o usuário enviado para a lista (cria e insere com push)
  }

  // criar user (método p/ uso externo)
  async registerUser(user: User){
    this.register(user).then( ref => { // quando terminar a função assíncrona, chamar a ref e registrar dados lógicos
      console.log(ref.result.user.uid + ' registrado'); // debug
      //console.log(ref.result);
      

      // criar o user
      this.user = new User();
      this.user.uid = ref.result.user.uid;
      this.user.nome = user.nome;
      this.user.email = user.email;
      this.user.cartasInventario = [0, 1, 2]; // cartas iniciais
      this.user.cartasEquipadas = [0, 1, 2];
      this.user.moedasAcumuladas = 0;
      this.user.moedasTotais = 0;

      // envia para a database, depois disso retorna e atualiza de novo com o id dos >dados< gravados (relaciona com o usuário autenticado)
      this.saveUserData(this.user).then(_ => {
        console.log(_.key + ' gravado');
        this.user.did = _.key;
        this.usrListRef.update(_.key,this.user); // atualiza apenas esse dado
      });
    });
  }

  login(email: string, senha: string, toastCtrl, router, events,  callback?){
    this.execLogin(email,senha).then(ref => {
      if (ref.error){
        throw "Usuário inválido";
      } else {
        return this.usrListRef.valueChanges().subscribe(lst =>{
          const user = lst.filter(value => {
            return value.uid === ref.result.user.uid;
          })[0];

          console.log(JSON.stringify(user));
          this.user = user;
          if (callback){
            console.log(callback);
            callback(toastCtrl, router, events);
            console.log("terminou callback");
          }
        });
      }
    });
  }

  private async execLogin(email: string, senha: string){
    try {
      return <UserResponse>{
        result: await this.fbAuth.auth.signInWithEmailAndPassword(email,senha)
      };
    }
    catch (e){
      console.log(JSON.stringify(e));
      return <UserResponse>{
        error: e
      };
     }
}

}
