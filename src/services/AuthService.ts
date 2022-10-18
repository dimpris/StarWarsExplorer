import User from './User';
import { Md5 } from "ts-md5";
import Constants from '../Constants';
import { NavigateFunction } from 'react-router-dom';
import { EffectCallback } from 'react';

class AuthService {
    static IsLoggedIn() : boolean {
        const authData = this.GetAuthData();

        return authData !== null;
    }

    static PreventAccess(navigate: NavigateFunction): EffectCallback {
        let fn: EffectCallback = () => {};
        
        if (this.IsLoggedIn() === false) {
            fn = () => {
                navigate('/login');
            };
        }

        return fn
    }

    static GetAuthData() : object | null {
        const localData = JSON.parse( localStorage.getItem(Constants.AuthStorageKey) || '{}' );
        if (localData && localData.username) {
            return localData;
        }

        return null;
    }

    static Login(username: string, password: string) : boolean {
        username = username.toLowerCase();
        password = password.toLowerCase();
        
        const passHash = this.GetPassHash(password);

        if (username === Constants.DemoUsername && passHash === Constants.DemoPassHash) {
            let user = new User(username);
            this.Authorize(user);

            return true;
        }

        return false;
    }

    static Logout() : void {
        localStorage.removeItem(Constants.AuthStorageKey);
    }

    private static Authorize(user : User) {
        let userStr = user.toString();

        localStorage.setItem(Constants.AuthStorageKey, userStr);
    }

    private static GetPassHash(password: string): string {
        const hash = Md5.hashStr( 
            Md5.hashStr( password + Constants.AuthHashSalt1 ) 
            + Constants.AuthHashSalt2 
        );

        return hash;
    }
}

export default AuthService;