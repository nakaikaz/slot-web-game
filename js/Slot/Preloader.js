Slot.Preloader = function(game){};
Slot.Preloader.prototype = {

    PRELOADBAR_WIDTH: 400,

    preload: function(){
        this.preloadBar = this.add.sprite((this.game.width - this.PRELOADBAR_WIDTH) / 2, this.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.progressText = this.add.text((this.game.width - this.PRELOADBAR_WIDTH) / 2, this.world.centerY - 60, '', {font: '28px Arial', fill: '#d9e021'});
        this.load.onFileComplete.add((function(){
            this.progressText.text = this.load.progress + '%';
        }).bind(this), this);

        //this.load.atlasXML('spinsheet1', 'assets/images/480x800/spinanim1.png', 'assets/images/480x800/spinanim1.xml');
        this.load.atlasJSONHash('spinsheet1', 'assets/images/480x800/spinanim1.png', 'assets/images/480x800/spinanim1.json');
        this.load.atlasJSONHash('spinsheet2', 'assets/images/480x800/spinanim2.png', 'assets/images/480x800/spinanim2.json');
        this.load.atlasJSONHash('spinsheet3', 'assets/images/480x800/spinanim3.png', 'assets/images/480x800/spinanim3.json');
        this.load.image('panel', 'assets/images/480x800/gamepanel.png');
        this.load.spritesheet('arrow', 'assets/images/480x800/arrow.png', 15, 15);
        this.load.spritesheet('stop-button', 'assets/images/480x800/stop-button.png', 100, 50);
        this.load.spritesheet('spin-button', 'assets/images/480x800/spin-button.png', 100, 100);
        this.load.image('hit-line', 'assets/images/480x800/hit-line.png');
        this.load.image('star', 'assets/images/480x800/star.png');
        this.load.audio('spin-button-audio', 'assets/audio/spin-button.ogg');
        this.load.audio('stop-button-audio', 'assets/audio/stop-button.ogg');
        this.load.audio('game-theme-audio', 'assets/audio/theme-tune.ogg');
    },

    create: function(){
        this.state.start('Game');
    }

};
