import { Base } from "./Base.js";
import { Profile } from "./Profile.js";

export class Vault extends Base {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.img = data.img;
    this.isPrivate = data.isPrivate;
    this.creatorId = data.creatorId;
    this.creator = new Profile(data.creator);
    this.keeps = data.keeps;
  }
}