import validator from 'validator';

const fields = {
  username(name, value, reduce) {
    if (!value) return 'Username required, example: John';
    if (value.length > 30) return 'Username too long!';
    if (!validator.isAlphanumeric(value, ["en-US"])) return 'Username wrong format';
    return null;
  }
}

function Field() {
  return this;
}

Field.prototype.has = function(name) {
  return fields.hasOwnProperty(name) ? true : false;
}

Field.prototype.validate = function(name, value) {
  return this.has(name)
  ? fields[name](name, value)
  : null;
}

Field.prototype.reduce = function(name, value) {
  return this.has(name)
  ? fields[name](name, value, true)
  : value;
}

export default new Field();
