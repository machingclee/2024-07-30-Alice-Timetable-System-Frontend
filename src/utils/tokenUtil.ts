function generateRandomHexString(): string {
    const hexCharacters = "0123456789abcdef";
    let result = "";

    for (let i = 0; i < 16; i++) {
        // Generate a random index to pick from the hexCharacters string
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        result += hexCharacters[randomIndex];
    }
    console.log("result:", result);
    return result;
}

export default { generateRandomHexString };
