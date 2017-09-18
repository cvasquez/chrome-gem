var imageURL;

// Update the relevant fields with the new data
function setDOMInfo(info) {
  // document.getElementById('title').innerHTML          = '<a href="' + info.url + '" class="color: #3F505A; display: block; font-size: 16px; font-weight: bold; margin-bottom: 9px; text-decoration: none;">' + info.title + '</a>';
  imgURL = info.image;

  document.getElementById('title').text               = info.title;
  document.getElementById('title').href               = info.url;
  document.getElementById('image').innerHTML          = '<a href="' + info.url + '"><div style="background-image: url(\'' + imgURL + '\'); background-size: cover; background-repeat: no-repeat; background-position: center; width: 300px; height: 169px; border-radius: 8px 8px 0 0;" /></div></a>';
  info.description !=null ? document.getElementById('description').textContent = info.description : document.getElementById('description').outerHTML = '';
}

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });

  // Init Medium Editor
  var editor = new MediumEditor('.editable', {
    anchorPreview: false,
    placeholder: false,
    toolbar: {
      buttons: ['bold', 'italic', 'underline', 'anchor']
    }
  });

  document.getElementById('copyHTML').addEventListener('click', function(e){
    var copyHTML = new Clipboard('.copyHTML', {
      text: function() {
        return document.getElementById('gem').innerHTML;;
      }
    });
  });

  document.getElementById('copyGmail').addEventListener('click', function(e){
    var copyGmail = new Clipboard('.copyGmail', {
      target: function() {
        return document.querySelector('#gem');
      }
    });
  });

  // Setting Panel Control
  document.getElementById('settingControl').onclick = function(){
    document.getElementById('settings').style.display = 'block';
    document.getElementById('settingControl').getElementsByTagName('span')[0].className = 'active';
  }

  // Alignment Buttons
  document.getElementById('leftAlign').onclick = function(){
    alignment(this);
  }
  document.getElementById('centerAlign').onclick = function(){
    alignment(this);
  }

  // Position Image
  document.getElementById('topPos').onclick = function(){
    position(this);
  }
  document.getElementById('centerPos').onclick = function(){
    position(this);
  }

  // Set background size
  document.getElementById('cover').onclick = function(){
    size(this);
  }
  document.getElementById('contain').onclick = function(){
    size(this);
  }

  // Set image status (off or on)
  document.getElementById('imageNo').onclick = function(){
    imageStatus(this);
  }
  document.getElementById('imageYes').onclick = function(){
    imageStatus(this);
  }
});

function alignment(el) {
  var alignment = el.getAttribute('data-align'),
      card = document.getElementById('card');

  if(alignment === 'left') {
    card.style.margin = '0' ;
  } else if(alignment === 'center') {
    card.style.margin = '0 auto';
  }
}

function position(el) {
  var position = el.getAttribute('data-pos'),
      image = document.getElementById('image');

  if(position === 'top') {
    image.getElementsByTagName('div')[0].style.backgroundPosition = 'top center';
  } else if(position === 'center') {
    image.getElementsByTagName('div')[0].style.backgroundPosition = 'center';
  }
}

function size(el) {
  var size = el.getAttribute('data-size'),
      image = document.getElementById('image');

  if(size === 'cover') {
    image.getElementsByTagName('div')[0].style.backgroundSize = 'cover';
  } else if(size === 'contain') {
    image.getElementsByTagName('div')[0].style.backgroundSize = 'contain';
  }
}

function imageStatus(el) {
  var status = el.getAttribute('data-image'),
      image = document.getElementById('image');

  if(status === 'yes') {
    image.getElementsByTagName('div')[0].style.height = '169px';
    image.getElementsByTagName('div')[0].style.backgroundImage = 'url(\'' + imgURL + '\')';
  } else if(status === 'no') {
    image.getElementsByTagName('div')[0].style.height = '0';
    image.getElementsByTagName('div')[0].style.backgroundImage = 'none';
  }
}
