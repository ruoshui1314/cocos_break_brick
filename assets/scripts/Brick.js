const TYPE = cc.Enum({
    ZERO:0,
    ONE:1,
    TWO:2,
    THREE:3,
    FOUR:4,
    FIVE:5,
});

cc.Class({
    extends: cc.Component,

    properties: {
        picOne:cc.SpriteFrame,
        picTwo:cc.SpriteFrame,
        picThree:cc.SpriteFrame,
        picFour:cc.SpriteFrame,
        picFive:cc.SpriteFrame,
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function (type){
        switch(type){
            case TYPE.ZERO:
                this.getComponent(cc.Sprite).spriteFrame = null;
                break;
            case TYPE.ONE:
                this.getComponent(cc.Sprite).spriteFrame = this.picOne;
                break;
            case TYPE.TWO:
                this.getComponent(cc.Sprite).spriteFrame = this.picTwo;
                break;
            case TYPE.THREE:
                this.getComponent(cc.Sprite).spriteFrame = this.picThree;
                break;
            case TYPE.FOUR:
                this.getComponent(cc.Sprite).spriteFrame = this.picFour;
                break;
            case TYPE.FIVE:
                this.getComponent(cc.Sprite).spriteFrame = this.picFive;
                break;
            default:break;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = {
    TYPE:TYPE,
};