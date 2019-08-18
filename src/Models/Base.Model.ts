class BaseModel {
    mongoose: any;
    name: string;

    constructor (mongoose, name) {
        this.mongoose = mongoose;
        this.name = name;
        return this.Initialize();
    }

    Initialize(): any { }
}

export default BaseModel;