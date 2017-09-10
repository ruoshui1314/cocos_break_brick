const Paddle = require('Paddle');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreFXPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },

        ball: {
            default: null,
            type: cc.Node
        },
        
        paddle: {
            default: null,
            type: Paddle
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        // 开始按钮
        startBtn: {
            default: null,
            type: cc.Node
        },
        // 结束标签
        gameOverNode: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad: function () {
        this.startBtn.active = false;
        this.gameOverNode.active = false;
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        this.score = 0;
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        this.fx = cc.instantiate(this.scoreFXPrefab).getComponent('ScoreFX');
        this.fx.node.setPosition(cc.p(-200, -500));
        this.node.addChild(this.fx.node);
        this.ball.getComponent('Ball').game = this;
        this.paddle.startMove(cc.p(0, this.groundY));
    },

    gainScore: function (pos) {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
        this.fx.node.setPosition(pos);
        this.fx.play();
    },

    gameOver: function () {
        this.startBtn.active = true;
        this.gameOverNode.active = true;
        this.paddle.stopMove();
    },

    onStartClick: function (event){
        cc.director.loadScene("Game");
    },

    onBallContactBrick: function (ballNode, brickNode) {
        brickNode.destroy();
        this.gainScore(ballNode.getPosition());
    },

    onBallContactGround: function (ballNode, groundNode) {
    },

    onBallContactPaddle: function (ballNode, paddleNode) {

    },

    onBallContactWall: function (ballNode, brickNode) {

    },

    detectGameOver: function (pos) {
        if (this.paddle.node.y > pos.y) {
            this.gameOver();
        }
    }
});
