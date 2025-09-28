function initializeCanvas(canvas, backgroundSrc, moving, speed, scale, knightXOffset, knightYOffset, swordSwingStart) {
	let bgProgress = 0;
	let bobbingProgress = 0;
    let swingProgress = 0;

	const background = new Image();
    background.src = backgroundSrc;
    const body = new Image();
    body.src = '/knight/body.png';
    const head = new Image();
    head.src = '/knight/head.png';
    const sword = new Image();
    sword.src = '/knight/sword.png';

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function draw() {
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Progress animations
        if (moving) {
            bgProgress = (bgProgress - speed / 2) % h;
            bobbingProgress = (bobbingProgress + 0.1) % (Math.PI * 2);
        } else {
            bobbingProgress = (bobbingProgress + 0.1 / 3) % (Math.PI * 2);
        }

        // Background
        ctx.drawImage(background, bgProgress, 0, h, h);
        ctx.drawImage(background, bgProgress + h, 0, h, h);
        ctx.drawImage(background, bgProgress + h * 2, 0, h, h);

        // Knight
        // Sword
        drawRotated(
            ctx,
            sword,
            9 * scale + knightXOffset + Math.sin(bobbingProgress) * speed,
            -10 * scale + knightYOffset + Math.sin(bobbingProgress) * 2 * speed,
            sword.width * scale,
            sword.height * scale,
            swordSwingStart,
            0.5,
            1
        );

        // Head
        ctx.drawImage(
            head,
            12 * scale + knightXOffset,
            10 * scale + knightYOffset + Math.sin(bobbingProgress) * speed,
            head.width * scale,
            head.height * scale
        );

        // Body
        ctx.drawImage(
            body,
            2 * scale + knightXOffset,
            17 * scale + knightYOffset + Math.sin(bobbingProgress) * 2 * speed,
            body.width * scale,
            body.height * scale
        );

        requestAnimationFrame(draw);
    }

    background.onload = () => draw();
    return ctx;
}

function drawRotated(ctx, img, x, y, w, h, angle, pivotX = 0.5, pivotY = 0.5) {
    ctx.save();

    // Move origin to the pivot point in world space
    ctx.translate(x + w * pivotX, y + h * pivotY);

    // Rotate around that pivot
    ctx.rotate(angle * (Math.PI / 180));

    // Draw the image so that the pivot aligns with the origin
    ctx.drawImage(img, -w * pivotX, -h * pivotY, w, h);

    ctx.restore();
}

export { initializeCanvas, drawRotated };