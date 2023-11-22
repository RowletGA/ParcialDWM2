import bcrypt from 'bcryptjs';

class User {
    constructor({ id, name, email, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async compararPassword(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }
}

export default User;
