import { describe, test, expect, beforeAll } from "@jest/globals";
import { j5Editor } from "./main";

describe("[COMPONENTS] WebComponent Editor", () => {
  beforeAll(() => {
    j5Editor();
    const editor = document.createElement("j5-editor");
    editor.setAttribute("id", "editor");
    document.body.appendChild(editor);
  });
  test("should be ok", () => {
    const editor = document.querySelector("#editor");
    expect(editor).toBeTruthy()
  });
  test("should be have a j5-hash attribute", () => {
    const editor = document.querySelector("#editor");
    expect(editor?.getAttribute("j5-hash")).toBeTruthy();
  })
});
