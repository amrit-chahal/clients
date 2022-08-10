import { Component } from "@angular/core";

import { VaultFilter } from "@bitwarden/angular/modules/vault-filter/models/vault-filter.model";
import { Organization } from "@bitwarden/common/models/domain/organization";

import { VaultFilterComponent } from "./vault-filter.component";

@Component({
  selector: "app-organization-vault-filter",
  templateUrl: "vault-filter.component.html",
})
export class OrganizationVaultFilterComponent extends VaultFilterComponent {
  hideAll = true;
  hideOrganizations = true;
  hideFavorites = true;
  hideFolders = true;

  organization: Organization;

  async initCollections() {
    if (this.organization.canEditAnyCollection) {
      return await this.vaultFilterService.buildAdminCollections(this.organization.id);
    }
    return await this.vaultFilterService.buildCollections(this.organization.id);
  }

  async reloadCollectionsAndFolders(): Promise<VaultFilter> {
    this.collections = await this.initCollections();
    this.activeFilter.headCollectionNode = this.collections.nestedList;
    return this.activeFilter;
  }
}
