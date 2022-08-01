import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization.service";
import { Cipher } from "@bitwarden/common/models/domain/cipher";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { CipherView } from "@bitwarden/common/models/view/cipherView";

@Component({
  selector: "app-reused-passwords-report",
  templateUrl: "../../reports/reused-passwords-report.component.html",
})
export class ReusedPasswordsReportComponent {
  manageableCiphers: Cipher[];
  organization: Organization;

  passwordUseMap: Map<string, number>;
  ciphers: CipherView[];
  loading = false;
  hasLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private cipherService: CipherService,
    private organizationService: OrganizationService
  ) {}

  async ngOnInit() {
    this.route.parent.parent.params.subscribe(async (params) => {
      this.organization = await this.organizationService.get(params.organizationId);
      this.manageableCiphers = await this.cipherService.getAll();
    });
  }

  getAllCiphers(): Promise<CipherView[]> {
    return this.cipherService.getAllFromApiForOrganization(this.organization.id);
  }

  canManageCipher(c: CipherView): boolean {
    return this.manageableCiphers.some((x) => x.id === c.id);
  }
}
