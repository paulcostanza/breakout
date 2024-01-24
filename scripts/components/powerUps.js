
export function chooseBrick(bricks, rows, columns) {

    let idxOne = Math.floor(Math.random() * rows);
    let idxTwo = Math.floor(Math.random() * columns);

    if (bricks[idxOne][idxTwo].visible) {
        bricks[idxOne][idxTwo].style.color = '#123456'
        console.log(bricks[idxOne][idxTwo])
    }
}