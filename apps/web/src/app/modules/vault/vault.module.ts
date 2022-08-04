import { NgModule } from "@angular/core";

import { LooseComponentsModule } from "../loose-components.module";
import { SharedModule } from "../shared.module";
import { VaultFilterModule } from "../vault-filter/vault-filter.module";

import { CiphersComponent } from "./components/ciphers.component";
import { NewItemComponent } from "./components/new-item.component";
import { VaultService } from "./vault.service";

@NgModule({
  imports: [SharedModule, VaultFilterModule, LooseComponentsModule],
  declarations: [NewItemComponent, CiphersComponent],
  exports: [
    SharedModule,
    VaultFilterModule,
    LooseComponentsModule,
    NewItemComponent,
    CiphersComponent,
  ],
  providers: [
    {
      provide: VaultService,
      useClass: VaultService,
    },
  ],
})
export class VaultModule {}
