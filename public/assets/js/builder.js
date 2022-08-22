

const markdown = window.markdownit({
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
    const rendered = await markdown.render(content);
    return rendered;
}


// function editClick(e) {
//     e?.preventDefault?.();
//     tabClickCommon(e, 'editor');
// }

// function previewClick(e) {
//     e?.preventDefault?.();
//     tabClickCommon(e, 'preview');
// }

// function tabClickCommon(e, prefix) {
//     setTabActive(prefix);
//     setTabContentVisible(prefix);
// }

// function setTabActive(prefix) {
//     const tabElems = document.querySelectorAll('.tabs > ul > li');
//     for (const tabElem of tabElems) {
//         tabElem.classList.remove('is-active');
//     }
//     const currentTab = document.querySelector('#' + prefix + '-tab');
//     currentTab.classList.add('is-active');
// }

// function setTabContentVisible(prefix) {
//     const tabContentElems = document.querySelectorAll('.tab-content');
//     for (const tabContentElem of tabContentElems) {
//         tabContentElem.classList.add('hidden');
//     }
//     const currentTab = document.querySelector('#' + prefix + '-tab-content');
//     currentTab.classList.remove('hidden');
// }


var simplemde = new SimpleMDE({
    element: document.getElementById('builder-textarea'),
    previewRender: function (plainText, preview) {
        convertMarkdownToHtml(plainText)
            .then(html => preview.innerHTML =
                `<div class="content"><div class="markdown-content">${html}</div></div>`
            );
        return 'Loading...'; // Returns HTML from a custom parser
    },
});
