import { Base } from "./Base.js";

export class VaultKeep extends Base {
  constructor(data) {
    super(data);
    this.creatorId = data.creatorId;
    this.vaultId = data.vaultId;
    this.keepId = data.keepId;
  }
}