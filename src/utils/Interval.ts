import dayjs from "dayjs";

export default class Interval {
    constructor(public start: number, public end: number) { }
    intersect(anotherInterval: Interval): Interval | null {
        const [a_0, b_0] = [this.start, this.end];
        const [a_1, b_1] = [anotherInterval.start, anotherInterval.end]

        const intersected_a = Math.max(a_0, a_1);
        const intersected_b = Math.min(b_0, b_1)
        const nonEmptyIntersection = intersected_a <= intersected_b;

        console.log("interval ----", "intersected:", !!nonEmptyIntersection)
        console.log("interval A", dayjs(a_0).format("H:mm:ss"), dayjs(b_0).format("H:mm:ss"))
        console.log("interval B", dayjs(a_1).format("H:mm:ss"), dayjs(b_1).format("H:mm:ss"))
        if (nonEmptyIntersection) {
            return new Interval(intersected_a, intersected_b);
        } else {
            return null;
        }
    }
}