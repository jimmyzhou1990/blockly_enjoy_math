var Game = {};

Game.MAX_LEVEL = 5;
Game.LEVEL = 1;
Game.workspace = null;
Game.text = [
    "如图，正方形边长为4厘米，求该正方形面积。",
    "如图，长方形长为4厘米，宽为3厘米，求该长方形面积。",
    "如图，圆的半径为2厘米，求该圆面积。",
    "如图，三角形的底为4厘米，高为3厘米，求该三角形面积。",
    "如图，正方形ABCD的边长是4厘米，分别以B,D为圆心，以4厘米为半径在正方形内画圆，求阴影部分面积。"
];

Game.blocks = [
    ['math_number', 'math_arithmetic', 'figure_print'],
    ['math_number', 'math_arithmetic', 'figure_print'],
    ['math_number', 'math_arithmetic', 'figure_print'],
    ['math_number', 'math_arithmetic', 'figure_print'],
    ['math_number', 'math_arithmetic', 'figure_circle_area', 'figure_square_area', 'figure_print'],
];

Game.changeLevel = function () {
    Game.cur = $(this);
    Game.LEVEL = Game.cur.html();
    var prbnum = Game.LEVEL - 1;

    /* 下一关 */
    Game.reloadBlocks();
    var src = "img\\figure\\" + Game.LEVEL + ".png";
    $("#prb").attr("src",src);
    $("#text").html(Game.text[prbnum]);
}

/* 关卡显示与选择 */
Game.displayLevelLink = function() {
    //  动态生成关卡按钮
    var levelLink = document.getElementById('levelLink');
    var a = null, button = null;

    var wateraction = function() {
        var cur = $(this);
        var dest = cur.position().left;
        var t = 1;
        TweenMax.to($('.select'), t, { x: dest, ease: Back.easeOut });
        //		动态获得关卡数字
        $('.select').html(cur.html());

    };

    for(var i = 1; i <= Game.MAX_LEVEL; ++i) {
        a = document.createElement('a');
        a.innerHTML = i;
        a.addEventListener('mouseover', wateraction);
        a.addEventListener('click', Game.changeLevel);
        a.classList.add('levelbtn');
        levelLink.appendChild(a);

        if(i === 1){
            Game.cur = $(a);
        }
    }

    //	鼠标离开dots时,select返回选中关卡
    $('.dots').mouseleave(function(){
        var dest = Game.cur.position().left;
        var t = 1;
        TweenMax.to($('.select'), t, { x: dest, ease: Back.easeOut });
        $('.select').html(Game.cur.html());
    })

    //	选中关卡后,水滴停留在对应关卡
    $('.select').css('left', Game.cur.position().left+15).html(Game.LEVEL);
}

/* 根据关卡获取blocks */
Game.getBlocksByLevel = function () {
    var toolbox = document.getElementById('toolbox');
    toolbox.innerHTML = "";  //清空所有block
    var block = null;
    var blocks = [];

    // Block type needed.
    blocks = Game.blocks[Game.LEVEL - 1];

    // Create toolbox xml.
    for(var index in blocks) {
        block = document.createElement('block');
        block.setAttribute('type', blocks[index]);
        toolbox.appendChild(block);
    }
}

/* 重新加载blocks */
Game.reloadBlocks = function () {
    Game.getBlocksByLevel();   //更新xml
    Game.workspace.clear();    //清除blocks
    var toolboxText = document.getElementById('toolbox').outerHTML;
    var xml = Blockly.Xml.textToDom(toolboxText);

    Game.workspace.updateToolbox(xml);
}

/* Blocks 初始化 */
Game.initBlocks = function () {
    Game.getBlocksByLevel();
    var toolboxText = document.getElementById('toolbox').outerHTML;
    var toolboxXml = Blockly.Xml.textToDom(toolboxText);

    Game.workspace = Blockly.inject('workspce_block', {
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        media:'media/',
        toolbox: toolboxXml,
        trashcan: true,
        zoom: {
            controls: true,
            wheel: false
        }
    });

    $("#showCode").click(function(){
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
        eval(code);
    });
}

Game.init = function() {
    Game.displayLevelLink();
    Game.initBlocks();
}

$(function () {
    Game.init();
})