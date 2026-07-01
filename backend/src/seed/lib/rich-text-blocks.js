'use strict';

/* ═══════════════════════════════════════════════════════
   Small builder for Strapi's "Rich Text (Blocks)" JSON format,
   used by shared.rich-text's `content` field. Lets seed scripts
   write plain strings (with **bold** markup) instead of hand-
   assembling the block tree.
═══════════════════════════════════════════════════════ */

/* Splits "some **bold** text" into inline text nodes with bold marks. */
function parseInline(str) {
  const parts = String(str).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) return { type: 'text', text: boldMatch[1], bold: true };
    return { type: 'text', text: part };
  });
}

function heading(level, text) {
  return { type: 'heading', level, children: parseInline(text) };
}

function paragraph(text) {
  return { type: 'paragraph', children: parseInline(text) };
}

function bulletList(items) {
  return {
    type: 'list',
    format: 'unordered',
    children: items.map((item) => ({ type: 'list-item', children: parseInline(item) })),
  };
}

/* Builds one `shared.rich-text` section from a heading + a mix of paragraph
   strings and { list: [...] } entries, e.g.:
   richTextSection('1. Introduction', ['Body text...'])
   richTextSection('2. Info', ['Intro line', { list: ['a', 'b'] }]) */
function richTextSection(headingText, bodyParts, headingLevel = 3) {
  const content = [heading(headingLevel, headingText)];
  for (const part of bodyParts) {
    if (part && typeof part === 'object' && Array.isArray(part.list)) {
      content.push(bulletList(part.list));
    } else {
      content.push(paragraph(part));
    }
  }
  return { __component: 'shared.rich-text', content };
}

module.exports = { parseInline, heading, paragraph, bulletList, richTextSection };
