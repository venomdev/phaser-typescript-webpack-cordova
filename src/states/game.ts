import Phaser from 'phaser-ce';
import GameTemplate from '~/global';
import Mushroom from '~prefabs/mushroom';

export default class Game extends Phaser.State {

	private mushroom: Mushroom;
	private cursors: Phaser.CursorKeys;
	private text: Phaser.BitmapText;
	private spaceKey: Phaser.Key;

	public create(): void {
		// Play music
		GameTemplate.Sound.playMusic();
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 100, 'font', 'Press Arrows / Space / Drag', 15);
		this.text.x -= ~~(this.text.width * 0.5);

		this.mushroom = new Mushroom(this.state.getCurrentState().game, this.game.world.centerX, this.game.world.centerY);
		this.game.add.existing(this.mushroom);
		//  Input Enable the sprites
		this.mushroom.inputEnabled = true;

		//  Allow dragging - the 'true' parameter will make the sprite snap to the center
		this.mushroom.input.enableDrag(true);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceKey.onDown.add(() => {
			GameTemplate.Sound.playSound('button');
			this.mushroom.x = this.game.world.centerX;
			this.mushroom.y = this.game.world.centerY;
		}, this);
	}

	public update(): void {
		this.game.input.update();

		if (this.cursors.down.isDown) {
			this.mushroom.position.y++;
		}
		if (this.cursors.up.isDown) {
			this.mushroom.position.y--;
		}
		if (this.cursors.left.isDown) {
			this.mushroom.position.x--;
		}
		if (this.cursors.right.isDown) {
			this.mushroom.position.x++;
		}
	}
}
