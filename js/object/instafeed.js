import Instafeed from 'instafeed.js';

const instagramLoader = (() => {
  const feed = new Instafeed({
    get: 'user',
    userId: '4872845545',
    clientId: '3b7569ccd2224b58b1c2f1a1806fe871',
    accessToken: '4872845545.3b7569c.525d0527038e4226b64bddf4be84bb69',
    sortBy: 'most-recent',
    limit: 3,
    template:
      '<div class="instagram__tile column__col"><a class="instagram__link" href="{{link}}" target="_blank" style="background-image: url({{image}})">{{link}}</a></div>',
    resolution: 'standard_resolution',
  });

  const init = () => {
    if (!$('#instafeed').length) {
      return;
    }
    feed.run();
  };

  return {
    init,
  };
})();

export default instagramLoader;
