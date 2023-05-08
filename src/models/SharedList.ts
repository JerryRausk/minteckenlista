export default class SignList {
  Id: number;
  Url: string;
  Created: Date;
  PublicName: string | null;

  constructor(
    id: number = 0,
    url: string = "local",
    created: Date = new Date(1900, 1, 1),
    publicName: string | null
  ) {
    (this.Id = id),
      (this.Url = url),
      (this.Created = created),
      (this.PublicName = publicName);
  }
}
