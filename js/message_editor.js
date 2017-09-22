var elemDiv = document.createElement('div'),
    cardTitle;

chrome.storage.sync.get('userKeyIds', function(data){
  console.log(data.userKeyIds[0].title);
  cardTitle = data.userKeyIds[0].title;
});

var emailElem = `<div style="width: 100%; max-width: 600px; box-sizing: border-box;"> <table cellpadding="0" cellspacing="0" id="card" style="box-sizing: border-box; background: #ffffff; border: 1px solid #CCCCCC; border-radius: 8px; margin: 0 auto; width: 300px; max-width: 100%;"> <thead style="box-sizing: border-box;"> <tr style="box-sizing: border-box;"> <th style="box-sizing: border-box;padding: 0;"> <div id="image" style="box-sizing: border-box;padding: 0;"><a href="https://blog.aweber.com/email-marketing/color-theory-for-sign-up-form-design.htm"><div style="background-image: url('https://blog.aweber.com/wp-content/uploads/2017/09/DesignTipsSocial.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center; width: 300px; height: 169px; border-radius: 8px 8px 0 0;"></div></a></div> <!--[if gte mso 9]> <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:300px;height:169px;"> <v:fill type="tile" src="" color="#CCCCCC" /> <v:textbox inset="0,0,0,0"> </v:textbox> </v:rect> <![endif]--> </th> </tr> </thead> <tbody style="box-sizing: border-box; display: block;"> <tr style="box-sizing: border-box;"> <td class="editable medium-editor-element" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 12px 18px 0px !important;" contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="7f952ae9-5f95-97c7-5df0-4dfe8f1633a4"> <a id="title" href="https://blog.aweber.com/email-marketing/color-theory-for-sign-up-form-design.htm" style="color: #3F505A !important; display: block; font-size: 16px !important; font-weight: bold; margin-bottom: 9px; text-decoration: none !important; text-align: left;">${cardTitle}</a> </td> </tr> <tr style="box-sizing: border-box;"> <td id="url" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 0px 18px 9px !important; color: #698596 !important; font-style: italic !important; text-align: left; font-size: 14px !important">Email Marketing Tips</td> </tr> <tr style="box-sizing: border-box;"> <td id="description" class="editable medium-editor-element" style="box-sizing: border-box; word-wrap: break-word; min-height: 30px; padding: 0px 18px 18px !important; color: #698596 !important; text-align: left; font-size: 14px !important" contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="1f66c251-4433-e550-e557-b691257118fe">Unsure how to choose colors for your email sign up form? Learn 3 theories that'll help you choose the right color for your sign up form design.</td> </tr> </tbody> </table> </div> `;

// Create Button for adding content to AWeber message editor
elemDiv.id = "testChromeID";
elemDiv.style.cssText = 'position:absolute; left: 0; top: 0; height: 100px; width: 200px; z-index: 5000; background-color: red;';
document.body.appendChild(elemDiv);
elemDiv.onclick = function(){
  // Open source menu
  document.querySelectorAll('.cke:not([style*="display: none"])')[0].getElementsByClassName('cke_button__sourcedialog_icon')[0].click();

  setTimeout(function(){
    // Set value of source textarea
    document.querySelectorAll('div[role="dialog"]:not([style*="display: none"])')[0].getElementsByClassName('cke_source')[0].value = emailElem;

    // Close source window
    document.querySelectorAll('div[role="dialog"]:not([style*="display: none"])')[0].getElementsByClassName('cke_dialog_ui_button_ok')[0].getElementsByClassName('cke_dialog_ui_button')[0].click();
  }, 100);
}
