import { boot } from 'quasar/wrappers';
import { uid } from 'quasar';
import { User } from 'src/db/User';

export default boot(async () => {
  await User.getFirst().then((row) => {
    if (!row) {
      User.update({ hash: uid(), name: 'Guest' });
    }
  });
});
