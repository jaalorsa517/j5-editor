type ObjectFunctionStr_Void = Record<string, (value?: string) => void>;

const codeMarkdownOpen: ObjectFunctionStr_Void = {
  "#": (value?: string) => `<h1>${value ?? ""}</h1>`,
  "##": (value?: string) => `<h2>${value ?? ""}</h2>`,
  "###": (value?: string) => `<h3>${value ?? ""}</h3>`,
  "####": (value?: string) => `<h4>${value ?? ""}</h4>`,
  "#####": (value?: string) => `<h5>${value ?? ""}</h5>`,
  "######": (value?: string) => `<h6>${value ?? ""}</h6>`,
};
const codeMarkdown: ObjectFunctionStr_Void= {
  "```": (value?: string) => `<code>${value ?? ""}</code>`,
  "`": (value?: string) => `<code>${value ?? ""}</code>`,
  // "*\t": (value?: string) => `<li>${value ?? ""}</li>`,
  // "-\t": (value?: string) => `<li>${value ?? ""}</li>`,
  // "+\t": (value?: string) => `<li>${value ?? ""}</li>`,
  ">": (value?: string) => `<blockquote>${value ?? ""}</blockquote>`,
  // "![": (value?: string) => `<img src="${value ?? ""}" />`,
  // "[": (value?: string) => `<a href="${value ?? ""}">${value ?? ""}</a>`,
  // "": (value?: string) => `<p>${value ?? ""}</p>`,
  "**": (value?: string) => `<b>${value ?? ""}</b>`,
  __: (value?: string) => `<b>${value ?? ""}</b>`,
  "***": (value?: string) => `<b><i>${value ?? ""}</i></b>`,
  "*": (value?: string) => `<i>${value ?? ""}</i>`,
  _: (value?: string) => `<i>${value ?? ""}</i>`,
  // "~~": (value?: string) => `<del>${value ?? ""}</del>`,
};

export function isMarkdown(value: string): boolean {
  return Object.keys(codeMarkdown).includes(value);
}

export function convertFromMarkdown(value: string) {
  const regex = new RegExp(`(${Object.keys(codeMarkdownOpen).join("|")})\\s{1}(.*)\\n?`, "g");

  return value.replaceAll(regex, (_, ...args) => {
    const [matchArg, text, , str] = args;
    if (!Reflect.has(codeMarkdownOpen, matchArg)) return str;
    return codeMarkdownOpen[matchArg](text ?? "");
  });
}
