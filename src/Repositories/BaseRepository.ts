import { ObjectId } from 'mongodb';

class BaseCrudRepository {
    name: any;
    model: any;

    constructor (model: string) {
        this.name = model;
        this.model = global.db[model];
    }

    async FindAll(condition: object = {}, limit = null, skip = null, populate = null, sort = null, select = null) {
        const query = this.model.find(condition);

        if (sort) query.sort(sort);
        if (limit) query.limit(Number(limit));
        if (skip) query.skip(Number(skip));
        if (populate) query.populate(populate);
        if (select) query.select(select);
        return query.exec();
    }

    async Count(condition: any = {}) {
        if (condition === {}) condition.removed = false;

        return this.model.count(condition).exec();
    }

    async Aggregate(condition = {}, limit = null, skip = null, populate = null, sort = null) {
        const query = this.model.aggregate(condition);

        if (limit) query.limit(Number(limit));
        if (skip) query.skip(Number(skip));
        if (populate) query.populate(populate);
        if (sort) query.sort(sort);
        return query.exec();
    }

    async Find(condition: any = {}, populate = null, sort = null, select = null) {
        if (!condition.removed) condition.removed = false;
        const query = this.model.findOne(condition);

        if (populate) query.populate(populate);
        if (sort) query.sort(sort);
        if (select) query.select(select);

        return query.exec();
    }

    async FindOneAndUpdate(condition: any = {}, data = {}, populate = null) {
        if (!condition.removed) condition.removed = false;

        const query = this.model.findOneAndUpdate(condition, { $set: data }, { new: true });
        if (populate) query.populate(populate);

        return query.exec();
    }

    async Create(record) {
        return new this.model(record).save();
    }

    async Remove(id: ObjectId) {
        return this.model.update({ _id: id }, { $set: { removed: true } });
    }

    async Update(id: ObjectId, record: any) {
        return this.model.update({ removed: false, _id: id }, { $set: record });
    }

    async Erase(id: ObjectId) {
        return this.model.remove({ _id: id });
    }

    async EmptyRecord() {
        return new this.model();
    }
}

export default BaseCrudRepository;