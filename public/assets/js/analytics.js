
const initGoogleAnalytics = async () => {
    if (window.config?.gtag != null && window.config?.gtag?.length > 1) {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', window.config.gtag);
    }
};

initGoogleAnalytics();
