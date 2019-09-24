function goTo(url) {
    window.location.href = url;
}


window.onload = function () {
    document.getElementById('team').onclick = function () {
        goTo("https://stackoverflow.com/users/6439785/lekr0?tab=profile");
    }
    document.getElementById('github').onclick = function () {
        goTo("https://github.com/mmstq");
    }
    document.getElementById('linkedin').onclick = function () {
        goTo("https://linkedin.com/in/mohd-mustak-2b4100187");
    }
    var right = document.getElementById("right-div");
    right.onscroll = function () {
        myFunction(right);

    };

}




function myFunction(right) {
    var winScroll = right.scrollTop;
    var height = right.scrollHeight - right.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.height =
        scrolled + "%";

}