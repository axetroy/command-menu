/**
 * Created by axetroy on 17-6-7.
 */
import Command from '../lib/command';

class Help extends Command {
  action() {
    console.info('run help command!');
  }
}

export default new Help({
  prefix: '>',
  type: 'Info',
  command: 'Help'
});
