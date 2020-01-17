/**
 * Inline video play functionality using YouTube API
 * @param {*} $
 * @returns {init} Determine and run if inline video exists
 */

/* global YT */

const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const inlineVideo = (() => {
  function vidInline(e) {
    e.preventDefault();

    // Attach YouTube API
    const videoElem = $(this).parents('.vid-inline__container');
    const video = videoElem.find('iframe')[0];
    let player;

    function onYouTubeIframeAPIReady() {
      setTimeout(() => {
        player = new YT.Player(video, {
          events: {
            // eslint-disable-next-line no-use-before-define
            onReady: onPlayerReady,
            // eslint-disable-next-line no-use-before-define
            onStateChange: onPlayerStateChange,
          },
        });
      }, 100);
    }

    onYouTubeIframeAPIReady();

    function onPlayerReady() {
      player.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.UNSTARTED) {
        videoElem.find('.vid-inline__cover').addClass('js-loading');
      }

      if (event.data === YT.PlayerState.PLAYING) {
        videoElem.find('.vid-inline__cover').addClass('js-hide');
        videoElem.find('.vid-inline__embed').addClass('js-show');
        videoElem.find('iframe').removeAttr('tabindex');
      }
    }
  }

  const init = () => {
    if (!$('.vid-inline').length) {
      return;
    }

    $('.vid-inline__cover').on('click keypress', vidInline);
  };

  return {
    init,
  };
})();

export default inlineVideo;
