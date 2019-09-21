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

}
let right;
window.onload = function () {
    console.log("onload")
    right = document.getElementById("right-div");
    console.log(right)
    right.onscroll = function () {
        myFunction();
        console.log("scroll");

    };
}


function myFunction() {
    var winScroll = document.body.scrollTop ||
        document.documentElement.scrollTop;
    console.log(winScroll);

    var height = document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    console.log(document.documentElement.scrollHeight);
    var scrolled = (winScroll / height) * 100;
    console.log(scrolled);
    document.getElementById("myBar").style.height =
        scrolled + "%";
}