// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    var isYouTube = isYouTube(document.URL);

    var ogTitle =       document.querySelector('meta[property="og:title"]'),
        title =         document.getElementsByTagName('title')[0],
        ogDescription = document.querySelector('meta[property="og:description"]'),
        description =   document.querySelector('meta[name="description"]'),
        ogType =        document.querySelector('meta[property="og:type"]'),
        ogImage =       document.querySelector('meta[property="og:image"]'),
        image =         document.getElementsByTagName('img')[0].width > 400 ? document.getElementsByTagName('img')[0] : document.getElementsByTagName('img')[1];

    // @TODO find image at least 300px wide

    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      title:        ogTitle != null ? ogTitle.content : title.innerText,
      description:  ogDescription  != null ? ogDescription.content : (description != null ? description.content : null),
      url:          document.URL,
      ogType:       ogType !=null ? ogType.content : null,
      image:        ogImage != null ? ogImage.content : (isYouTube != false ? isYouTube : (image != null ? image.src : null))
    };

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }

  // Detect if the URL is a YouTube video
  function isYouTube(url){
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = url.match(p);
    if(matches){
      return 'http://img.youtube.com/vi/' + matches[1] + '/sddefault.jpg';
    }
    return false;
  }
});
