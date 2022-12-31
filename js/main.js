$(document).ready(async function () {
    alert("Chào mừng bạn đến vui chơi có thưởng. Luật chơi rất đơn giản, bạn có sẵn 500k, hãy x10 tài khoản của mình để nhận quà nhé. Cap lại màn hình trên đth để nhận quà. (Refresh trang sẽ load lại từ đầu nên cẩn thận nhé)")
    let currentMoney = 500000;
    let plusVal = 10000;


    let stringMoney = vnDong(currentMoney)
    $(".keoNhaCai .card-header h3").html(`Tài khoản còn: ${stringMoney}`);

    $("#startGame").click(async function (e) {
        $(this).hide();
        let time = 5;
        let changeDTime = 0;
        await run(time, changeDTime)
    });
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 10000;

        if (count >= 0) {
            currentMoney += 10000;
            plusVal = 10000;
        } else {
            currentMoney += 0;
        }


        let stringMoney = vnDong(currentMoney)
        $(".keoNhaCai .card-header h3").html(`Tài khoản còn: ${stringMoney}`);

        count = count < 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');


        currentMoney -= plusVal;
        currentMoney = currentMoney <= 0 ? 0 : currentMoney;
        let stringMoney = vnDong(currentMoney)
        $(".keoNhaCai .card-header h3").html(`Tài khoản còn: ${stringMoney}`);

        if (currentMoney == 0) {
            $input.val(parseInt($input.val()) + plusVal);
            plusVal = 0
        } else {
            $input.val(parseInt($input.val()) + plusVal);
        }

        $input.change();
        return false;
    });

    async function run(time, changeDTime) {
        function interval1() {
            return new Promise(resolve => {
                const changD = setInterval(() => {
                    transformDice()
                    changeDice(RandInt(1, 6), RandInt(1, 6), RandInt(1, 6));
                    changeDTime += 100;
                    if (changeDTime >= 5900) {
                        clearInterval(changD)
                    }
                }, 100)
            });
        }

        function interval2() {
            return new Promise(resolve => {
                const countDown = setInterval(() => {
                    $("#result").html(time);
                    time--;
                    if (time == -1) {
                        let val1 = RandInt(1, 6)
                        let val2 = RandInt(1, 6)
                        let val3 = RandInt(1, 6)
                        let sum = val1 + val2 + val3;
                        changeDice(val1, val2, val3);
                        console.table(sum, val1, val2, val3);

                        let xiuValue = $("#xiuValue").val()
                        let taiValue = $("#taiValue").val()

                        if (sum >= 4 && sum <= 10) {

                            currentMoney = currentMoney + Number(xiuValue) * 2;
                            let stringMoney = vnDong(currentMoney)
                            $(".keoNhaCai .card-header h3").html(`Tài khoản còn: ${stringMoney}`);
                            $("#result").html(`<b class="text-success">Xỉu</b>`);
                            $("#xiuValue").val(0)
                            $("#taiValue").val(0)
                        } else {

                            currentMoney = currentMoney + Number(taiValue) * 2;
                            let stringMoney = vnDong(currentMoney)
                            $(".keoNhaCai .card-header h3").html(`Tài khoản còn: ${stringMoney}`);
                            $("#result").html(`<b class="text-danger">Tài</b>`);
                            $("#xiuValue").val(0)
                            $("#taiValue").val(0)
                        }

                        if (currentMoney>0) {
                            plusVal = 10000
                        }

                        $("#startGame").show()
                        clearInterval(countDown)
                    }
                }, 1000)
            });
        }
        await Promise.all([interval1(), interval2()])
    }

    const changeDice = (value1, value2, value3) => {
        $("#dice1").attr("class", null).addClass("bi").addClass(`bi-dice-${value1}`);
        $("#dice2").attr("class", null).addClass("bi").addClass(`bi-dice-${value2}`);
        $("#dice3").attr("class", null).addClass("bi").addClass(`bi-dice-${value3}`);
    }

    function transformDice() {
        $("#dice1").css({
            "transform": `translate(${RandInt(-20,20)}%, ${RandInt(-20,20)}%)`
        })
        $("#dice2").css({
            "transform": `translate(${RandInt(-20,20)}%, ${RandInt(-20,20)}%)`
        })
        $("#dice3").css({
            "transform": `translate(${RandInt(-20,20)}%, ${RandInt(-20,20)}%)`
        })
    }

    function RandInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function vnDong(number) {
        // Convert the number to a string and add commas as thousand separators
        var numberString = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // Add the Vietnamese currency symbol (đồng) to the beginning of the string
        return numberString + " đồng";
    }
});