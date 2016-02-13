Slot.Game = function(game){
    this.spinsheet = [];
    this.spin = [];
    this.stopButton = [];
    this.frameIndexText = [];
    this.frameNameText = [];
};
Slot.Game.prototype = {

    GAME_TITLE: 'スロットゲーム プロトタイプ版',

    GAME_LOADED_MESSAGE: 'GAME LOADED.',

    SPIN_START_MESSAGE: 'START!',

    SPIN_STOP_MESSAGE: 'STOP!',

    fpsText: null,

    preload: function(){},

    create: function(){
        this.stage.backgroundColor = '#fff';

        this.spinsheet[0] = this.add.sprite(70, 0, 'spinsheet1', 0);
        this.spin[0] = this.spinsheet[0].animations.add('spin');
        this.spin[0].onStart.add(this.onSpin1StartHandler, this);
        this.spin[0].onLoop.add(this.onSpin1LoopHandler, this);
        // ループさせるのでonCompleteはコールされない
        //spin[0].onComplete.add(this.onSpin1CompleteHandler, this);
        this.spinsheet[1] = this.add.sprite(190, 0, 'spinsheet2', 0);
        this.spin[1] = this.spinsheet[1].animations.add('spin');
        this.spinsheet[2] = this.add.sprite(310, 0, 'spinsheet3', 0);
        this.spin[2] = this.spinsheet[2].animations.add('spin');
        //console.dir(spin[2]);

        this.panel = this.add.sprite(0, -1, 'panel');
        this.add.sprite(55, 450, 'arrow', 0);
        this.add.sprite(410, 450, 'arrow', 1);

        this.hitLine = this.add.sprite(115, 518, 'hit-line');
        this.hitLine.alpha = 0;

        /*emitter = game.add.emitter(game.world.centerX, 200, 100);
        emitter.makeParticles('star');
        emitter.setRotation(0, 0);
        emitter.setAlpha(1.0, 0.0);
        emitter.setScale(0.5, 0.5);
        emitter.gravity = -200;
        emitter.start(false, 5000, 100);*/

        this.stopButton[0] = this.add.button(70, 570, 'stop-button', (function(){
            /*fadeOutTween[0].start();
            fadeInTween[0].start();
            stopTween[0].start();*/
            this.stopButtonAudio.play();
            this.spin[0].stop();
            var frame = this.spin[0].currentFrame.index;
            if(frame % 4 === 1){
                this.spin[0].next(3);
            }else if(frame % 4 === 2){
                this.spin[0].next(2);
            }else if(frame % 4 === 3){
                this.spin[0].next(1);
            }
            if(!this.isSomeOfWheelsPlaying()){
                this.gameStateText.text = this.SPIN_STOP_MESSAGE;
                this.isThreeSymbolsMatched();
            }
        }).bind(this), this, 0, 0, 1, 0);
        /*stopButton[0].events.onInputUp.add(function(){
        }, this);*/
        this.stopButton[1] = this.add.button(190, 570, 'stop-button', function(){
            this.stopButtonAudio.play();
            this.spin[1].stop();
            var frame = this.spin[1].currentFrame.index;
            if(frame % 4 === 1){
               this.spin[1].next(3);
            }else if(frame % 4 === 2){
               this.spin[1].next(2);
            }else if(frame % 4 === 3){
               this.spin[1].next(1);
            }
            if(!this.isSomeOfWheelsPlaying()){
                this.gameStateText.text = this.SPIN_STOP_MESSAGE;
                this.isThreeSymbolsMatched();
            }
        }, this, 0, 0, 1, 0);
        this.stopButton[2] = this.add.button(310, 570, 'stop-button', function(){
            this.stopButtonAudio.play();
            this.spin[2].stop();
            var frame = this.spin[2].currentFrame.index;
            if(frame % 4 === 1){
                this.spin[2].next(3);
            }else if(frame % 4 === 2){
                this.spin[2].next(2);
            }else if(frame % 4 === 3){
                this.spin[2].next(1);
            }
            if(!this.isSomeOfWheelsPlaying()){
                this.gameStateText.text = this.SPIN_STOP_MESSAGE;
                this.isThreeSymbolsMatched();
            }
        }, this, 0, 0, 1, 0);

        this.spinButton = this.add.button(this.world.centerX, 640, 'spin-button', this.spinButtonHandler, this, 0, 0, 1, 0);
        this.spinButton.anchor.setTo(0.5, 0);

        // tween
        /*stopTween[0] = game.add.tween(wheel[0]).to({y: '+900'}, 1600, Phaser.Easing.Linear.None, false)
                                        .to({y: '+200'}, 1200, Phaser.Easing.Bounce.Out);
        stopTween[1] = game.add.tween(wheel[1]).to({y: '+900'}, 1600, Phaser.Easing.Linear.None, false)
                                        .to({y: '+200'}, 1200, Phaser.Easing.Bounce.Out);
        fadeInTween[0] = game.add.tween(wheel[0]).to({alpha: 1}, 1200, Phaser.Easing.Linear.None, false);
        fadeInTween[1] = game.add.tween(wheel[1]).to({alpha: 1}, 1200, Phaser.Easing.Linear.None, false);
        fadeOutTween[0] = game.add.tween(spinsheet[0]).to({alpha: 0}, 600, Phaser.Easing.Linear.None, false);
        fadeOutTween[0].onComplete.add(fadeOutTween0CompleteHandler, this);
        fadeOutTween[1] = game.add.tween(spinsheet[1]).to({alpha: 0}, 600, Phaser.Easing.Linear.None, false);
        fadeOutTween[1].onComplete.add(fadeOutTween1CompleteHandler, this);*/

        /*star = game.add.sprite(300, 200, 'star');
        star.scale.set(0.5, 0.5);
        console.log(star);
        starTween = game.add.tween(star).to({x: 340, y: 0, alpha: 0}, 1000, Phaser.Easing.Quadratic.In);*/

        // タイマー

        // テキスト
        this.gameStateText = this.add.text(this.world.centerX, 100, this.GAME_LOADED_MESSAGE, {font: '42px Arial', fill: '#fff'});
        this.gameStateText.anchor.setTo(0.5, 0);
        var textStyle = {font: '21px Arial', fill: '#fff'};
        this.frameIndexText[0] = this.add.text(70, 250, '', textStyle);
        this.frameIndexText[1] = this.add.text(190, 250, '', textStyle);
        this.frameIndexText[2] = this.add.text(310, 250, '', textStyle);
        textStyle = {font: '18px Arial', fill: '#fff'};
        this.frameNameText[0] = this.add.text(70, 300, '', textStyle);
        this.frameNameText[1] = this.add.text(190, 300, '', textStyle);
        this.frameNameText[2] = this.add.text(310, 300, '', textStyle);
        textStyle= {font: '26px Arial', fill: '#fff', align: 'center'};
        this.gameTitleText = this.add.text(this.world.centerX, 50, this.GAME_TITLE, textStyle);
        this.gameTitleText.anchor.set(0.5);
        textStyle= {font: '21px Arial', fill: '#fff'};
        this.fpsText = this.add.text(this.world.centerX, 200, '', textStyle);

        this.game.time.advancedTiming = true;

        // 入力

        // オーディオ
        if(this.game.device.android){
            var basePath = '/android_asset/www/assets/audio/';
            this.spinButtonAudio = new Media(basePath + 'spin-button.ogg');
            this.stopButtonAudio = new Media(basePath + 'stop-button.ogg');
            this.gameThemeAudio = new Media(basePath + 'theme-tune.ogg');
            this.gameThemeAudio.play();
        }else{
            this.spinButtonAudio = this.add.audio('spin-button-audio');
            //spinButtonAudio.addMarker('spinButtonClickSound', 0.01, 0.6);
            this.stopButtonAudio = this.add.audio('stop-button-audio');
            //stopButtonAudio.addMarker('stopButtonClickSound', 0, 0.195);
            this.gameThemeAudio = this.add.audio('game-theme-audio', 1, true);
            this.gameThemeAudio.play('', 0, 1, true);
        }

        //game.world.scale.set(0.85, 0.85);
    },

    isSomeOfWheelsPlaying: function(){
        if(this.spin[0].isPlaying || this.spin[1].isPlaying || this.spin[2].isPlaying){
            return true;
        }
        return false;
    },

    isThreeSymbolsMatched: function(){
        var name0 = this.spin[0].currentFrame.name;
        var name1 = this.spin[1].currentFrame.name;
        var name2 = this.spin[2].currentFrame.name;
        if(name0 === name1 && name1 === name2 && name2 === name0){
            this.flickerTimer = this.time.create(false);
            this.flickerTimer.loop(Phaser.Timer.HALF, (function(){
                this.hitLine.alpha = (this.hitLine.alpha === 1) ? 0 : 1;
            }).bind(this), this);
            this.flickerTimer.start();
            //starTween.start();
        }
    },

    /*function stopTweenOnCompleteHandler(){
    }*/

    fadeOutTween0CompleteHandler: function(){
        this.spin[0].stop();
        this.gameStateText.text = this.SPIN_STOP_MESSAGE;
    },

    fadeOutTween1CompleteHandler: function(){
        this.spin[1].stop();
    },

    spinButtonHandler: function(){
        if(!this.spin[0].isPlaying && !this.spin[1].isPlaying && !this.spin[2].isPlaying){
            if(this.flickerTimer){
                this.flickerTimer.destroy();
                this.flickerTimer = null;
            }
            this.spinButtonAudio.play();
            this.spin[0].play(30, true);
            //spin[0].delay = 50;
            this.spin[1].play(30, true);
            this.spin[2].play(30, true);
            this.gameStateText.text = this.SPIN_START_MESSAGE;
        }
    },

    onSpin1StartHandler: function(sprite, animation){
        /*wheel[0].alpha = 0;
        wheel[0].y = -1500;
        spinsheet[0].alpha = 1;*/
    },

    onSpin1LoopHandler: function(sprite, animation){},

    onSpin1CompleteHandler: function(sprite, animation){},

    render: function(){
        this.frameIndexText[0].text = '[0]: ' + this.spin[0].currentFrame.index;
        this.frameIndexText[1].text = '[1]: ' + this.spin[1].currentFrame.index;
        this.frameIndexText[2].text = '[2]: ' + this.spin[2].currentFrame.index;
        this.frameNameText[0].text = this.spin[0].currentFrame.name;
        this.frameNameText[1].text = this.spin[1].currentFrame.name;
        this.frameNameText[2].text = this.spin[2].currentFrame.name;
        this.fpsText.text = this.game.time.fps + ' fps';
    }
};
