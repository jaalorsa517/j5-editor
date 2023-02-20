export class EditorTemplate {

  private tag = "j5-editor"
  
  get classNames() {
    return {
      container: `${this.tag}__container`,
      editor: `${this.tag}__editor`,
      tools: `${this.tag}__tools`,
      bold: `${this.tag}__bold`
    }
  }

  get template(): string {
    return `
      <section class="${this.classNames.container}">
        <div class=${this.classNames.tools}>
          <button class=${this.classNames.bold}>Bold</button>
        </div>
        <div class=${this.classNames.editor} contenteditable=true></div>
      </section>
    `;
  }

  get style(): string{
    return `
      .${this.classNames.editor} {
        min-width: 250px;
        min-height: 150px;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #fff;
      }
    `
  }
}