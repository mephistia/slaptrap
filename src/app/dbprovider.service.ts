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
      console.log(ref.result.uid + ' registrado'); // debug

      // criar o user
      this.user = new User();
      this.user.uid = ref.result.uid;
      this.user.nome = user.nome;
      this.user.email = user.email;
      this.user.cartasInventario = user.cartasInventario;
      this.user.cartasEquipadas = user.cartasEquipadas;
      this.user.moedasAcumuladas = user.moedasAcumuladas;
      this.user.moedasTotais = user.moedasTotais;

      // envia para a database, depois disso retorna e atualiza de novo com o id dos >dados< gravados (relaciona com o usuário autenticado)
      this.saveUserData(this.user).then(_ => {
        console.log(_.key + ' gravado');
        this.user.did = _.key;
        this.usrListRef.update(_.key,this.user); // atualiza apenas esse dado
      });
    });
  }


}
