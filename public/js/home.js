$(document).ready(function () {
    var myGameArea = {
        canvas: $("#myGameCanvas")[0],
        start: function () {
            this.canvas.width = 970;
            this.canvas.height = 1350;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }


    var myGamePiece;
    var myGamePiece2;
    function getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $.getJSON("../data/homeRac.json", function (raccoons) {
        var a = getRand(0, 6);
        var b = getRand(0, 6);
        while (a == b) {
            b = getRand(0, 6);
        }
        var x1 = getRand(0, 650);
        var y1 = getRand(600, 1000);
        var x2 = getRand(0, 650);
        var y2 = getRand(600, 1000);
        while (Math.abs(x1 - x2) < 200) {
            x2 = getRand(0, 650);
        }
        while (Math.abs(y1 - y2) < 200) {
            y2 = getRand(600, 1000);
        }

        var k = 4;
        var m1 = getRand(-k, k);
        var m2 = getRand(-k, k);
        while (m1 == 0) m1 = getRand(-k, k);
        while (m2 == 0) m2 = getRand(-k, k);

        myGamePiece = new component(raccoons[a].width, raccoons[a].height, "../images/Racoons/" + raccoons[a].src, x1, y1, "image", m1);
        myGamePiece2 = new component(raccoons[b].width, raccoons[b].height, "../images/Racoons/" + raccoons[b].src, x2, y2, "image", m2);
    });

    function startGame() {
        myGameArea.start();
        var x = readCookie('userName');
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        if (x != null) {
            clickStart();
        }
    }

    function component(width, height, color, x, y, type, m) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.m = m;
        this.update = function () {
            ctx = myGameArea.context;
            if (type == "image") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.moveToRight = true;
        this.move = function () {
            if (this.moveToRight) {
                this.x += this.m;
            } else {
                this.x -= this.m;
            }
            if (this.x < 0 | this.x > myGameArea.canvas.width - this.width) {
                this.moveToRight = !this.moveToRight;
            }
        }
    }

    function updateGameArea() {
        myGameArea.clear();
        myGamePiece.move();
        myGamePiece2.move();
        myGamePiece.update();
        myGamePiece2.update();
    }

})