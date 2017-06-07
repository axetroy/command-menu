/**
 * Created by axetroy on 17-6-7.
 */
import Command from '../lib/command';

class ScrollBottom extends Command {
  action() {
    document.body.scrollTop = 99999999;
  }
}

export default new ScrollBottom({
  prefix: '>',
  type: 'Page',
  command: 'Scroll Bottom'
});
