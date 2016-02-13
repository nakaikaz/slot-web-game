var Slot = {};
Slot.Boot = function(game){};
Slot.Boot.prototype = {

    preload: function(){
        this.load.image('preloaderBar', 'assets/images/480x800/loading-bar.png');
    },

    create: function(){
        if(window.parent.screen.width < 800){
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        this.state.start('Preloader');
    }
};
