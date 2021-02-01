function calculateValue(setting, x) {
    for (let i = 0; i < setting.points.length - 1; i++) {
        let currentPoint = setting.points[i]
        let nextPoint = setting.points[i + 1]

        if (currentPoint.x === x) {
            return currentPoint.y;
        }
        if (currentPoint.x < x && nextPoint.x > x) {
            // We've found the two points we're between
            let slope = (nextPoint.y - currentPoint.y) / (nextPoint.x - currentPoint.x)
            let y0 = currentPoint.y - slope * currentPoint.x;
            return y0 + x * slope;
        }
    }
    if (x > setting.points[setting.points.length - 1].x) {
        return setting.points[setting.points.length - 1].y;
    }
    return 0;
}

export default calculateValue;