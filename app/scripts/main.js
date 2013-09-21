
$(document).ready(
    function () {

        $("nav li").click(
            function (event) {
                var liItem = $(event.target);
                if (!$(event.target).is("a")) {
                    document.location.pathname = $(event.target).find("a").attr("href");
                }
            }
        );

        generateCata();
        slider();
    }
);


function generateCata() {
    var cata = $("<div class='cata'></div>");

    $("div.modele").hide().each(
        function (index, item) {
            var modele = $(item), cataItem;

            cataItem = $(
                "<div class='cataItem'>" +
                    "<div class='cataLabel'>" +
                    "<p>" + modele.find("h2").text() + "</p>" +
                    "</div>" +
                    "<img src='" + modele.find("img:first").attr("src") + "'>" +
                "</div>"
            );
            cata.append(cataItem);

            cataItem.click(
                function (event) {
                    $("div.modele").fadeOut(100); //.eq(index).fadeIn(500);
                    modele.fadeIn(500);
                    $("div.cata .cataItem").removeClass("selected");
                    $(event.currentTarget).addClass("selected");
                }
            );

        }
    );
    $("div.cata").replaceWith(cata);
    $("div.cata .cataItem:first").click();

}

function slider() {

    $("div.image.slider").each(
        function (index, item) {

            var slider, images, last;

            slider = $(item);
            images = slider.find("img").width(0);
            last = images.eq(0);
            last.width(446);

            function slide(index) {
                    var w;
                if (index === 0) {
                    w = last.width();
                    slider.prepend(last.width(0).clone().width(w));
                    slider.find("img").first().animate({ width: "0"}, 1000,
                        function () {
                            $(this).remove();
                        }
                    );
                } else {
                    last.animate({ width: "0"}, 1000);
                }
                last = images.eq(index);
                last.animate({width: 446}, 1000);
                setTimeout(
                    function () {
                        if (index + 1 < images.length) {
                            slide(index + 1);
                        } else {
                            slide(0);
                        }
                    },
                    5000
                );
            }

            slide(1);

            images.click(
                function () {
                    document.location.pathname = slider.find("a:first").attr("href");
                }
            );
        }
    );

}