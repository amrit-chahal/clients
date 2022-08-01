import { Directive } from "@angular/core";

import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { PasswordRepromptService } from "@bitwarden/common/abstractions/passwordReprompt.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { CipherView } from "@bitwarden/common/models/view/cipherView";

@Directive()
export class CipherReportComponent {
  loading = false;
  hasLoaded = false;
  ciphers: CipherView[] = [];
  organization: Organization;

  constructor(
    protected messagingService: MessagingService,
    public requiresPaid: boolean,
    private stateService: StateService,
    protected passwordRepromptService: PasswordRepromptService
  ) {}

  async load() {
    this.loading = true;
    await this.setCiphers();
    this.loading = false;
    this.hasLoaded = true;
  }

  protected async checkAccess(): Promise<boolean> {
    if (this.organization != null) {
      // TODO: Maybe we want to just make sure they are not on a free plan? Just compare useTotp for now
      // since all paid plans include useTotp
      if (this.requiresPaid && !this.organization.useTotp) {
        this.messagingService.send("upgradeOrganization", { organizationId: this.organization.id });
        return false;
      }
    } else {
      const accessPremium = await this.stateService.getCanAccessPremium();
      if (this.requiresPaid && !accessPremium) {
        this.messagingService.send("premiumRequired");
        this.loading = false;
        return false;
      }
    }
    return true;
  }

  protected async setCiphers() {
    this.ciphers = [];
  }
}
