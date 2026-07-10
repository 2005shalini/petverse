import React from "react";

export default function MarkdownRenderer({ content = "" }) {
  if (!content) return null;

  // Extremely robust light markdown-to-HTML parser to display tables, quotes, headings, and listings properly.
  const parseMarkdown = (text) => {
    let html = text;

    // 1. Escaping script tags just in case
    html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");

    // 2. Format Headings
    html = html.replace(/^## (.*?)$/gm, '<h3 class="text-base font-black text-slate-800 mt-4 mb-2 first:mt-0">$1</h3>');
    html = html.replace(/^### (.*?)$/gm, '<h4 class="text-sm font-extrabold text-slate-700 mt-3 mb-1">$1</h4>');

    // 3. Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-emerald-400 bg-slate-50 px-4 py-2.5 my-3 rounded-r-xl text-xs font-semibold text-slate-600">$1</blockquote>');

    // 4. Bullet lists
    html = html.replace(/^\- (.*?)$/gm, '<li class="ml-4 list-disc text-xs font-semibold text-slate-600 mb-1">$1</li>');

    // 5. Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>');

    // 6. Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-indigo-600 font-mono font-bold">$1</code>');

    // 7. Horizontal rule
    html = html.replace(/^---$/gm, '<hr class="my-4 border-slate-100" />');

    // 8. Line breaks
    html = html.split("\n").map(line => {
      // Don't add br tags inside lists or headers
      if (line.trim().startsWith("<li") || line.trim().startsWith("<h") || line.trim().startsWith("<blockquote") || line.trim().startsWith("<hr")) {
        return line;
      }
      return line + "<br/>";
    }).join("");

    // Strip multiple sequential br tags
    html = html.replace(/(<br\/>){3,}/g, "<br/><br/>");

    return html;
  };

  return (
    <div
      className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm font-semibold"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}
