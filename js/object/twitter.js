const twitterLoader = (() => {
  const init = () => {
    if (!$('.twitter__feed').length) {
      return;
    }

    // eslint-disable-next-line global-require
    require('../vendor/tweetie.min.js');

    const tweetun = $('.twitter__feed').data('un');

    $('.twitter__feed').tweetie({
      type: 'timeline',
      template:
        '<div class="twitter__item column__col"> <div class="twitter__title"><a href="https://www.twitter.com/{{tweet.user.screen_name}}"> <span class="twitter__icon" aria-hidden="true"></span>{{tweet.user.screen_name}}</a></div><div class="twitter__body">{{tweet.text}}</div> <time class="twitter__time">{{tweet.created_at}}</time></div>',
      dateFormat: '%B %d',
      url: '/assets/api/server.php',
      params: {
        count: 3,
        screen_name: tweetun,
      },
    });
  };

  return {
    init,
  };
})();

export default twitterLoader;
