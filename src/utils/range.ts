const range = (props: { from: number, to: number }) => {
    const { from, to } = props;
    const nums: number[] = [];

    for (let i = from; i <= to; i++) {
        nums.push(i)
    }

    return nums;
}

export default range
