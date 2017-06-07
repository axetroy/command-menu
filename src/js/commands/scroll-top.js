/**
 * Created by axetroy on 17-6-7.
 */
import Command from '../lib/command';

class ScrollTop extends Command {
  action() {
    document.body.scrollTop = 0;
  }
}

export default new ScrollTop({
  prefix: '>',
  type: 'Page',
  command: 'Scroll Top'
});
