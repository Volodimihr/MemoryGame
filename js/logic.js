$(function () {
    // back card sheet
    const backImg = "/img/web_designing.svg";

    // images array
    const imgs = [
        "/img/angular.svg",
        "/img/asp.net_core.svg",
        "/img/html5.svg",
        "/img/javascript.svg",
        "/img/node.js.svg",
        "/img/php.svg",
        "/img/python.svg",
        "/img/react.svg"
    ];

    // is game started
    let isPlaying = false;

    // count of equal pairs
    let pairsDone = 0;

    // images for playing
    let fieldImgs = [...imgs, ...imgs];

    // checkable image path and front sheet
    let checkImg = "";
    let checkCardFront;

    // shuffle images of playing array
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // set back sheet image
    let imgb = $("<img />").prop("src", backImg);
    $(".card-back").append(imgb);


    // start new game function
    function newGame() {
        isClicked = false;
        isPlaying = false;
        pairsDone = 0;

        // shuffle cards for new game
        shuffle(fieldImgs);

        // add and set attribute that divs not was clicked
        $(".card").data("clicked", false);

        // clear previous game(remove images, backward background, rotate card to start position)
        $(".card-front").empty();
        $(".card-front").css("background", "radial-gradient(white, darkmagenta)");
        $(".card-inner").css("transform", "rotateY(0deg)");

        // create and append <img> with images
        let cardsFront = $(".card-front");
        for (let i = 0; i < fieldImgs.length; i++) {
            let imgf = new Image();
            imgf.src = fieldImgs[i];
            cardsFront[i].append(imgf);
        }
    }

    // start new game button 
    $("button").click(function () {
        $("#info").fadeOut(1000);
        $(".field").fadeIn(1000);

        newGame();
    });

    // rotate at cards on hover
    $(".card").hover(
        function () {
            if (isPlaying == false)
                $(this).children().first().css("transform", "rotateY(180deg)");
        },
        function () {
            if (isPlaying == false)
                $(this).children().first().css("transform", "rotateY(0deg)");
        }
    );

    // on click cards 
    $(".card").click(function () {
        // if game started
        if (isPlaying == false)
            isPlaying = true;

        // check if div was clicked
        if ($(this).data("clicked") == true) return;

        // keep card open
        $(this).children().first().css("transform", "rotateY(180deg)");

        // remember if first card 
        if (checkImg == "") {
            checkCardFront = $(this).find(".card-front");
            checkImg = checkCardFront.children().first().prop("src");
        }
        // if second card
        else {
            // if cards images equal
            if (checkImg == $(this).find(".card-front").children().first().prop("src")) {
                // change background color to green if equal
                checkCardFront.css("background", "lightgreen");
                $(this).find(".card-front").css("background", "lightgreen");

                pairsDone++;

                // if all equal it's victory
                if (pairsDone == 8)
                    win();
            }
            // if cards images not equal
            else {
                // change background color to red if not equal
                checkCardFront.css("background", "red");
                $(this).find(".card-front").css("background", "red");

                // if not equal player lose game
                setTimeout(lose, 1000);
            }

            // reset checkable front card and image to default
            checkCardFront = null;
            checkImg = "";
        }

        // div clicked
        $(this).data("clicked", true);
    });

    // if win game text result with fade effect
    function win() {
        $("#resultTxt").text("You Win !");
        $("#info").fadeIn(1000);
        $(".field").fadeOut(1000);
    }

    // if lose game text result with fade effect
    function lose() {
        $("#resultTxt").text("You Lose !");
        $("#info").fadeIn(1000);
        $(".field").fadeOut(1000);
    }
});