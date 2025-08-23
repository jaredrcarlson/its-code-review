import { Base } from "./Base.js";
import { Profile } from "./Profile.js";

export class Keep extends Base {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.img = data.img;
    this.views = data.views;
    this.creatorId = data.creatorId;
    this.kept = data.kept;
    this.creator = new Profile(data.creator);
    this.vaultKeepId = data.vaultKeepId;
  }
}