import { EditorTemplate } from "./editor.tmp";
import { uniqueHash } from "lib/shared/utils";
import { Attributes } from "lib/shared/enums/index";

interface IElementEvent {
  selector: string;
  eventName: keyof GlobalEventHandlersEventMap;
  function: () => any;
}

interface IElementAttributes {
  tag: string;
  className?: string;
  text?: string;
  template: string;
}

export class Editor extends HTMLElement {
  private _template: EditorTemplate;
  private _textEvent: CustomEvent;
  private _unique: number;
  private _eventsFormat: Record<string, IElementEvent> = {};

  constructor() {
    super();
    this._unique = uniqueHash();
    this._template = new EditorTemplate();
    this._textEvent = new CustomEvent("text", { detail: { text: "" } });
  }

  private _render() {
    const template = document.createElement("template");
    template.innerHTML = this._template.template;
    const style = document.createElement("style");
    style.innerHTML = this._template.style;
    this.appendChild(style);
    this.appendChild(template.content.cloneNode(true));
    this.setAttribute(Attributes.hash, this._unique.toString());
    this._eventsFormat = this._initEventFormats();
  }

  private _createElement({ tag, className, text, template }: IElementAttributes): Element {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    if (template) element.innerHTML = template;
    return element;
  }

  private _setCursorToEnd(elem: Element) {
    const newRange = document.createRange();
    newRange.setStartAfter(elem);
    newRange.setEndAfter(elem);
    const newSelection = window.getSelection();
    newSelection?.removeAllRanges();
    newSelection?.addRange(newRange);
  }

  private _getLineRange() {
    const sel = window.getSelection();
    if (!sel) return;
    let range;
    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0);
    } else {
      range = document.createRange();
      range.setStart(sel.anchorNode as Node, sel.anchorOffset);
      range.setEnd(sel.anchorNode as Node, sel.anchorOffset);
    }
    const node = range.startContainer;
    const text = node.nodeValue || "";
    let start = range.startOffset;
    let end = range.endOffset;
    while (start > 0 && text[start - 1] != "\n") {
      start--;
    }
    while (end < text.length && text[end] != "\n") {
      end++;
    }
    const lineRange = document.createRange();
    lineRange.setStart(node, start);
    lineRange.setEnd(node, end);
    return lineRange;
  }

  private _getSelection() {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const sourceRange = document.createRange();
      sourceRange.selectNode(this);
      const parent = range.commonAncestorContainer;
      console.log(parent);
      if (parent.nodeType === Node.ELEMENT_NODE) {
        parent.normalize();
        return;
      }
      if (
        range.compareBoundaryPoints(Range.START_TO_START, sourceRange) >= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, sourceRange) <= 0
      ) {
        const span = this._createElement({ tag: "span" } as IElementAttributes);
        range.surroundContents(span);
      }
    }
  }

  private _initEventFormats(): Record<string, IElementEvent> {
    const { bold } = this._template.classNames;
    return { bold: { selector: bold, function: this._bold.bind(this), eventName: "click" } };
  }

  private _addListener() {
    Object.keys(this._eventsFormat).forEach((key) => {
      const element = this.getElement(`.${this._eventsFormat[key].selector}`);
      element?.addEventListener(this._eventsFormat[key].eventName, this._eventsFormat[key].function);
    });
  }

  private _removeListener() {
    Object.keys(this._eventsFormat).forEach((key) => {
      const element = this.getElement(`.${this._eventsFormat[key].selector}`);
      element?.removeEventListener(this._eventsFormat[key].eventName, this._eventsFormat[key].function);
    });
  }

  private _bold() {
    // this._getSelection();
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    // seleccionar la linea ubicada el cursor
  }

  private _keyDownEvent(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      //TODO: Este bloque se ejecutara siempre y cuando no este aplicado un estilo
      const range = this._getLineRange();
      const p = this._createElement({ tag: "p" } as IElementAttributes);
      range?.surroundContents(p);
      this._setCursorToEnd(p);
      return;
    }

    if (e.key === "/") {
      //TODO: mostrar un modal con las opciones que existen formatear
      console.log("slash", e);
      return;
    }

    if (true) {
      //TODO: el texto ingresado es un markdown
      // validar que sea inicio de linea
    }
  }

  get j5Hash() {
    return this._unique;
  }

  getElement(query: string): Element | null {
    return this.querySelector(`[${Attributes.hash}='${this._unique}'] ${query}`);
  }

  connectedCallback() {
    this._render();
    this.addEventListener("keydown", this._keyDownEvent.bind(this));
    this._addListener();
  }

  disconnectedcallback() {
    this._removeListener();
    this.removeEventListener("keydown", this._keyDownEvent.bind(this));
  }
}
