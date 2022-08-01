import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CipherType } from "@bitwarden/common/enums/cipherType";
import { CipherView } from "@bitwarden/common/models/view/cipherView";

@Component({
  selector: "app-reused-passwords-report",
  templateUrl: "reused-passwords-report.component.html",
})
export class ReusedPasswordsReportComponent implements OnInit {
  passwordUseMap: Map<string, number>;
  ciphers = new BehaviorSubject<CipherView[]>([]);
  loading = false;

  constructor(protected cipherService: CipherService) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const allCiphers = await this.cipherService.getAllDecrypted();
    const ciphersWithPasswords: CipherView[] = [];
    this.passwordUseMap = new Map<string, number>();
    allCiphers.forEach((c) => {
      if (
        c.type !== CipherType.Login ||
        c.login.password == null ||
        c.login.password === "" ||
        c.isDeleted
      ) {
        return;
      }
      ciphersWithPasswords.push(c);
      if (this.passwordUseMap.has(c.login.password)) {
        this.passwordUseMap.set(c.login.password, this.passwordUseMap.get(c.login.password) + 1);
      } else {
        this.passwordUseMap.set(c.login.password, 1);
      }
    });
    const reusedPasswordCiphers = ciphersWithPasswords.filter(
      (c) =>
        this.passwordUseMap.has(c.login.password) && this.passwordUseMap.get(c.login.password) > 1
    );
    this.ciphers.next(reusedPasswordCiphers);
    this.loading = false;
  }

  protected canManageCipher(c: CipherView): boolean {
    // this will only ever be false from an organization view
    return true;
  }
}
