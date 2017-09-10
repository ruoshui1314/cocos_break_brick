cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 4://球碰到砖块
                this.game.onBallContactBrick(self.node, other.node);
                break;
            case 3://球碰到地面
                this.game.onBallContactGround(self.node, other.node);
                break;
            case 2://球碰到托盘
                this.game.onBallContactPaddle(self.node, other.node);
                break;
        }
    },

    update: function () {
        this.game.detectGameOver(this.node.getPosition());
    }
});
