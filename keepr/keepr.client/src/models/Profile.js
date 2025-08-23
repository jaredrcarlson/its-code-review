import { Base } from "./Base.js"

export class Profile extends Base {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.picture = data.picture;
    this.coverImg = data.coverImg ? data.coverImg : `https://placehold.co/800x400?text=${this.name}`;
  }
}