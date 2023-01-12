const passwordGenerator = () => {
    const charactersString = `a0123456789bcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const passwordLength = 12;
    let password = "";

    // generating random password with 12 iterations each time pick random value from above given string
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * charactersString.length);
        password += charactersString.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

module.exports={
    passwordGenerator
}