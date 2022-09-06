
function customOnLoad() {
    const bodyElem = document.getElementById('blog-body');
    bodyElem?.classList?.remove?.('is-loading');
}


const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/serviceWorker.js');
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

setTimeout(() => {
    customOnLoad?.();
    if (window?.hljs != null) hljs?.highlightAll?.()

    registerServiceWorker();
}, 250);