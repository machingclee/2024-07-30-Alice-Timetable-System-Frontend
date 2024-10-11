const getDayUnixTimestamp = (timestamp: number): number => {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Set the time to the start of the day
    date.setHours(0, 0, 0, 0); // Sets hours, minutes, seconds, and milliseconds to zero

    // Return the timestamp of the start of the day
    return date.getTime();
};

export default {
    getDayUnixTimestamp,
};
