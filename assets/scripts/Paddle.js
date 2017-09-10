cc.Class({
    extends: cc.Component,

    properties: {
        // 速度
        accel: 0,

        // 跳跃音效资源
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    startMove: function (pos) {
        this.enabled = true;
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        this.node.setPosition(pos);
        // 初始化键盘输入监听
        this.setInputControl();
    },

    getPosition: function(){
        return this.node.getPosition();
    },

    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
        }, self.node);
    },

    stopMove: function(){
        this.node.stopAllActions(); //停止 player 节点的跳跃动作
        this.xSpeed = 0;
        this.enabled = false;
    },

    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        this.xSpeed =  this.accLeft ?  -this.accel * dt : this.accel * dt;

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed;
        // limit player position inside screen
        if ( this.node.x > this.node.parent.width/2) {
            this.node.x = this.node.parent.width/2;
            this.xSpeed = 0;
        } else if (this.node.x < -this.node.parent.width/2) {
            this.node.x = -this.node.parent.width/2;
            this.xSpeed = 0;
        }
    },
});
