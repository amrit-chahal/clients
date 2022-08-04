import { NgModule } from "@angular/core";

import { VaultModule } from "../../vault.module";

import { OrganizationCiphersComponent } from "./components/organization-ciphers.component";
import { OrganizationVaultRoutingModule } from "./organization-vault-routing.module";
import { OrganizationVaultComponent } from "./organization-vault.component";

@NgModule({
  imports: [VaultModule, OrganizationVaultRoutingModule],
  declarations: [OrganizationVaultComponent, OrganizationCiphersComponent],
  exports: [OrganizationVaultComponent, OrganizationCiphersComponent],
})
export class OrganizationVaultModule {}
