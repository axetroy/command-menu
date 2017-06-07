/**
 * Created by axetroy on 17-6-7.
 */

class Commands {
  constructor() {
    this.commands = [];
  }
  each() {
    return this.commands.map(...arguments);
  }
  map() {
    return this.commands.map(...arguments);
  }
  toArray() {
    return [].concat(this.commands);
  }
  registry(command) {
    this[this.commands.length] = command;
    this.commands = this.commands.concat([command]);
  }
}

const commands = new Commands();

commands.registry(require('./help').default);
commands.registry(require('./scroll-bottom').default);
commands.registry(require('./scroll-top').default);

export default commands;
