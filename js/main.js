$(document).ready(async function () {
    $("#startGame").click(async function (e) {
        let time = 5;
        let changeDTime = 0;
        const changD = setInterval(() => {
            changeDice(RandInt(1, 6), RandInt(1, 6), RandInt(1, 6));
            changeDTime += 100;
            console.log(changeDTime);
            if (changeDTime >= 5900) {
                clearInterval(changD)
            }
        }, 100)
        const countDown = setInterval(() => {
            $("#result").html(time);
            console.log(time);
            time--;
            if (time == -1) {
                let val1 = RandInt(1, 6)
                let val2 = RandInt(1, 6)
                let val3 = RandInt(1, 6)
                let sum = val1 + val2 + val3;
                changeDice(val1, val2, val3);
                console.table(sum, val1, val2, val3);
                if (sum >= 4 && sum <= 10) {
                    $("#result").html(`<b class="text-success">Tài</b>`);
                } else {
                    $("#result").html(`<b class="text-danger">Xỉu</b>`);
                }
                clearInterval(countDown)
            }
        }, 1000)



        // changeDice;
        countDown;
    });


    const changeDice = (value1, value2, value3) => {
        $("#dice1").attr("class", null).addClass("bi").addClass(`bi-dice-${value1}`);
        $("#dice2").attr("class", null).addClass("bi").addClass(`bi-dice-${value2}`);
        $("#dice3").attr("class", null).addClass("bi").addClass(`bi-dice-${value3}`);
    }

    function RandInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});