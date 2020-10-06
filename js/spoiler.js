(function (document) {
    [].forEach.call(document.getElementsByClassName('Hide'), function(panel) {
        panel.getElementsByClassName('Hide-title')[0].onclick = function() {
            panel.classList.toggle("collapsed");
            panel.classList.toggle("expanded");
        }
    });
})(document);
