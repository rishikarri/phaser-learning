$( document ).ready(()=>{
	console.log('hiiii');

	var game = new Phaser.Game(800, 600, Phaser.AUTO, $('#canvasLocation'), { preload: preload, create: create, update: update })

	function preload() {
	    game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}

	function create() {
		// we need to bring in physics so that we can jump off of ledges
		game.physics.startSystem(Phaser.Physics.ARCADE);
		

		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, 0, 'star');

		// create a platforms group that our ledges will live in 
		platforms = game.add.group();
		// enable bbody so that people can jump off of ledges 
		platforms.enableBody = true; 

		var ledge0 = platforms.create(-120, 500, 'ground');
	    ledge0.body.immovable = false;

		var ledge1 = platforms.create(500, 400, 'ground');
	    ledge1.body.immovable = false;

	    var ledge2 = platforms.create(-120, 300, 'ground');
	    ledge1.body.immovable = false;

	    var ledge3 = platforms.create(500, 200, 'ground');
	    ledge1.body.immovable = false;

	    var ledge4 = platforms.create(-120, 100, 'ground');
	    // the last ledge you can actually stay on
	    ledge4.body.immovable = true;


	}

	function update(){

	}
})