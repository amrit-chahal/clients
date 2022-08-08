import { Component } from "@angular/core";

import { TrashFilterComponent as BaseTrashFilterComponent } from "@bitwarden/angular/modules/vault-filter/components/trash-filter.component";

@Component({
  selector: "app-trash-filter",
  templateUrl: "trash-filter.component.html",
})
export class TrashFilterComponent extends BaseTrashFilterComponent {}
