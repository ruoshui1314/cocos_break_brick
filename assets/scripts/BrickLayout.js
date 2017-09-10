var Brick = require("Brick");

cc.Class({
    extends: cc.Component,

    properties: {
        brickPrefab: {
            default: null,
            type: cc.Prefab
        },
        brickSpace: 0,
        brickCol: 0,
        brickNumber: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },

    init() {
        this.node.removeAllChildren();
        for (var i = 0; i < 15; i++) {
            var brick = cc.instantiate(this.brickPrefab);
            brick.x = this.node.x - this.node.width / 2 + i %  this.brickCol * (brick.width +  this.brickSpace) + brick.width / 2;
            brick.y = this.node.y - Math.floor(i / this.brickCol) * (brick.height + this.brickSpace) - brick.height /2;
            brick.getComponent("Brick").init(Math.floor(Brick.TYPE.FIVE*Math.random()) + 1);
            this.node.addChild(brick);
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
