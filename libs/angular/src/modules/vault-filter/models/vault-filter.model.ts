import { CipherType } from "@bitwarden/common/enums/cipherType";
import { TreeNode } from "@bitwarden/common/models/domain/treeNode";
import { CipherView } from "@bitwarden/common/models/view/cipherView";
import { CollectionView } from "@bitwarden/common/models/view/collectionView";

import { CipherStatus } from "./cipher-status.model";

export type VaultFilterFunction = (cipher: CipherView) => boolean;

export class VaultFilter {
  cipherType?: CipherType;
  status?: CipherStatus;
  headCollectionNode?: TreeNode<CollectionView>;
  selectedCollectionNode?: TreeNode<CollectionView>;
  selectedFolder = false; // This is needed because of how the "No Folder" folder works. It has a null id.
  selectedFolderId?: string;
  selectedOrganizationId?: string;
  myVaultOnly = false;
  refreshCollectionsAndFolders = false;

  constructor(init?: Partial<VaultFilter>) {
    Object.assign(this, init);
  }

  resetFilter() {
    this.cipherType = null;
    this.status = null;
    this.selectedCollectionNode = this.headCollectionNode;
    this.selectedFolder = false;
    this.selectedFolderId = null;
  }

  resetOrganization() {
    this.myVaultOnly = false;
    this.selectedOrganizationId = null;
    this.resetFilter();
  }

  buildFilter(): VaultFilterFunction {
    return (cipher) => {
      let cipherPassesFilter = true;
      if (this.status === "favorites" && cipherPassesFilter) {
        cipherPassesFilter = cipher.favorite;
      }
      if (this.status === "trash" && cipherPassesFilter) {
        cipherPassesFilter = cipher.isDeleted;
      }
      if (this.cipherType && cipherPassesFilter) {
        cipherPassesFilter = cipher.type === this.cipherType;
      }
      if (this.selectedFolder && this.selectedFolderId == null && cipherPassesFilter) {
        cipherPassesFilter = cipher.folderId == null;
      }
      if (this.selectedFolder && this.selectedFolderId != null && cipherPassesFilter) {
        cipherPassesFilter = cipher.folderId === this.selectedFolderId;
      }
      // All Collections
      if (
        this.selectedCollectionNode &&
        this.selectedCollectionNode == this.headCollectionNode &&
        this.cipherType == null &&
        cipherPassesFilter
      ) {
        cipherPassesFilter = false;
      }
      // Unassigned Collection
      if (
        this.selectedCollectionNode &&
        this.selectedCollectionNode?.node.id == null &&
        cipherPassesFilter
      ) {
        cipherPassesFilter =
          cipher.organizationId != null &&
          (cipher.collectionIds == null || cipher.collectionIds.length === 0);
      }
      // Collection Selected
      if (
        this.selectedCollectionNode?.node.id != "-1" &&
        this.selectedCollectionNode?.node.id != null &&
        cipherPassesFilter
      ) {
        cipherPassesFilter =
          cipher.collectionIds != null &&
          cipher.collectionIds.includes(this.selectedCollectionNode?.node.id);
      }
      if (this.selectedOrganizationId != null && cipherPassesFilter) {
        cipherPassesFilter = cipher.organizationId === this.selectedOrganizationId;
      }
      if (this.myVaultOnly && cipherPassesFilter) {
        cipherPassesFilter = cipher.organizationId === null;
      }
      return cipherPassesFilter;
    };
  }
}
