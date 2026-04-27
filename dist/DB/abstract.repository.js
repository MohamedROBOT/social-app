"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
//generic repository which is abstracted
class AbstractRepository {
    _model;
    constructor(_model) {
        this._model = _model;
    }
    //access private property
    get model() {
        return this._model;
    }
    /**
      create comment
       @param item is a generic data which is passed to DB
      */
    async create(item) {
        const doc = new this._model(item);
        return doc.save();
    }
    async getOne(filter, projection, options) {
        return this._model.findOne(filter, projection, options);
    }
    async getAll(filter, projection, options) {
        return this._model.find(filter, projection, options);
    }
    async updateOne(filter, update, options) {
        return this._model.findOneAndUpdate(filter, update, {
            returnDocument: "after",
            ...options
        });
    }
    async deleteOne(filter) {
        return this._model.deleteOne(filter);
    }
}
exports.AbstractRepository = AbstractRepository;
