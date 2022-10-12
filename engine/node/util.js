
const MarkdownIt = require("markdown-it");

const markdown = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        return (
            '<pre><code class="hljs language-' + lang + '">' +
            markdown.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
}).use(require('markdown-it-copy'));

async function convertMarkdownToHtml(content) {
    const rendered = await markdown.render(content);
    return rendered;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function postDateFormat(dateString) {
    const d = new Date(dateString);
    return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
}

module.exports = {
    markdown: markdown,
    convertMarkdownToHtml: convertMarkdownToHtml,
    monthNames: monthNames,
    postDateFormat: postDateFormat,
}