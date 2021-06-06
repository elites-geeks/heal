'use strict';
const mongoose = require('mongoose');

class ModelCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findById(id);
    } else {
      return this.model.find({});
    }
  }

  getBy(obj) {
    return this.model.find(obj);
  }

  create(obj) {
    let newRecord = new this.model(obj);
    return newRecord.save();
  }

  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, {new:true});
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = ModelCollection;