var elemDiv = document.createElement('div'),
    cardTitle;

// Create element for holding saved pages in AWeber message editor
elemDiv.id = "testChromeID";
elemDiv.style.cssText = 'position:absolute; left: 0; top: 0; height: auto; width: 300px; z-index: 5000; background-color: red;';
document.body.appendChild(elemDiv);

// Add items from storage into element
chrome.storage.sync.get(function(items) {
  var gems = items.awgems;

  for(var i=0; i < gems.length; i++) {
    elemDiv.innerHTML += '<p class="awgem__savedItem" data-id="' + i + '">' + gems[i].title + '</p>'
  }

  var savedItems = document.querySelectorAll('.awgem__savedItem');
  for(var i=0; i < savedItems.length; i++) {
    savedItems[i].onclick = function(){
      itemId = this.dataset.id;
      addItem(gems[itemId].title, gems[itemId].image, gems[itemId].url, gems[itemId].siteName, gems[itemId].description);
    }
  }
});

// Add element to message editor when clicked.
addItem = function(title, image, url, site, description){
  // Open source menu
  document.querySelectorAll('.cke:not([style*="display: none"])')[0].getElementsByClassName('cke_button__sourcedialog_icon')[0].click();

  setTimeout(function(){
    // Set value of source textarea
    document.querySelectorAll('div[role="dialog"]:not([style*="display: none"])')[0].getElementsByClassName('cke_source')[0].value = `<div style="width: 100%; max-width: 600px; box-sizing: border-box;"> <table cellpadding="0" cellspacing="0" id="card" style="box-sizing: border-box; background: #ffffff; border: 1px solid #CCCCCC; border-radius: 8px; margin: 0 auto; width: 300px; max-width: 100%;"> <thead style="box-sizing: border-box;"> <tr style="box-sizing: border-box;"> <th style="box-sizing: border-box;padding: 0;"> <div id="image" style="box-sizing: border-box;padding: 0;"><a href="${url}"><div style="background-image: url('${image}'); background-size: cover; background-repeat: no-repeat; background-position: center; width: 300px; height: 169px; border-radius: 8px 8px 0 0;"></div></a></div> <!--[if gte mso 9]> <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:300px;height:169px;"> <v:fill type="tile" src="" color="#CCCCCC" /> <v:textbox inset="0,0,0,0"> </v:textbox> </v:rect> <![endif]--> </th> </tr> </thead> <tbody style="box-sizing: border-box; display: block;"> <tr style="box-sizing: border-box;"> <td class="editable medium-editor-element" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 12px 18px 0px !important;" contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="7f952ae9-5f95-97c7-5df0-4dfe8f1633a4"> <a id="title" href="${url}" style="color: #3F505A !important; display: block; font-size: 16px !important; font-weight: bold; margin-bottom: 9px; text-decoration: none !important; text-align: left;">${title}</a> </td> </tr> <tr style="box-sizing: border-box;"> <td id="url" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 0px 18px 9px !important; color: #698596 !important; font-style: italic !important; text-align: left; font-size: 14px !important">${site}</td> </tr> <tr style="box-sizing: border-box;"> <td id="description" class="editable medium-editor-element" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 0px 18px 18px !important; color: #698596 !important; text-align: left; font-size: 14px !important" contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="1f66c251-4433-e550-e557-b691257118fe">${description}</td> </tr> </tbody> </table> </div> `;

    // Close source window
    document.querySelectorAll('div[role="dialog"]:not([style*="display: none"])')[0].getElementsByClassName('cke_dialog_ui_button_ok')[0].getElementsByClassName('cke_dialog_ui_button')[0].click();
  }, 100);
}
