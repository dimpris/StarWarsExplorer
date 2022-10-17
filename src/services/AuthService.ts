import User from './User';


class AuthService {
    static IsLoggedIn() : boolean {
        const authData = this.GetAuthData();

        return authData !== null;
    }

    static GetAuthData() : object | null {
        const localData = JSON.parse( localStorage.getItem('user') || '{}' );
        if (localData && localData.username) {
            return localData;
        }

        return null;
    }

    Login(username: string, password: string) : boolean {

        if (username === 'test' && password === 'test') {
            let user = new User(username);
            this.Authorize(user);

            return true;
        }

        return false;
    }

    Authorize(user : User) {
        let userStr = user.toString();

        console.log(userStr);
    }
}

export default AuthService;