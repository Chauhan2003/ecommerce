import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    } catch (err) {
        console.log(err.message);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (err) {
        console.log(err.message);
    }
}