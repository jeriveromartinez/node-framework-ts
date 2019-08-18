import UserModel from '../Models/User.Model';

class Loader {
    mongoose: any;

    constructor (mongoose) {
        this.mongoose = mongoose;
    }

    Load() {
        return {
            mongoose: this.mongoose,
            User: new UserModel(this.mongoose)
        };
    }
}

export default Loader;