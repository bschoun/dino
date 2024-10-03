namespace SpriteKind {
    export const Background = SpriteKind.create()
    export const Mountain = SpriteKind.create()
    export const Cloud = SpriteKind.create()
    export const Tree = SpriteKind.create()
}
function spawnSomething (roll: number) {
    if (roll <= 2) {
        createBrain()
    } else if (roll <= 6) {
        createTree()
    } else if (roll <= 24) {
        createCloud()
    } else if (roll <= 40) {
        createMeatball()
    }
}
function createBrain () {
    saucerSpeed = -40
    brain = sprites.createProjectileFromSide(img`
        .....................
        .....................
        .....................
        .....33.333..3b3.....
        ...33bb33bb33bbb33...
        ..33bb3bbb333b3bb33..
        .33bbb33333bbb33bb3b.
        b3bb3bb333bb33333bbb3
        b3b333bbbbb33bbb33333
        b3b33bb33b33bb3bbbb3b
        33b3bb33bb33333333bbb
        3b3bb33bb33bbbbbb3333
        bb3b33bb33333333bb3bb
        333b33333333bb333bbb3
        .33bb3bbbbb33bbb3333.
        ..33bbb333bb333bbb3..
        ...33b33b33b33333b...
        .....333..333.333....
        .....................
        .....................
        .....................
        `, saucerSpeed, 0)
    animation.runImageAnimation(
    brain,
    assets.animation`brainAnimation`,
    400,
    true
    )
    brain.y = randint(10, scene.screenHeight() - 10)
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    dino.startEffect(effects.fire)
    dino.startEffect(effects.fire)
    dino.ay = -50
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    dino.ay = 50
    effects.clearParticles(dino)
    dino.setImage(dinoImage)
})
function createMeatball () {
    saucerSpeed = -20
    meatball = sprites.createProjectileFromSide(img`
        . . . . e e e e e . e e . . . . 
        . . . c e c c c c e c c e . . . 
        . . e e c e e e e e c e c e . . 
        . e e c c e e c e e c e e c e . 
        e e c c e e c c c c e e e e e . 
        e c c e e c c e e e e e c c c . 
        e c e e c e c e e e c c e e e e 
        . e c e c e c e e c c e c e e e 
        e e e c e e c e e c e e c c e e 
        e e e e e e c c e e c e e c c e 
        . c e c c e e e e e c c e e c . 
        e e c e e c e e e c e c c e e e 
        . e e c e e c c c e e e c c c . 
        . . e e c e e e e e c e e e . . 
        . . . e e c c c c c e c e . . . 
        . . . . e . e e e e e . . . . . 
        `, saucerSpeed, 0)
    animation.runImageAnimation(
    meatball,
    assets.animation`meatballAnimation`,
    400,
    true
    )
    meatball.y = randint(12, scene.screenHeight() - 10)
}
function createCloud () {
    cloudImages = [img`
        ..................1111...............
        ................11111111.............
        ...............1111111111............
        ..............11111111111....11111...
        ..............111111111111.11111111..
        .............11111111111111111111111.
        ........11111111111111111111111111111
        .......111111111111111111111111111111
        1111111111111111111111111111111111111
        .111111111111111111111111111111111111
        .......111111111111111111111111111111
        .......................1111111111111.
        `, img`
        . . . 1 1 1 1 . . . 1 1 . . . . . . . . 
        . . 1 1 1 1 1 1 . 1 1 1 1 . . . . . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 1 1 . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
        `, img`
        ............111111...........
        ..........111111111..........
        .........11111111111.........
        ........1111111111111........
        ........1111111111111........
        ........11111111111111.......
        ....111111111111111111111111.
        ...11111111111111111111111111
        ..111111111111111111111111111
        ..111111111111111111111111111
        11111111111111111111111111111
        .11111111111111111111.1.1111.
        1........11111111111.....11..
        11111111111111...............
        `]
    cloud = sprites.createProjectileFromSide(cloudImages[randint(0, cloudImages.length - 1)], -5, 0)
    cloud.setKind(SpriteKind.Cloud)
    cloud.z = -10
    cloud.setFlag(SpriteFlag.Ghost, true)
    cloud.y = randint(0, scene.screenHeight() * 0.6)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
function placeMountain (leftPosition: number) {
    lastCreatedMountain = sprites.create(mountains[randint(0, 1)], SpriteKind.Mountain)
    lastCreatedMountain.setFlag(SpriteFlag.Ghost, true)
    lastCreatedMountain.setFlag(SpriteFlag.AutoDestroy, true)
    lastCreatedMountain.bottom = scene.screenHeight()
    lastCreatedMountain.left = leftPosition
    lastCreatedMountain.z = -15
}
function createTree () {
    tree = sprites.createProjectileFromSide(img`
        . . . . . . . c c . . . . . . . 
        . . . . c c c 6 5 c 6 6 . . . . 
        . . . . c 6 c 5 5 c 7 6 . . . . 
        . . . 6 c c 7 5 5 7 c 6 6 . . . 
        . . c c 7 7 7 7 7 5 7 7 c 6 . . 
        . 6 6 6 c 6 7 7 7 7 6 c c 6 6 . 
        c 7 7 7 6 c 7 c 6 7 6 7 7 7 7 6 
        c c c 6 6 6 c 6 6 6 6 7 7 6 6 6 
        . c c 7 6 6 6 6 6 7 7 7 7 c 6 . 
        . c 7 7 6 6 7 6 6 7 7 6 7 7 c . 
        . c c c c 7 7 6 f 7 7 c c c c . 
        . . . . c 7 c f f c 7 c . . . . 
        . . . . . 6 f e e e c . . . . . 
        . . . . . e e e d e e . . . . . 
        `, -10, 0)
    tree.setKind(SpriteKind.Tree)
    tree.z = -5
    tree.bottom = scene.screenHeight()
    tree.setFlag(SpriteFlag.Ghost, true)
}
let tree: Sprite = null
let cloud: Sprite = null
let cloudImages: Image[] = []
let meatball: Sprite = null
let brain: Sprite = null
let saucerSpeed = 0
let lastCreatedMountain: Sprite = null
let mountains: Image[] = []
let dino: Sprite = null
let dinoImage: Image = null
dinoImage = assets.image`dino`
let foodNearby = 0
let mouthOpen = 0
music.setVolume(0)
dino = sprites.create(dinoImage, SpriteKind.Player)
animation.runImageAnimation(
dino,
assets.animation`dinoAnimation`,
400,
true
)
scene.setBackgroundColor(9)
dino.ay = 35
dino.setStayInScreen(true)
dino.z = 100
info.setScore(0)
mountains = [img`
    ......................333333........................3333........................
    ...................333333333333...................3333333333....................
    ................333333333333333333..............3333333333333333................
    .............33333333333333333333333.........333333333333333333333333...........
    ..........333333333333333333333333333......333333333333333333333333333333.......
    ........3333333333333333333333333333333..33333333333333333333333333bb33333333...
    ......333333333bb3333333333333333b33333b3333333333333333333333333bbbb333333333..
    ....333333333333b33333333333333333b333bb3333333333333333333333bbbbbbbb333333333.
    ..3333333333333bbb33b3333333333b33bbbbbbbb3b33333333333333b3bbbbbbbbbb3333333333
    3333333333333333bb33b3333333333bbbbbbbbbbbbb33333333333333bbbbbbbbbbbbb3333b3333
    3333333333333b33bbbbbb33b3b3bbbbbbbbbbbbbbbbb333333333b33bbbbbbbbbbbbbbbb33b3333
    333333333333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3b333333bbbbbbbbbbbcbbbbbbbbbb3bb3
    333333b33bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb333bbbbbbbbbcbbbcccbbbbbbbbb3b33
    333b33bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbcbbcccccbccbbbbbbbbbb33
    333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbccbbbbbbbbbb
    33bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccbccbbbbbbcb
    cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccbccccccccccccbcccccccccccccbcbbcc
    cccbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbcccbccccccccccccccccccbcccccccccccccbccccc
    cccccbbcbbbbbbbbbbbbbbbbbbbbbbbbbcbcccccccccccccccccccccccccccccccccccccccbbcccc
    ccccccccbcbcbbbbbbbbbbbbbbbbbbcbcccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccccbbcbbbbcbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccccccccbcbcbbbbbbcbcccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccbcccccccccccccccccbcbbcccccccccbcccccccccccccccccccccccccccccccccccccccccccc
    ccccccbcccccccccccccccccccccccccccbccccccccccccccccccccccccccccccccccccccccccccc
    ccccbcccbcccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `, img`
    ....................3...........................................................
    ....................3...........................................................
    ...................333..........................................................
    ...................3333.........................................................
    ..................333333........................................................
    ..................33333333......................................................
    .................33333333333....................................................
    ................33333333333333..................................................
    ...............3333333333333333.......................3.........................
    ..............333333333333333333...................33333........................
    .............33333333333333333333...............333333333333....................
    ...........33333333333333333333333............3333333333333333..................
    ..........3333333333333333333333333..........3333333333333333333................
    ........3333333333333333333333333333.......3333333333333333333b333..............
    .....33333333333333333333333333333333...333333333333333333333bbb3333..........3.
    .33333333333333333333333333333333333333333333333333333333333bbbbb33333......3333
    33333333333333333333333333333333333333333333333333333333333333b33333333333333333
    333333333333333333333333333333333b333333333333333333333333333bb33333333333333333
    333333333333333333333333333333b3bbb3b3333333333333333333333bbbbb333333333b333333
    333333333333b33333333333333333bbbbbbb3333333333333333333bbbbbbbbb33333333bb33333
    333333333b33b33b33b333333b33bbbbbbbbbb333333333333bbbbbbbbbbbbbbb33333333bbb3333
    33333333bbbbbbbbbbbb3b333bbbbbbbbbbbbbb33333333bbbbbbbbbbbbbbbbbbb333333bbbb33b3
    3333b3bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbb3b3bbbbbbbbb
    c333bbbbbbbbbbbbbbbbbbbbbbbbbbbcbcbbbbbbbbb3bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
    cccbbbbbbbbbbbbbbbbbbbbbbbbbcbbccccbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbcbbcc
    ccccbbbbbbbbbbbbbbbbbbbbbbbccccccbccbcbcbbbbbbbbbbbcbbccbbbbbbbbbbbbbbbbbbbcbccc
    ccccccbcbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbcbbcccccccbcbbbbbbbbbbbbbcbccccc
    ccccccccbcbbbbbccbbbbbbcccccccccccccccccccccbcbcccccccccccccbbcbbbbbbbbbbccccccc
    cbccccccccbbcbccccbbcbcccccccccccccccccccccccccccccccccccccccccbbbbbcccccccccbcc
    cccccccccccccbbccbbbcccccbcbcccccccccccccccccccccccccccbccccbccccccccccccccccccc
    ccccccccccccccccccccccccccbcbcccccccccccccccccccccccbccccccccccccccccccccccccccc
    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccccccccccccccccccc
    ccccccbcbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccc
    ccccccccbcbccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccc
    ccccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `]
let sun = sprites.create(img`
    ......................................................................444444444444444...........................................................................
    ..............................................................444444444444444444444444444444444.................................................................
    ........................................................44444444444444444444555555444444444444444444444.........................................................
    .....................................................444444444444444444444555555555544444444444444444444444444444...............................................
    ..................................................44444444444444444444445555555555555544444444444444444444444444444.............................................
    ...............................................44444444444444444444444455555555555555554444444444444444444444444444444444444....................................
    .......................................4444444444444444444444444444444455555555555555554444444444444444444444444444444444444444444444444........................
    .................................444444444444444444444444444444444444455555555555555555544444444444444444444444444444444444444444444444444444444................
    .........................44444444444444444444444444444444444444444444455555555555555555544444444444444444444444444444444444444444444444444444444444444444.......
    44444.......444444444444444444444444444444444444444444444444444444444555555555555555555554444444444444444444444444444444444444444444444444444444444444444444....
    444444444444444444444444444444444444444444444444444444444444444444444555555555555555555554444444444444444444444444444444444444444444444444444444444444444444444.
    4444444444444444444444444444444444444444444444444444444444444444444445555555555555555555544444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444445555555555555555555544444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444445555555555555555555544444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444555555555555555555444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444555555555555555555444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444455555555555555554444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444455555555555555554444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444445555555555555544444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444455555555554444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444555555444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
    `, SpriteKind.Background)
sun.bottom = scene.screenHeight()
sun.setFlag(SpriteFlag.Ghost, true)
sun.z = -20
placeMountain(0)
placeMountain(lastCreatedMountain.right)
game.setDialogFrame(img`
    ...cc......................cc....
    ..c55c..bbbb...bbbbb......c55c...
    .cb55bcbdddbbbbbdddbbbbbbcb55bc..
    b555555bbdddb111bdddb11db555555b.
    bb5555bbdbdb11111bdb1111bb5555bb.
    cb5555bcddd11111ddd11111cb5555bc.
    .c5bb5c1111d111d111d111ddc5bb5c..
    .cbbbbc111111111111111111cbbbbc..
    ..b11111111111111111111111d111bb.
    ..b111111111111111111111111d1bdb.
    ..bb11111111111111111111111dbddb.
    .bbdb1d11111111111111111111ddddb.
    .bdddd11111111111111111111d1bdbb.
    .bddbd11111111111111111111111bb..
    .bdb1d111111111111111111111111b..
    .bb111d11111111111111111111111b..
    ..b11111111111111111111111d111bb.
    ..b111111111111111111111111d1bdb.
    ..bb11111111111111111111111dbddb.
    .bbdb1d11111111111111111111ddddb.
    .bdddd11111111111111111111d1bdbb.
    .bddbd11111111111111111111111bb..
    .bdbb1111111111111111111111111b..
    .bbbd1111111111111111111111111b..
    ..bcc111111111111111111111dccdb..
    ..c55c111d111d111d111d1111c55cb..
    .cb55bcdd11111ddd11111dddcb55bc..
    b555555b11111bdb11111bdbb555555b.
    bb5555bbb111bdddb111bdddbb5555bb.
    cb5555bcdbbbbbdddbbbbbddcb5555bc.
    .c5bb5c.bb...bbbbb...bbbbc5bb5c..
    .cbbbbc..................cbbbbc..
    .................................
    `)
game.showLongText("Eat as many meatballs and brains as you can!", DialogLayout.Center)
for (let index = 0; index <= 1; index++) {
    spawnSomething(randint(0, 40))
}
game.onUpdate(function () {
    dino.vy = Math.constrain(dino.vy, -25, 25)
    foodNearby = 0
    // changing position explicitly to avoid fractions of
    // movement / clipping
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        if (spriteutils.distanceBetween(value, dino) < 40) {
            foodNearby = 1
            break;
        }
    }
    if (foodNearby == 0 && mouthOpen == 1) {
        mouthOpen = 0
        animation.runImageAnimation(
        dino,
        assets.animation`dinoAnimation`,
        400,
        true
        )
    } else if (foodNearby == 1 && mouthOpen == 0) {
        mouthOpen = 1
        animation.runImageAnimation(
        dino,
        assets.animation`dinoEatAnimation`,
        400,
        true
        )
    }
})
game.onUpdateInterval(750, function () {
    spawnSomething(randint(0, 100))
})
game.onUpdateInterval(200, function () {
    // changing position explicitly to avoid fractions of
    // movement / clipping
    for (let value of sprites.allOfKind(SpriteKind.Mountain)) {
        value.x += -1
    }
    if (lastCreatedMountain.right < scene.screenWidth()) {
        placeMountain(lastCreatedMountain.right)
    }
})
