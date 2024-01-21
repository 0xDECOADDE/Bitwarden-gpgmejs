import { Injectable } from "@angular/core";
import { CipherView } from "@bitwarden/common/vault/models/view/cipher.view";
import gpgmejs from 'gpgmejs';

/**
 * NativeMessage with gpgmejs
 */
@Injectable()
export class GpgService {
    PLACEHOLDER:string = "gpg";
    private gpgme:any = null;
  constructor(
  ) {this.init();}

  async init(){
    try {
      this.gpgme = await gpgmejs.init({timeout: 10000});
    } catch (e) {
      console.log('GPGME is not available.', e.code);
    }
  }

  async decrypt(cipher: CipherView):Promise<string> {
    if(cipher.login.password != this.PLACEHOLDER) return cipher.login.password;

    const gpgfield = cipher.fields.find((f) => f.name === 'gpg');
    if(!gpgfield) return cipher.login.password;

    if(this.gpgme == null) await this.init();
    const decrypted = await this.gpgme.decrypt({data: "-----BEGIN PGP MESSAGE-----\n"+gpgfield.value+"\n-----END PGP MESSAGE-----"});
    if(decrypted) return decrypted.data;
    return cipher.login.password;
  }

}
