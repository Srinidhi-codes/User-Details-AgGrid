import bcrypt from 'bcrypt';

export const hashingPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatched = await bcrypt.compare(password, hashedPassword);
        return isMatched;
    } catch (error) {
        console.log(error);
    }
};