import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio: boolean = true;

  constructor(private platform: Platform, private nativeAudio: NativeAudio){
  }

  preload(key: string, asset: string, loop: boolean): void {

    if(this.platform.is('cordova') && !this.forceWebAudio){

      if (!loop){
        this.nativeAudio.preloadSimple(key, asset);
      }
      else {
        this.nativeAudio.preloadComplex(key, asset, 0.8, 1, 0);
      }

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: true
      });

    } else {

      let audio = new Audio();
      audio.src = asset;

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: false
      });

    }

  }

  play(key: string, loop: boolean): void {

    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if(soundToPlay.isNative){

      // se for loop
      if (loop){
        this.nativeAudio.loop(soundToPlay.asset).then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });

        // se não for loop:
      } else {
        this.nativeAudio.play(soundToPlay.asset).then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });
      }




    } else {

      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();

    }

  }

  stop(key: string): void {
    let soundPlaying = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if (soundPlaying.isNative){
      this.nativeAudio.stop(soundPlaying.asset).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.audioPlayer.pause();
    }
  }

  toggleStop(key: string, loop: boolean): boolean{
    let soundPlaying = this.sounds.find((sound) => {
      return sound.key === key;
    });
    if (soundPlaying.isNative){
      // se parou com sucesso, retorna true pois deu stop, se deu erro toca a musica
      this.nativeAudio.stop(soundPlaying.asset).then(() => {return true;}, () => {
        this.play(key, loop);
        return false;
      }); 
    } else {
      // this.audioPlayer.src = soundPlaying.asset;
      if (this.audioPlayer.paused){
        this.audioPlayer.play();
        return false;
      }
      else {
        this.audioPlayer.pause();
        return true;
      }
    }
  }


}
