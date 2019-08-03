import 'pixi';
import 'p2';
import 'phaser';

import {Config} from './config';

import {Boot} from './states/boot';
import {Preload} from './states/preload';
import {Game} from './states/game';

class Template extends Phaser.Game {
    constructor() {
        super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Game', Game, false);

        this.state.start('Boot');
    }
}

// @ts-ignore
const isCordovaApp = !!window.cordova;
const cordovaApp = {
    // Application Constructor
    initialize() {
        if (isCordovaApp) {
            this.bindEvents();
        } else {
            this.onDeviceReady();
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('backbutton', () => {
            // @ts-ignore
            navigator.app.exitApp();
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady() {
        // Do some plugin initialization
        this.bootGame();
    },
    bootGame() {
        new Template();
    }
};

cordovaApp.initialize();