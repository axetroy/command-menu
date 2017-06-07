/**
 * Created by axetroy on 17-6-7.
 */

export default class Command {
  constructor({ prefix, type, command }) {
    this.prefix = prefix;
    this.type = type;
    this.command = command;
  }
  dispatch() {
    this.action(...arguments);
  }
  action() {}
  toString() {
    return this.prefix + ' ' + this.command;
  }
}
