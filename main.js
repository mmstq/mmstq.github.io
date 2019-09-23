function goTo(url) {
    window.location.href = url;
}


let right;
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
    console.log("rightScrollTop: " + winScroll);



    var height = right.scrollHeight;
    console.log(right.scrollHeight);
    var scrolled = (winScroll / height);
    console.log(scrolled)
    var percent = scrolled * 100;
    document.getElementById("myBar").style.height =
        percent + "%";
}