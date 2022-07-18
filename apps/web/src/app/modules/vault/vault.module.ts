import { NgModule } from "@angular/core";

import { LooseComponentsModule } from "../loose-components.module";
import { SharedModule } from "../shared.module";
import { VaultFilterModule } from "../vault-filter/vault-filter.module";

import { NewItemComponent } from "./components/new-item.component";
import { VaultService } from "./vault.service";

@NgModule({
  imports: [SharedModule, VaultFilterModule, LooseComponentsModule],
  declarations: [NewItemComponent],
  exports: [SharedModule, VaultFilterModule, LooseComponentsModule, NewItemComponent],
  providers: [
    {
      provide: VaultService,
      useClass: VaultService,
    },
  ],
})
export class VaultModule {}
