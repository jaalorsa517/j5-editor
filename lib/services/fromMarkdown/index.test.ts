import { describe, test, expect } from "@jest/globals";
import { convertFromMarkdown } from "./index";

describe("[SERVICES] convertFromMarkdown", () => {
  test("markdown with head", () => {
    const mdHead = `# Hola mundo`;
    const shouldResponse = `<h1>Hola mundo</h1>`;
    expect(convertFromMarkdown(mdHead)).toMatch(shouldResponse);
  });
  test("markdown with multiple head", () => {
    const mdHeadMultiple = `## Hola mundo\n### Esta es la prueba de markdown`;
    const shouldResponse = `<h2>Hola mundo</h2><h3>Esta es la prueba de markdown</h3>`;
    expect(convertFromMarkdown(mdHeadMultiple)).toMatch(shouldResponse);
  });
});
