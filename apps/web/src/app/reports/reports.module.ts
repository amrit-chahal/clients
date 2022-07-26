import { NgModule } from "@angular/core";

import { LooseComponentsModule } from "../modules/loose-components.module";
import { SharedModule } from "../modules/shared.module";

import { BreachReportComponent } from "./cipher-reports/breach-report.component";
import { ExposedPasswordsReportComponent } from "./cipher-reports/exposed-passwords-report.component";
import { InactiveTwoFactorReportComponent } from "./cipher-reports/inactive-two-factor-report.component";
import { ReusedPasswordsReportComponent } from "./cipher-reports/reused-passwords-report.component";
import { UnsecuredWebsitesReportComponent } from "./cipher-reports/unsecured-websites-report.component";
import { WeakPasswordsReportComponent } from "./cipher-reports/weak-passwords-report.component";
import { ReportCardComponent } from "./list/report-card.component";
import { ReportListComponent } from "./list/report-list.component";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports.component";

// TODO: The report components in this module should be written in a generic way so that they can
//  be used by both organizations and individual vaults. One way of doing this would be to accept
//  a list of ciphers as input, and then display whatever information is relevant.
@NgModule({
  declarations: [
    BreachReportComponent,
    ExposedPasswordsReportComponent,
    InactiveTwoFactorReportComponent,
    ReportCardComponent,
    ReportListComponent,
    ReportsComponent,
    ReusedPasswordsReportComponent,
    UnsecuredWebsitesReportComponent,
    WeakPasswordsReportComponent,
  ],
  imports: [SharedModule, LooseComponentsModule, ReportsRoutingModule],
})
export class ReportsModule {}
