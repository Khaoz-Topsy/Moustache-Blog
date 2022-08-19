
const MarkdownIt = require("markdown-it");

const markdown = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        return (
            '<pre><code class="hljs">' +
            markdown.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
});

async function convertMarkdownToHtml(content) {
    console.log("Converting Markdown to HTML...");
    const rendered = await markdown.render(content);
    return rendered;
}

module.exports = {
    markdown: markdown,
    convertMarkdownToHtml: convertMarkdownToHtml,
}