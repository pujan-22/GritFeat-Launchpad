export class DocumentTemplate {
  constructor(
    public title: string,
    public content: string,
    public footer: string
  ) {}

  clone(): DocumentTemplate {
    return new DocumentTemplate(this.title, this.content, this.footer);
  }
}