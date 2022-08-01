import { NgForOfContext } from "@angular/common";
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import { ModalService } from "@bitwarden/angular/services/modal.service";
import { PasswordRepromptService } from "@bitwarden/common/abstractions/passwordReprompt.service";
import { CipherRepromptType } from "@bitwarden/common/enums/cipherRepromptType";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { CipherView } from "@bitwarden/common/models/view/cipherView";

import { AddEditComponent as OrgAddEditComponent } from "../../organizations/vault/add-edit.component";
import { AddEditComponent } from "../../vault/add-edit.component";

@Component({
  selector: "app-reports-result-list",
  templateUrl: "result-list.component.html",
})
export class ResultListComponent {
  @ViewChild("cipherAddEdit", { read: ViewContainerRef, static: true })
  cipherAddEditModalRef: ViewContainerRef;

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<NgForOfContext<any>>;

  @Input() ciphers: CipherView[] = [];
  @Input() organization: Organization;

  @Output() onCipherChange = new EventEmitter();

  constructor(
    private modalService: ModalService,
    private passwordRepromptService: PasswordRepromptService
  ) {}

  async selectCipher(cipher: CipherView) {
    if (!(await this.repromptCipher(cipher))) {
      return;
    }

    const type = this.organization != null ? OrgAddEditComponent : AddEditComponent;

    const [modal, childComponent] = await this.modalService.openViewRef(
      type,
      this.cipherAddEditModalRef,
      (comp: OrgAddEditComponent | AddEditComponent) => {
        if (this.organization != null) {
          (comp as OrgAddEditComponent).organization = this.organization;
          comp.organizationId = this.organization.id;
        }

        comp.cipherId = cipher == null ? null : cipher.id;
        comp.onSavedCipher.subscribe(async () => {
          modal.close();
          this.onCipherChange.emit();
        });
        comp.onDeletedCipher.subscribe(async () => {
          modal.close();
          this.onCipherChange.emit();
        });
        comp.onRestoredCipher.subscribe(async () => {
          modal.close();
          this.onCipherChange.emit();
        });
      }
    );

    return childComponent;
  }

  protected async repromptCipher(c: CipherView) {
    return (
      c.reprompt === CipherRepromptType.None ||
      (await this.passwordRepromptService.showPasswordPrompt())
    );
  }
}
