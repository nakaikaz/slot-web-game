var app = {
    phaser: null,
    // Application Constructor
    initialize: function() {
        this.phaser = new Phaser.Game(480, 800, Phaser.AUTO, '');
        this.phaser.state.add('Boot', Slot.Boot);
        this.phaser.state.add('Preloader', Slot.Preloader);
        this.phaser.state.add('Game', Slot.Game);
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var device = new Phaser.Device();
        if(device.android){
            document.addEventListener('deviceready', this.onDeviceReady(this.phaser), false);
        }else if(device.chrome || device.firefox || device.ie || device.safari || device.trident){
            window.addEventListener('load', this.onDeviceReady(this.phaser), false);
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function(phaser) {
        return function(){
            //app.receivedEvent('deviceready');
            phaser.state.start('Boot');
        };
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

app.initialize();
