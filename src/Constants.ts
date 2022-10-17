class Constants {
    readonly DemoUsername = 'test';
    readonly DemoPassHash = '731b32d952420dc907928afc97140946';
    readonly AuthHashSalt1 = 'StarWars';
    readonly AuthHashSalt2 = 'Explorer';
    readonly AuthStorageKey = 'swe_user';
    readonly BaseAPIURL = 'https://swapi.dev/api/';
    
    //#region "Constants Singleton"
    private constructor() {}
    private static instance: Constants;
    static GetValues(): Constants {
        if(!this.instance) {
            this.instance = new Constants();
        }

        return this.instance;
    }
    //#endregion "Constants Singleton"
}

export default Constants.GetValues();