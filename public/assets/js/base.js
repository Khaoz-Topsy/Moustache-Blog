
function customOnLoad() {
    const bodyElem = document.getElementById('blog-body');
    bodyElem?.classList?.remove?.('is-loading');
}

setTimeout(() => {
    customOnLoad?.();
    hljs?.highlightAll?.()
}, 1000);