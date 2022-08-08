import { Directive, EventEmitter, Input, Output } from "@angular/core";

import { CipherStatus } from "../models/cipher-status.model";
import { VaultFilter } from "../models/vault-filter.model";

@Directive()
export class TrashFilterComponent {
  @Input() hideTrash = false;
  @Output() onFilterChange: EventEmitter<VaultFilter> = new EventEmitter<VaultFilter>();
  @Input() activeFilter: VaultFilter;

  get show() {
    return !this.hideTrash;
  }

  applyFilter(cipherStatus: CipherStatus) {
    this.activeFilter.resetFilter();
    this.activeFilter.status = cipherStatus;
    this.onFilterChange.emit(this.activeFilter);
  }
}
