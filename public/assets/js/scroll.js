window.onscroll = function () { onScrollFunc() };

function onScrollFunc() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    var postNav = document.querySelector(".navbar.post");
    if (postNav == null) return;

    var shouldBeShown = scrolled > 0;
    var hasShown = postNav.classList.contains('show');
    if (shouldBeShown && hasShown == false) {
        postNav.classList.add('show');
    }

    if (shouldBeShown == false && hasShown) {
        postNav.classList.remove('show');
    }

    var postNavProgress = document.querySelector(".navbar.post .progress");
    if (postNavProgress == null) return;

    postNavProgress.style.width = scrolled + "%";
}