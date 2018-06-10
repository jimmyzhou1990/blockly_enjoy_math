var car1_level2_start_position_x = 2;
var car1_level2_end_position_x = 416;
var car1_level2_position_y = 400;
var car2_level2_start_position_x = 432;
var car2_level2_end_position_x = 2;
var car2_level2_position_y = 346;


function initDrawCarLevel2() {
    Car.bground.draw();   //背景
    Car.role.draw(0, car1_level2_start_position_x, car1_level2_position_y);      //车1
    Car.role.draw(1, car2_level2_start_position_x, car2_level2_position_y);      //车2
}

function car_exec_level2(code) {
    console.log(code);
    var code = code;
    var index = 0;
    var speed = 0;
    var run_time = 0;
    var levelInterval = null;
    var status = 0;   //0 正确 1未达到目的地 2超过目的地
    var car1_x ;
    var car1_y ;
    var car2_x ;
    var car2_y ;
    var distance = 0;

    if (Car.button.status == 0)
    {
        Car.button.status = 1;
        $("#runCode").html(Car.button.text[1]);
        parseSpeedAndTime();

        if (speed>0 && run_time>0)
        {
            console.log(500.0/speed);
            /* 运行动画 */
            distance = speed*run_time;

            if (distance > 6000)  distance = 6000;

            if (distance > 4000)
            {
                status = 2;
            }
            else if (distance < 4000)
            {
                status = 1;
            }

            car1_x = car1_level2_start_position_x;
            car1_y = car1_level2_position_y;
            car2_x = car2_level2_start_position_x;
            car2_y = car2_level2_position_y;
            distance = distance*(car1_level2_end_position_x-car1_level2_start_position_x)/6000;
            levelInterval = setInterval(animate, 20);
            var sound = document.getElementById('run_sound');
            sound.play();

        }
        else
        {
            Car.popover('输入不正确哦!')
        }

    }
    else if (levelInterval == null)  //不在运行
    {
        Car.button.status = 0;
        $("#runCode").html(Car.button.text[0]);
        initDrawCarLevel2();
    }

    function parseSpeedAndTime() {
        for (var i=0; i<code.length; i++)
        {
            if (code[i] === 'v')
            {
                speed = parseInt(code.slice(i+1, code.length));
            }
            else if (code[i] === 'r')
            {
                run_time = parseInt(code.slice(i+1, code.length));
            }
        }
    }

    function animate() {
        car1_x += 2;
        car2_x -= (500.0/speed)*2;
        if (car1_x < distance)
        {
            Car.bground.draw();
            Car.role.draw(0, car1_x, car1_y);
            Car.role.draw(1, car2_x, car2_y);
        }
        else
        {
            console.log("Car animateLevel1 end...");
            clearInterval(levelInterval);
            level2Interval = null;
            switch (status)
            {
                case 0:
                    Car.popover('恭喜你，成功相遇!');
                    break;
                case 1:
                    Car.popover('没有到相遇哦!');
                    break;
                case 2:
                    Car.popover('超过了相遇地点!');
                    break;
            }
        }
    }
}

function carShowAnswerLevel2() {
    
}