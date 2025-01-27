import * as Three from 'three'

const sounds = {
    0: new Audio("cube_turn_0.mp3"),
    1: new Audio("cube_turn_1.mp3"),
    2: new Audio("cube_turn_2.mp3"),
    3: new Audio("cube_turn_3.mp3"),
    4: new Audio("cube_turn_4.mp3"),
    5: new Audio("cube_turn_5.mp3"),
    6: new Audio("cube_turn_6.mp3"),
    7: new Audio("cube_turn_7.mp3"),
    8: new Audio("cube_turn_8.mp3"),
    9: new Audio("cube_turn_9.mp3"),
    10: new Audio("cube_turn_10.mp3"),
    11: new Audio("cube_turn_11.mp3"),
    12: new Audio("cube_turn_12.mp3"),
    13: new Audio("cube_turn_13.mp3"),
    14: new Audio("cube_turn_14.mp3"),
    15: new Audio("cube_turn_15.mp3"),
    16: new Audio("cube_turn_16.mp3"),
}
window.sounds = sounds

const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .1, 100)
const renderer = new Three.WebGLRenderer()

scene.background = new Three.Color(0x063a29);

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)

document.body.appendChild(renderer.domElement)

const colors = {
    y: 0xd8b901,
    r: 0x904e4d,
    b: 0x459d9e, 
    g: 0x40bd75,
    o: 0xb88152,
    w: 0xd6dccb,
    background: 0x063a29
}

function stickerMaterial(color = "magenta") {
    return (
        new Three.MeshBasicMaterial({
            color: colors[color],
            map: new Three.TextureLoader().load('sticker_blank.png'),
            transparent: true,
            opacity: 1
        })
    )
}
const cubeStr = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg"
const planeGeometry = new Three.PlaneGeometry(.5, .5)
const origin  = new Three.Mesh(new Three.BoxGeometry(.1, .1, .1), new Three.MeshBasicMaterial({color: "black", transparent: true, opacity: 0}))
const rotator = new Three.Mesh(new Three.BoxGeometry(.1, .1, .1), new Three.MeshBasicMaterial({color: "red", transparent: true, opacity: 0}))
const block3x3x2 = new Three.Mesh(new Three.BoxGeometry(1, 1.5, 1.5), new Three.MeshBasicMaterial({color: 0x063a29}))
const block3x3x1 = new Three.Mesh(new Three.BoxGeometry(.5, 1.5, 1.5), new Three.MeshBasicMaterial({color: 0x063a29}))

origin.attach(rotator)
origin.attach(block3x3x2)


//
origin.attach(block3x3x1)
const backgroundBlocks = {
    red: function() {
        this.reset()
        block3x3x1.translateZ(.5)
        block3x3x1.rotation.y = Math.PI/2
        block3x3x2.translateZ(-.25)
        block3x3x2.rotation.y = Math.PI/2
    },
    orange: function() {
        this.reset()
        block3x3x1.translateZ(-.5)
        block3x3x1.rotation.y = Math.PI/2
        block3x3x2.translateZ(.25)
        block3x3x2.rotation.y = Math.PI/2
    },
    blue: function() {
        this.reset()
        block3x3x1.translateX(.5)
        block3x3x2.translateX(-.25)
    },
    green: function() {
        this.reset()
        block3x3x1.translateX(-.5)
        block3x3x2.translateX(.25)
    },
    white: function() {
        this.reset()
        block3x3x1.translateY(.5)
        block3x3x1.rotation.z = Math.PI/2
        block3x3x2.translateY(-.25)
        block3x3x2.rotation.z = Math.PI/2
    },
    yellow: function() {
        this.reset()
        block3x3x1.translateY(-.5)
        block3x3x1.rotation.z = Math.PI/2
        block3x3x2.translateY(.25)
        block3x3x2.rotation.z = Math.PI/2
    },
    reset: function() {
        block3x3x1.position.x = 0
        block3x3x1.position.y = 0
        block3x3x1.position.z = 0
        block3x3x1.rotation.x = 0
        block3x3x1.rotation.y = 0
        block3x3x1.rotation.z = 0
        
        block3x3x2.position.x = 0
        block3x3x2.position.y = 0
        block3x3x2.position.z = 0
        block3x3x2.rotation.x = 0
        block3x3x2.rotation.y = 0
        block3x3x2.rotation.z = 0
    }
}


window.red = backgroundBlocks



const stickerObj = {}
function makeCube(cubeStr) {
    const orangeStart = 0
    const whiteStart = 9
    const redStart = 18
    const yellowStart = 27
    const blueStart = 36
    const greenStart = 45
    for (let i = 0; i < 9; i++) {
        drawSideStickers(whiteStart,  i,    -Math.PI/2, 0,          -Math.PI/2,      0,      0.751,  0     )
        drawSideStickers(redStart,    i,    0,          0,          -Math.PI/2,      0,      0,      0.751 )
        drawSideStickers(blueStart,   i,    0,          Math.PI/2,  Math.PI,         0.751,  0,      0     )
        drawSideStickers(greenStart,  i,    0,          -Math.PI/2, 0,               -0.751, 0,      0     )
        drawSideStickers(orangeStart, i,    -Math.PI,   0,          -Math.PI/2,      0,      0,      -0.751)
        drawSideStickers(yellowStart, i,    Math.PI/2,  0,          -Math.PI/2,      0,      -0.751, 0     )
    }
    function drawSideStickers(colorStart, idx, rotX, rotY, rotZ, tranX, tranY, tranZ) {
        const color = cubeStr[colorStart + idx]
        const stkr = new Three.Mesh(planeGeometry, stickerMaterial(color))
        stkr.name = colorStart + idx
        stkr.translateX(tranX)
        stkr.translateY(tranY)
        stkr.translateZ(tranZ)
        stkr.rotation.x = rotX
        stkr.rotation.y = rotY
        stkr.rotation.z = rotZ
        if (idx >= 0 && idx < 3) stkr.translateY(.5)
        if (idx >= 6 && idx < 9) stkr.translateY(-.5)
        if (idx === 0 || idx === 3 || idx === 6) stkr.translateX(-.5)
        if (idx === 2 || idx === 5 || idx === 8) stkr.translateX(.5)
        origin.attach(stkr)

        stickerObj[stkr.name] = stkr
    }
}

makeCube(cubeStr)

scene.add(origin)

camera.position.z = 3;
camera.position.y = 1.5;
camera.lookAt(0,0,0)

// origin.rotation.x += Math.PI
// origin.rotation.y -= Math.PI/5 
origin.rotation.y -= Math.PI/6 

const movesQueue = []
let currentMove = null
let isMoving = false

let delay = 8
let delayA = 0

let prevSndIdx = 0

function animate() {
    if (delayA > 0) {
        delayA--
        renderer.render(scene, camera)
        return
    }
    if (isMoving === false && currentMove === null && movesQueue.length > 0) {
        if (delay > 0) {
            delay--
        } else {
            currentMove = movesQueue.shift()
            isMoving = true
            rotatorAttach(currentMove.face)
            let useIdx = Math.floor(Math.random()*16)
            // while (useIdx === prevSndIdx) {
            //     useIdx = Math.floor(Math.random()*16)
            // } 
            sounds[useIdx].play()
            // prevSndIdx = useIdx
        }
    }
    if (isMoving === true && currentMove !== null) {
        rotator.rotation[currentMove.dir] += .15 * currentMove.lor // adding too small number breaks the geometry
        // rotator.rotation[currentMove.dir] += .05 * currentMove.lor // adding too small number breaks the geometry
        if (Math.abs(rotator.rotation[currentMove.dir]) >= Math.abs(Math.PI/2 * currentMove.lor)) {
            rotator.rotation[currentMove.dir] = Math.PI/2 * currentMove.lor
            rotatorRemoveChildren()
            rotatorResetRotations()
            updateCubeElemsAray(currentMove.face, currentMove.clockwise)
            currentMove = null
            isMoving = false
            delay = 8
        }
    }

    //origin.rotation.y -= 0.001
    //rotator.rotation[direction] += 0.02 * leftOrRight
    delayA = 0
    renderer.render(scene, camera)
}

const defIdxAll = {
// // // // // // // // // // // // // // // // // //
// //                                              //
// //           blue                               //
// //    orange white  red    yellow               //
// //           green                              //
// //                                              //
// //              36 37 38                        //
// //              39 40 41                        //
// //              42 43 44                        //
// //    0  1  2   9  10 11  18 19 20  27 28 29    //
// //    3  4  5   12 13 14  21 22 23  30 31 32    //
// //    6  7  8   15 16 17  24 25 26  33 34 35    //
// //              45 46 47                        //
// //              48 49 50                        //
// //              51 52 53                        //
// //                                              //
// // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // //

    // clockwise from top left
    orange: {
        mid: 4,
        face: [0, 1, 2, 5, 8, 7, 6, 3],
        ring: [36, 39, 42, 9, 12, 15, 45, 48, 51, 35, 32, 29]
    },
    white:  {
        mid: 13,
        face: [9, 10, 11, 14, 17, 16, 15, 12],
        ring: [42, 43, 44, 18, 21, 24, 47, 46, 45, 8, 5, 2]
    },
    red:    {
        mid: 22,
        face: [18, 19, 20, 23, 26, 25, 24, 21],
        ring: [44, 41, 38, 27, 30, 33, 53, 50, 47, 17, 14, 11]
    },
    yellow: {
        mid: 31,
        face: [27, 28, 29, 32, 35, 34, 33, 30],
        ring: [38, 37, 36, 0, 3, 6, 51, 52, 53, 26, 23, 20]
    },
    blue:   {
        mid: 40,
        face: [36, 37, 38, 41, 44, 43, 42, 39],
        ring: [29, 28, 27, 20, 19, 18, 11, 10, 9, 2, 1, 0]
    },
    green:  {
        mid: 49,
        face: [45, 46, 47, 50, 53, 52, 51, 48],
        ring: [15, 16, 17, 24, 25, 26, 33, 34, 35, 6, 7, 8]
    },
}

function rotatorAttach(side) {
    // setting moving and stationary blocks
    rotator.attach(block3x3x1)
    backgroundBlocks[side]()
    // adding stickers
    rotator.attach(stickerObj[defIdxAll[side].mid])
    for (let i = 0; i < 12; i++) {
        rotator.attach(stickerObj[defIdxAll[side].ring[i]])
    }
    for (let i = 0; i < 8; i++) {
        rotator.attach(stickerObj[defIdxAll[side].face[i]])
    }
}

function rotatorRemoveChildren() {
    const l = rotator.children.length
    for (let i = l - 1; i >= 0; i--) {
        // attach() just changes the parent of an element
        origin.attach(rotator.children[i])
    }
}

function rotatorResetRotations() {
    rotator.rotation.x = 0
    rotator.rotation.y = 0
    rotator.rotation.z = 0 
}

function updateCubeElemsAray(side, clockwise) {
    let tempArr = []
    for (let i = 0; i < 8; i++) {
        const idx = defIdxAll[side].face[i]
        tempArr.push(stickerObj[idx])
        // console.log(tempArr[i].name, stickerObj[tempArr[i].name].name)
    }
    for (let i = 0; i < 2; i++) {
        if (clockwise === true) {
            const first = tempArr.pop()
            tempArr.unshift(first)
        } else if (clockwise === false) {
            const first = tempArr.shift()
            tempArr.push(first)
        }
    }
    for (let i = 0; i < tempArr.length; i++) {
        const idx = defIdxAll[side].face[i]
        stickerObj[idx] = tempArr[i]
    }
    tempArr = []

    for (let i = 0; i < 12; i++) {
        tempArr.push(stickerObj[defIdxAll[side].ring[i]])
    }
    for (let i = 0; i < 3; i++) {
        if (clockwise === true) {
            const first = tempArr.pop()
            tempArr.unshift(first)
        } else if (clockwise === false) {
            const first = tempArr.shift()
            tempArr.push(first)
        }
    }
    for (let i = 0; i < tempArr.length; i++) {
        stickerObj[defIdxAll[side].ring[i]] = tempArr[i]
    }
    tempArr = []
}

function addMoveToQueue(faceObj) {
    movesQueue.push(faceObj)
}

function addMovesArbitrarily0(num = 1) {
    for (let i = num; i > 0; i--)  {
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: 1, dir: "y", clockwise: true})
        addMoveToQueue({face: "orange", lor: 1, dir: "z", clockwise: true})
        addMoveToQueue({face: "red", lor: -1, dir: "z", clockwise: true})
        addMoveToQueue({face: "green", lor: -1, dir: "x", clockwise: false})
        addMoveToQueue({face: "blue", lor: 1, dir: "x", clockwise: false})
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: 1, dir: "y", clockwise: true})
    }
    
}
function addMovesArbitrarily1(num = 1) {
    for (let i = num; i > 0; i--)  {
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
        addMoveToQueue({face: "orange", lor: 1, dir: "z", clockwise: true})
        addMoveToQueue({face: "red", lor: 1, dir: "z", clockwise: false})
        addMoveToQueue({face: "green", lor: -1, dir: "x", clockwise: false})
        addMoveToQueue({face: "blue", lor: -1, dir: "x", clockwise: true})
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
    }
}
function addMovesArbitrarily2(num = 1) {
    for (let i = num; i > 0; i--)  {
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
        addMoveToQueue({face: "orange", lor: 1, dir: "z", clockwise: true})
        addMoveToQueue({face: "red", lor: 1, dir: "z", clockwise: false})
        addMoveToQueue({face: "orange", lor: 1, dir: "z", clockwise: true})
        addMoveToQueue({face: "red", lor: 1, dir: "z", clockwise: false})
        addMoveToQueue({face: "green", lor: -1, dir: "x", clockwise: false})
        addMoveToQueue({face: "blue", lor: -1, dir: "x", clockwise: true})
        addMoveToQueue({face: "green", lor: -1, dir: "x", clockwise: false})
        addMoveToQueue({face: "blue", lor: -1, dir: "x", clockwise: true})
        // addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        // addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
        // addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
        // addMoveToQueue({face: "yellow", lor: -1, dir: "y", clockwise: false})
    }
}

let seq = 4

function touchHandler() {
    switch(seq) {
        case 0:
            addMovesArbitrarily0(1)
            seq++
        break;
        case 1:
            addMovesArbitrarily0(2)
            seq++
        break;
        case 2:
            addMovesArbitrarily0(3)
            seq++
        break;
        case 3:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 4:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 5:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 6:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 7:
            addMovesArbitrarily2(1)
            seq++
        break;
        case 8:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 9:
            addMovesArbitrarily1(1)
            seq++
        break;
        case 10:
            addMovesArbitrarily1(1)
            addMovesArbitrarily2(1)
            seq = 0
        break;
    }
}

document.addEventListener("touchstart", () => {
    if (movesQueue.length === 0) touchHandler()
})
document.addEventListener("click", () => {
    if (movesQueue.length === 0) touchHandler()
})


function handleKeyDown(e) {
    //if (isMoving) return // 
    if (e.key === "o") {
        addMoveToQueue({face: "orange", lor: 1, dir: "z", clockwise: true})
    } else if (e.key === "w") {
        addMoveToQueue({face: "white", lor: -1, dir: "y", clockwise: true})
    } else if (e.key === "r") {
        addMoveToQueue({face: "red", lor: -1, dir: "z", clockwise: true})
    } else if (e.key === "y") {
        addMoveToQueue({face: "yellow", lor: 1, dir: "y", clockwise: true})
    } else if (e.key === "b") {
        addMoveToQueue({face: "blue", lor: -1, dir: "x", clockwise: true})
    } else if (e.key === "g") {
        addMoveToQueue({face: "green", lor: 1, dir: "x", clockwise: true})
    } else if (e.key === "x") {
        console.log(origin.children )
    } else if (e.key === "z") {
        makeMove()
    }
}
// window.addEventListener("click", debuger)
window.addEventListener("keydown", handleKeyDown)

