$( document ).ready(()=>{
	console.log('hiiii');

	var game = new Phaser.Game(800, 600, Phaser.AUTO, $('#canvasLocation'), { preload: preload, create: create, update: update })

	function preload() {
	    game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	    // game.load.spritesheet('darkKnight', 'assets/dksa_720.png', 92, 104);
	}
	var player, cursors

	var ledge0, ledge1, ledge2, ledge3, ledge4

	function create() {
		// we need to bring in physics so that we can jump off of ledges
		game.physics.startSystem(Phaser.Physics.ARCADE);
		

		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, 0, 'star');


		// create a platforms group that our ledges will live in 
		platforms = game.add.group();
		// enable bbody so that people can jump off of ledges 
		platforms.enableBody = true; 

		var ground = platforms.create(0, game.world.height - 20, 'ground')
		ground.body.immovable = true;

		ledge0 = platforms.create(-120, 500, 'ground');
	    ledge0.body.immovable = true;

		ledge1 = platforms.create(500, 400, 'ground');
	    ledge1.body.immovable = true;

	    ledge2 = platforms.create(-120, 300, 'ground');
	    ledge2.body.immovable = true;

	    ledge3 = platforms.create(500, 200, 'ground');
	    ledge3.body.immovable = true;

	    ledge4 = platforms.create(-120, 100, 'ground');
	    // the last ledge you can actually stay on
	    ledge4.body.immovable = true;



	    player = game.add.sprite(32, game.world.height - 80, 'dude')
	    // give the player physics
	    game.physics.arcade.enable(player, platforms);
	    // give the player gravity so that he falls out of the air 
	    player.body.gravity.y = 400;
	    player.body.collideWorldBounds = true;	

	    player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);

    	// create cursor keys
	    cursors = game.input.keyboard.createCursorKeys();

	    


	}

	function update(){
		//you pass collide a player and a group - does something if there is a collission
		var hitPlatform = game.physics.arcade.collide(player, platforms);


		player.body.velocity.x = 0;

		if (cursors.left.isDown){
			player.body.velocity.x = -150;
			player.animations.play('left')
		}

	    else if (cursors.right.isDown){
	        //  Move to the right
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }else
	    {
	        //  Stand still
	        player.animations.stop();

	        player.frame = 4;
	    }

	    if (player.body.touching.down && platforms.touching.up){
	    	console.log('it is lit')
	    	// ledge0.body.immovable = false;
	    	// ledge1.body.immovable = false;
	    	// ledge2.body.immovable = false;
	    }
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	    {
	        player.body.velocity.y = -450;
	    }



	    // if (player.body.touching.down){
	    // 	console.log('hi i am touching the floor')
	    // }



	}
})