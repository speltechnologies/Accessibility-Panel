/* ----------------------------------------------------------------------------
Copyright 2015 SPEL Technologies, Inc. All Rights Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ----------------------------------------------------------------------- */


meSpeak.loadConfig('/js/mespeak_config.json');
meSpeak.loadVoice('/js/voices/en/en.json');  
meSpeak.loadVoice('/js/voices/en/en.json');  
var buffer='';

function handleSpecialKeys(keyValue, event) {
      var key = "";
       if (chars == undefined) {
         var chars = [[" ampersand ", "&"],  [" caret ", "^"],  [" comma ",","], [" dollar ", "$"], [" dot ","."], [" greater than ", ">"], [" less than ", "<"], [" exclamation ", "!"], [" hash ", "#"], [" left bracket ","["], [" left brace ","{"], [" left parenthesis ","("],  [" minus ","-"],  [" modulo ","%"], [" new line ", "\n" ], [" right parenthesis ",")"],   [" plus ","+"], [" question mark ","?"], [" quotes ",'"'], [" quote ","'"], [" right brace ","}"], [" right bracket ","]"], [" semicolon ",";"], [" tilde ", "~"], [" tab ", "	"], [" times ", "*"], [" underscore ", "_"], [" space ", " "]];
    }
    
     if(event.keyCode == 13)
        key = "newline";
     else { 
        var match_found = false;
        var k = 0;
        while ((k <= chars.length-1) && (match_found == false)) {
          if (keyValue == chars[k][1]) {
                    match_found = true;
                    key +=  chars[k][0];
          }
          k++;
        }
     }
      
    return key;
}

// speaks key pressed on keyboard when keyboard option "by key" is selected
// speaks word on keyboard when keyboard option "by word" is selected
$(document).on("keypress", "textarea, input", function(event) { 
    meSpeak.loadConfig('/js/mespeak_config.json');
    meSpeak.loadVoice('/js/voices/en/en.json');
    var mespeakspeed = getCookie("mespeak_speed");
    var mespeakvariant = getCookie("mespeak_variant");
    if (getCookie("isKeyboard") == "true") {
        if(getCookie("keyboardVariant") == "key1") {

             var keyValue = String.fromCharCode(event.which);
             var specialkey = handleSpecialKeys(keyValue, event);
                                    //console.log(keyValue);

              keyValue += specialkey;
              //console.log("key="+keyValue);

             meSpeak.speak(keyValue, {"speed":mespeakspeed, "variant":mespeakvariant}); 
        }
        else if(getCookie("keyboardVariant") == "key2") {
            //speak out value of key pressed
            var keyValue = String.fromCharCode(event.which);
            //console.log("KV"+keyValue);
            
            // prevent dot from being spoken twice
            if (keyValue != ".")
                buffer+= keyValue;
               
            var specialkey = handleSpecialKeys(keyValue, event);
            buffer += specialkey;

             if ( (keyValue == ".") || (keyValue == " ") || (event.keyCode == 13) ){
                //console.log("buf="+buffer);
                //console.log("keyValue="+keyValue+" +key ="+specialkey);

                //console.log("buf="+buffer);
                // speak out buffer
                meSpeak.speak(buffer, {"speed":mespeakspeed, "variant":mespeakvariant}); 
                // clear buffer contents
                buffer = '';
             }
        }
    }      
});

$(document).on("blur", "a, audio, input, button, textarea, img, th, pre, h1, h2, h3, h4, h5, h6, p, span, code", function() {
    meSpeak.stop();
});
               
$(document).on("focus", "a, audio, input, button, textarea, img, th, pre, h1, h2, h3, h4, h5, h6, p, span, code", function() {  
   //console.log("In spelscreenreader.js");
    meSpeak.loadConfig('/js/mespeak_config.json');
    meSpeak.loadVoice('/js/voices/en/en.json');
    var mespeakcookie = getCookie("isMeSpeak");
    var mespeakvariant = getCookie("mespeak_variant");
    var speakalltext = getCookie("isSpeakAllText");
    //console.log("mespeakcookie"+mespeakcookie);

    if (mespeakcookie == "true") {
        var mespeakspeed = getCookie("mespeak_speed");
        mespeakspeed = mespeakspeed * 2;
        var thisText = $(this).text();
        var thisType = $(this).attr("type");
        var thisProp = $(this).prop("tagName");
        
        //console.log("ThisText"+thisText+"thisType"+thisType+"thisProp"+thisProp);
        
        if(thisProp == "AUDIO" || thisProp == "audio"){
           meSpeak.speak("Press tab then space to play audio", {"speed":mespeakspeed, "variant": mespeakvariant});
        } 
       // read out data, placeholder text and labels for input
        else if(thisProp == "INPUT" || thisProp == "input"){
                var thisName = $(this).attr("name");
                var placeHolder = $(this).attr("placeholder");   
            
                //var thisType = $(this).attr("type");
                var thisValue = "";
                if (thisType.match("checkbox")) {
                     thisValue =  $(this).is(':checked');
                }
                else {
                     thisValue = $(this).val();
                }
                  if ( $(this).is('[readonly]') ) 
                         var thisReadonly = ",,readonly";
                  else 
                         var thisReadonly = "";
                   
                var thisString = thisProp+", " +thisReadonly +", " +thisType +", "  +thisValue;
            
                // get the label text
                var thisId =  $(this).attr("id");
                //console.log("id"+this.id+" thisId ="+thisId);
                var $label = $("label[for='"+this.id+"']");
               // console.log($label.text());
                thisString += ". The label is" +$label.text();
            
                if(thisType == "slider" || thisType == "radio") {
                    var attr_name = $(this).attr("name");
                    //console.log("attr name is "+attr_name);
                    if(attr_name == "set screen reader variant" || attr_name == "magnificationValue") {
                        meSpeak.speak(thisString +" "+"Press the up and down arrow keys to change value" , {"speed":mespeakspeed, "variant":mespeakvariant});
                    } else {
                        meSpeak.speak(thisString , {"speed":mespeakspeed, "variant":mespeakvariant});
                    }
                }
                else if(thisType == "checkbox") {
                    meSpeak.speak(thisString+" "+"Press the spacebar to toggle value" , {"speed":mespeakspeed, "variant":mespeakvariant});
                }
               else {
                  
                    if (placeHolder != null)
                        thisString += ",,The help text is" +placeHolder;
                 
                   
                    meSpeak.speak(thisString, {"speed":mespeakspeed, "variant":mespeakvariant});
                }
        }
        // read out data, placeholder text and labels for textareas
        else if(thisProp == "textarea" || thisProp == "TEXTAREA") {
                // get the name
                var thisName = $(this).attr("name");
           
                //var thisType = $(this).attr("type");
                var thisValue = punct($(this).val());
                 if ( $(this).is('[readonly]') ) 
                         var thisReadonly = ",,readonly";
                // get the placeholder text
                var placeHolder = $(this).attr("placeholder");
                var thisString = "input text"  +","+thisReadonly +"," +thisValue;
                if (placeHolder != null)
                    thisString += ". The help text is" +placeHolder;
            
                // get the label text
                var thisId =  $(this).attr("id");
                //console.log("id"+this.id+" thisId ="+thisId);
                var $label = $("label[for='"+this.id+"']");
                //console.log($label.text());
                thisString += ". The label is" +$label.text();

                // don't read out text in Loquacious Python editor- use Say, Overview buttons
               if (thisId != "loquacious" && thisId != "loquacious0")
                   meSpeak.speak(thisString, {"speed":mespeakspeed, "variant":mespeakvariant});
        }
        // read out a tags and buttons as links
        else if ( (thisProp == "a") || (thisProp == "A") || (thisProp == "button") || (thisProp == "BUTTON") ) {
            var thisText = "link "+thisText;
            //console.log("This text is"+thisText);
            meSpeak.speak(thisText, {"speed" :mespeakspeed, "variant": mespeakvariant});
        }
        // read out table headers and navigate table using arrow keys
        else if ( (thisProp == "th") || (thisProp == "TH") ) {
               var thisName = $(this).attr("aria-label");
               var thisString = "table header" + ", " + thisName;
               //console.log("This text is"+thisString);
               meSpeak.speak(thisString, {"speed" :mespeakspeed, "variant": mespeakvariant});
        }
        else {
            //console.log("in screenreader");
            if (speakalltext == "true") {
                //console.log("speak out all text in p, pre, h tags");
                // speak out text in p, h1, h2, h3, h4, h5, h6 and pre tags
                if ((thisProp == "pre") || (thisProp == "PRE") || (thisProp == "code") || (thisProp == "CODE")) {
                    thisText = punct(thisText);
                }
                    meSpeak.speak(thisText, {"speed" :mespeakspeed, "variant": mespeakvariant});
               
            } 
            else
                    meSpeak.speak(thisText, {"speed" :mespeakspeed, "variant": mespeakvariant});

        }   
   }
    
   if(getCookie("keyboardVariant") == "key1") {
        //speak out value of key pressed
        //console.log("key1");
        //alert("key1");
    }
    else if(getCookie("keyboardVariant") == "key2") {
        //speak out value of key pressed
        //console.log("key2");
    }
});