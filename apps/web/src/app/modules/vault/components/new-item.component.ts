import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";

import { CiphersComponent } from "@bitwarden/angular/components/ciphers.component";
import { ModalService } from "@bitwarden/angular/services/modal.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { CipherType } from "@bitwarden/common/enums/cipherType";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { CollectionView } from "@bitwarden/common/models/view/collectionView";

import { AddEditComponent } from "src/app/organizations/vault/add-edit.component";

@Component({
  selector: "app-vault-new-item",
  templateUrl: "new-item.component.html",
})
export class NewItemComponent {
  @Input() organization: Organization;
  @Input() ciphersComponent: CiphersComponent;
  @Input() selectedType: CipherType;
  @Input() collections: CollectionView[];
  @Input() selectedCollectionId: string;

  @ViewChild("cipherAddEdit", { read: ViewContainerRef, static: true })
  cipherAddEditModalRef: ViewContainerRef;

  constructor(private i18nService: I18nService, private modalService: ModalService) {}

  async addItem() {
    const [modal, childComponent] = await this.modalService.openViewRef(
      AddEditComponent,
      this.cipherAddEditModalRef,
      (comp) => {
        comp.organization = this.organization;
        comp.cipherId = null;
        comp.onSavedCipher.subscribe(async () => {
          modal.close();
          await this.ciphersComponent.refresh();
        });
        comp.onDeletedCipher.subscribe(async () => {
          modal.close();
          await this.ciphersComponent.refresh();
        });
        comp.onRestoredCipher.subscribe(async () => {
          modal.close();
          await this.ciphersComponent.refresh();
        });
      }
    );

    childComponent.organizationId = this.organization.id;
    childComponent.type = this.selectedType;
    if (this.organization.canEditAnyCollection) {
      childComponent.collections = this.collections.filter((c) => !c.readOnly);
    }
    if (this.selectedCollectionId != null) {
      childComponent.collectionIds = [this.selectedCollectionId];
    }
  }
}
