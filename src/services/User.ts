class User {
    readonly username: string;
    readonly id: Number;

    constructor(username: string) {
        this.username = username;
        this.id = 1;
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default User;