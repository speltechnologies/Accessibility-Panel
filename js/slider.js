/*
 * Copyright 2011-2014 OpenAjax Alliance
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * 
 * Modified by SPEL Tehnologies. Inc and Hot Wax Systems.
 */

/*
 * ARIA Slider example
 * @function onload
 * @desc 
 */


/**
 * @namespace aria
 */

var aria = aria || {};


/* ---------------------------------------------------------------- */
/*                  ARIA Widget Namespace                        */
/* ---------------------------------------------------------------- */

aria.widget = aria.widget || {};

/* ---------------------------------------------------------------- */
/*                  Simple  Slider Widget                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor Slider
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a slider widget using ARIA
 *
 * @param  node    DOM node  -  DOM node object
 * @param  inc     Integer   -  inc is the increment value for the slider (default 1)
 * @param  jump    Integer   -  jump is the large increment value for the slider (default 10)
 * @param  width   Integer   -  jump is the large increment value for the slider (default 100)
 *
 * @property  keyCode      Object    -  Object containing the keyCodes used by the slider widget
 *
 * @property  node         Object    -  JQuery node object
 * @property  siderHeight  Integer  - height of the slider in pixels
 * @property  siderWidth   Integer  - width of the slider in pixels
 *
 * @property  valueInc   Integer  - small slider increment value
 * @property  valueJump  Integer  - large slider increment value
 *
 * @property  valueMin  Integer  - Minimum value of the slider
 * @property  valueMax  Integer  - Maximum value of the slider
 * @property  valueNow  Integer  - Current value of the slider
 */

aria.widget.slider = function(node, inc, jump, width) {

  this.keyCode = Object.freeze({
    "pageUp" : 33,
    "pageDown" : 34,
    "end" : 35,
    "home" : 36,

    "left" : 37,
    "up" : 38,
    "right" : 39,
    "down" : 40
  });

  this.done = true;

  // Check fo DOM element node
  if (typeof node !== 'object' || !node.getElementsByClassName) return false;

  this.container = node;

  var rails = node.getElementsByClassName('rail');
  if (rails) this.rail = rails[0];
  else return false;

  var thumbs = node.getElementsByClassName('thumb');
  if (thumbs) this.thumb = thumbs[0];
  else return false;

  var values = node.getElementsByClassName('value');
  if (values) this.value = values[0];
  else return false;
  this.value.innerHTML = "0";

  this.thumbHeight  = 30;
  this.thumbWidth   = 30;

  if (typeof width !== 'number') {
    width = window.getComputedStyle(this.rail).getPropertyValue("width");
    if ((typeof width === 'string') && (width.length > 2)) {
      width = parseInt(width.slice(0,-2));
    }
  }

  if (typeof width === 'number') this.sliderWidth = width;
  else this.sliderWidth = 200;

  if (this.sliderWidth < 50) {
    this.sliderWidth  = 50;
  }

  if (typeof inc !== 'number') inc = 1;
  if (typeof jump !== 'number') jump = 10;

  this.valueInc  = inc;
  this.valueJump = jump;

  if (typeof height === 'Number') this.sliderHeight = height;
  if (typeof width  === 'Number') this.sliderWidth  = width;

  this.valueMin = parseInt(this.thumb.getAttribute('aria-valuemin'));
  if (isNaN(this.valueMin)) this.valueMin = 0;

  this.valueMax = parseInt(this.thumb.getAttribute('aria-valuemax'));
  if (isNaN(this.valueMax)) this.valueMax = 100;

  this.valueNow = parseInt(this.thumb.getAttribute('aria-valuenow'));
  if (isNaN(this.valueNow)) this.valueNow = Math.round((this.valueMax - this.valueMin) / 2);

  this.thumb.setAttribute('role', 'slider');
  this.thumb.setAttribute('aria-valuenow', this.valueNow);
  this.thumb.setAttribute('aria-valuemin', this.valueMin);
  this.thumb.setAttribute('aria-valuemax', this.valueMax);

  this.thumb.tabIndex = 0;
  this.thumb.innerHTML = "";

};

/**
 * @method initSlider
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Creates the HTML for the slider
 */

aria.widget.slider.prototype.initSlider = function() {

  this.rail.style.height = "3px";
  this.rail.style.width = this.sliderWidth + "px";

  this.thumb.style.height = this.thumbHeight + "px";
  this.thumb.style.width  = this.thumbWidth + "px";
  this.thumb.style.top    = (-1 * this.thumbHeight/2) + "px";

  this.value.style.top    = (this.rail.offsetTop - (this.value.offsetHeight / 2) + 2) + "px";
  this.value.style.left   = (this.rail.offsetLeft + this.rail.offsetWidth + 5) + "px";

  this.rangeLeftPos =  this.rail.offsetLeft;

  var slider = this;

  var eventKeyDown = function (event) {
    slider.eventKeyDown(event, slider);
  };

  var eventMouseDown = function (event) {
    slider.eventMouseDown(event, slider);
  };

  var eventFocus = function (event) {
    slider.eventFocus(event, slider);
  };

  var eventBlur = function (event) {
    slider.eventBlur(event, slider);
  };

  this.thumb.addEventListener('keydown',   eventKeyDown);
  this.thumb.addEventListener('mousedown', eventMouseDown);
  this.thumb.addEventListener('focus', eventFocus);
  this.thumb.addEventListener('blur',  eventBlur);

  var eventClick = function (event) {
    slider.eventClick(event, slider);
  };

  this.rail.addEventListener('click', eventClick);

  this.updateThumbPosition();

};

/**
 * @method updateThumbPosition
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Updates thumb position in slider div and aria-valuenow property
 */

aria.widget.slider.prototype.updateThumbPosition = function() {

  if (this.valueNow > this.valueMax) this.valueNow = this.valueMax;
  if (this.valueNow < this.valueMin) this.valueNow = this.valueMin;

  this.thumb.setAttribute('aria-valuenow', this.valueNow);

  var pos = Math.round((this.valueNow * this.sliderWidth) / (this.valueMax - this.valueMin)) - (this.thumbWidth/2);
  this.thumb.style.left = pos + "px";

  this.value.innerHTML = this.valueNow.toString()+"%";

  aria.widget.slider.updateAccessability();

};


/**
 * @method eventKeyDown
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Keydown event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventKeyDown = function(event, slider) {

  function updateValue(value) {
    slider.valueNow = value;
    slider.updateThumbPosition();

    event.preventDefault();
    event.stopPropagation();
  }

  switch(event.keyCode) {

    case slider.keyCode.left:
    case slider.keyCode.down:
      updateValue(slider.valueNow-slider.valueInc);
      break;

    case slider.keyCode.right:
    case slider.keyCode.up:
      updateValue(slider.valueNow+slider.valueInc);
      break;

    case slider.keyCode.pageDown:
      updateValue(slider.valueNow-slider.valueJump);
      break;

    case slider.keyCode.pageUp:
      updateValue(slider.valueNow+slider.valueJump);
      break;

    case slider.keyCode.home:
      updateValue(slider.valueMin);
      break;

    case slider.keyCode.end:
      updateValue(slider.valueMax);
      break;

    default:
      break;
  }


};

/**
 * @method eventMouseDown
 *
 * @memberOf aria.widget.slider
 *
 * @desc  MouseDown event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventMouseDown = function(event, slider) {

  if (event.target === slider.thumb) {

    // Set focus to the clicked handle
    event.target.focus();

    var mouseMove = function (event) {
      slider.eventMouseMove(event, slider);
    }

    slider.mouseMove = mouseMove;

    var mouseUp = function (event) {
      slider.eventMouseUp(event, slider);
    }

    slider.mouseUp = mouseUp;

    // bind a mousemove event handler to move pointer
    document.addEventListener('mousemove', slider.mouseMove);

    // bind a mouseup event handler to stop tracking mouse movements
    document.addEventListener('mouseup', slider.mouseUp);

    event.preventDefault();
    event.stopPropagation();
  }

};

/**
 * @method eventMouseMove
 *
 * @memberOf aria.widget.slider
 *
 * @desc  MouseMove event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventMouseMove = function(event, slider) {

  var eLeft = slider.rail.getBoundingClientRect().left;


  // console.log('eLeft = ', eLeft, 'event.pageX = ', event.pageX, 'offsetLeft = ', slider.rail.offsetLeft, 'windowLeft = ', $(window).scrollLeft());

  var diffX = event.pageX - eLeft;
  // console.log('diffX = ', diffX);
  slider.valueNow = parseInt(((slider.valueMax - slider.valueMin) * diffX) / slider.sliderWidth);
  slider.updateThumbPosition();

  event.preventDefault();
  event.stopPropagation();
};

/**
 * @method eventMouseUp
 *
 * @memberOf aria.widget.slider
 *
 * @desc  MouseUp event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventMouseUp = function(event, slider) {

  document.removeEventListener('mousemove', slider.mouseMove);
  document.removeEventListener('mouseup',   slider.mouseUp);

  event.preventDefault();
  event.stopPropagation();

};

/**
 * @method eventClick
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Click event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventClick = function(event, slider) {

  if (event.target === slider.thumb) return;

  var diffX = event.pageX - slider.rail.offsetLeft;
  slider.valueNow = parseInt(((slider.valueMax - slider.valueMin) * diffX) / slider.sliderWidth);
  slider.updateThumbPosition();

  event.preventDefault();
  event.stopPropagation();

};


/**
 * @method eventFocus
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Focus event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventFocus = function(event, slider) {

  slider.container.className = "aria-widget-slider focus";

  event.preventDefault();
  event.stopPropagation();

};

/**
 * @method eventBlur
 *
 * @memberOf aria.widget.slider
 *
 * @desc  Focus event handler for slider Object
 *        NOTE: The slider parameter is needed to provide a reference to the specific
 *               slider to change the value on
 */

aria.widget.slider.prototype.eventBlur = function(event, slider) {

  slider.container.className = "aria-widget-slider";

  event.preventDefault();
  event.stopPropagation();

};


/* ---------------------------------------------------------------- */
/*             Change Accessibility Filters                         */
/* ---------------------------------------------------------------- */
function displaySpeakVariants() {
    var div = document.getElementById('speakVariants');
    
    if(div.style.display != 'block') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}

function displayKeyboardOptions() {
    var div = document.getElementById('keyboardVariants');

    if(div.style.display != 'block') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}

aria.widget.slider.updateAccessability = function() {

  function getSaturation() {
    return document.getElementById("setSaturationValue").getAttribute("aria-valuenow")
  }

  function getContrast() {
    return document.getElementById("setContrastValue").getAttribute("aria-valuenow")
  }

  function getGrayscale() {
    if (document.getElementById('setGrayscale').checked) {
      return 100;
    } else {
      return 0;
    }
    // return document.getElementById("setGrayscaleValue").getAttribute("aria-valuenow")
  }

  function getInvert() {
    if (document.getElementById('setInvert').checked) {
      return 100;
    } else {
      return 0;
    }
    // var node = document.getElementById("body")
    // var invertSlider = document.getElementById('setInvertValue').getAttribute("aria-valuenow")
    // if(invertSlider < 10) {
    //   node.style.backgroundColor = "rgba(0,0,0,.0"+invertSlider+")";
    // }
    // else if(invertSlider == 100) {
    //   node.style.backgroundColor = "rgba(0,0,0,1)";
    // }
    // else {
    //   node.style.backgroundColor = "rgba(0,0,0,."+invertSlider+")";
    // }
    // return document.getElementById("setInvertValue").getAttribute("aria-valuenow")
  }

  function getMagnification() {
    if (document.querySelector('input[name="magnificationValue"]:checked'))
    return document.querySelector('input[name="magnificationValue"]:checked').value;
  }


  var node = document.getElementById("body");
  if (node) {
    node.style.WebkitFilter = "saturate("+getSaturation()+"%) contrast("+getContrast()+"%) grayscale("+getGrayscale()+"%) invert("+getInvert()+"%)";
    node.style.filter = "saturate("+getSaturation()+"%) contrast("+getContrast()+"%) grayscale("+getGrayscale()+"%) invert("+getInvert()+"%)";
    node.style.zoom = getMagnification()+"%";
  }

}
if (getCookie('style') || getCookie('contrast') || getCookie('saturation') || getCookie('magnification')
    || getCookie('isGrayscale') || getCookie('isMeSpeak') || getCookie('isInvert') 
    || getCookie('mespeak_speed') || getCookie('mespeak_variant') || getCookie('isSpeakAllText') || getCookie('isKeyboard') || getCookie('keyboardVariant')) {
  setCookiesFromUserPreferences();
}
else {
  var sliders = document.getElementsByClassName('aria-widget-slider');
  [].forEach.call(sliders, function(slider) {
    if (slider && !slider.done) {
      var s = new aria.widget.slider(slider);
      s.initSlider();
    }
  });
  setDefault();
}

function helpVideo() {
     document.getElementById('help-video').style.display='block';
}

function closeHelp() {
    document.getElementById('help-video').style.display='none';
}

//function saveSettings() {
//  var contrastValue = document.getElementById("setContrastValue").getAttribute("aria-valuenow");
//  var saturationValue = document.getElementById("setSaturationValue").getAttribute("aria-valuenow");
//  var speedValue = document.getElementById("setSpeedValue").getAttribute("aria-valuenow");
//
//  var magnificationValue = document.querySelector('input[name="magnificationValue"]:checked').value;
//  var variantValue = document.querySelector('input[name="variantValue"]:checked').value;
//  var voiceValue = document.querySelector('input[name="voiceValue"]:checked').value;
//    
//  var isInvert = document.getElementById('setInvert').checked;
//  var isGrayscale = document.getElementById("setGrayscale").checked;
//  var isMeSpeak = document.getElementById("setMeSpeak").checked;
//  var style = document.querySelector('input[name="colorScheme"]:checked').value;
//  //Setting all the theme preferences in cookies
//  var cookies = {};
//  cookies['contrast'] = setCookie("contrast", contrastValue, 1, '');
//  cookies['saturation'] = setCookie("saturation", saturationValue, 1, '');
//  cookies['magnification'] = setCookie("magnification", magnificationValue, 1, '');
//  cookies['isInvert'] = setCookie("isInvert", isInvert, 1, '');
//  cookies['isGrayscale'] = setCookie("isGrayscale", isGrayscale, 1, '');
//  cookies['isMeSpeak'] = setCookie("isMeSpeak", isMeSpeak, 1, '');
//  cookies['style'] = setCookie("style", style, 1, '');
//  cookies['mespeak_speed'] = setCookie("mespeak_speed", speedValue, 1, '');
//  cookies['mespeak_variant'] = setCookie("mespeak_variant", variantValue, 1, '');
//  cookies['mespeak_voice'] = setCookie("mespeak_voice", voiceValue, 1, '');
//    
//  if(document.getElementById("userLoginId")) {
//      var userLoginId = document.getElementById("userLoginId").getAttribute("value");
//      var data = {};
//      data["userPrefLoginId"] = userLoginId;
//      data["userPrefGroupTypeId"] = "GLOBAL_PREFERENCES";
//      var index = 0;
//      $.each(document.cookie.split(/; */), function() {
//          var splitCookie = this.split('=');
//          // name is splitCookie[0], value is splitCookie[1]
//          if (cookies[splitCookie[0]] != undefined) {
//            data["userPrefTypeId_o_"+index] = splitCookie[0];
//            data["userPrefValue_o_"+index] = splitCookie[1];
//            index++;
//          }
//      });
//      jQuery.ajax({
//          async: true,
//          type: 'post',
//          url: "setUserPreferenceAjax",
//          data: data,
//          success: function (resp) {
//              for (key in resp) {
//                  if (key.indexOf("userPrefMap_o_") > -1) {
//                      for (k in resp[key]) {
//                          setCookie(k, resp[key][k], 1, '');
//                      }
//                  }
//              }
//          }
//      });
//    }
//    $("#accessibility-notification").show();
//    setTimeout(function(){
//        $("#accessibility-notification").hide();
//    }, 3000);
//}

function saveSettings() {
  var contrastValue = document.getElementById("setContrastValue").getAttribute("aria-valuenow");
  var saturationValue = document.getElementById("setSaturationValue").getAttribute("aria-valuenow");
  var speedValue = document.getElementById("setSpeedValue").getAttribute("aria-valuenow");

  var magnificationValue = document.querySelector('input[name="magnificationValue"]:checked').value;
  var isInvert = document.getElementById('setInvert').checked;
  var isGrayscale = document.getElementById("setGrayscale").checked;
  var isMeSpeak = document.getElementById("setMeSpeak").checked;
  var isKeyboard = document.getElementById("setKeyboard").checked;
  var style = document.querySelector('input[name="colorScheme"]:checked').value;
  var variantValue = document.querySelector('input[name="set screen reader variant"]:checked').value;
  var keyboardVariantValue = document.querySelector('input[name="set keyboard options"]:checked').value;
  var isSpeakAllText = document.getElementById("setSpeakAllText").checked;

  //var voiceValue = document.querySelector('input[name="voiceValue"]:checked').value;
    
  //Setting all the theme preferences in cookies
  var cookies = {};
  cookies['contrast'] = setCookie("contrast", contrastValue, 1, '');
  cookies['saturation'] = setCookie("saturation", saturationValue, 1, '');
  cookies['magnification'] = setCookie("magnification", magnificationValue, 1, '');
  cookies['isInvert'] = setCookie("isInvert", isInvert, 1, '');
  cookies['isGrayscale'] = setCookie("isGrayscale", isGrayscale, 1, '');
  cookies['isMeSpeak'] = setCookie("isMeSpeak", isMeSpeak, 1, '');
  cookies['isKeyboard'] = setCookie("isKeyboard", isKeyboard, 1, '');
  cookies['keyboardVariant'] = setCookie("keyboardVariant", keyboardVariantValue, 1, '');
  cookies['style'] = setCookie("style", style, 1, '');
  cookies['mespeak_speed'] = setCookie("mespeak_speed", speedValue, 1, '');
  cookies['mespeak_variant'] = setCookie("mespeak_variant", variantValue, 1, '');
  cookies['isSpeakAllText'] = setCookie("isSpeakAllText", isSpeakAllText, 1, '');

  //cookies['mespeak_voice'] = setCookie("mespeak_voice", voiceValue, 1, '');
    
  if(document.getElementById("userLoginId")) {
      var userLoginId = document.getElementById("userLoginId").getAttribute("value");
      var data = {};
      data["userPrefLoginId"] = userLoginId;
      data["userPrefGroupTypeId"] = "GLOBAL_PREFERENCES";
      var index = 0;
      $.each(document.cookie.split(/; */), function() {
          var splitCookie = this.split('=');
          // name is splitCookie[0], value is splitCookie[1]
          if (cookies[splitCookie[0]] != undefined) {
            data["userPrefTypeId_o_"+index] = splitCookie[0];
            data["userPrefValue_o_"+index] = splitCookie[1];
            index++;
          }
      });
      jQuery.ajax({
          async: true,
          type: 'post',
          url: "setUserPreferenceAjax",
          data: data,
          success: function (resp) {
              for (key in resp) {
                  if (key.indexOf("userPrefMap_o_") > -1) {
                      for (k in resp[key]) {
                          setCookie(k, resp[key][k], 1, '');
                      }
                  }
              }
          }
      });
    }
    $("#accessibility-notification").show();
    setTimeout(function(){
        $("#accessibility-notification").hide();
    }, 3000);
}


function setDefault(){
  var node = document.getElementById("body");
  if (document.getElementById('setInvert') !== undefined && document.getElementById('setInvert') !== null)
    document.getElementById('setInvert').checked = false;
    
  if (document.getElementById('setGrayscale') !== undefined && document.getElementById('setGrayscale') !== null)
    document.getElementById('setGrayscale').checked= false;
    
  if (document.getElementById('setMeSpeak') !== undefined && document.getElementById('setMeSpeak') !== null)
    document.getElementById('setMeSpeak').checked= false;
    
  if (document.getElementById('setKeyboard') !== undefined && document.getElementById('setKeyboard') !== null)
    document.getElementById('setKeyboard').checked= false;
    
  if (document.getElementById("setSpeakAllText") !== undefined && document.getElementById("setSpeakAllText") !== null) 
    document.getElementById("setSpeakAllText").checked = false;
    
  if (document.getElementById('grayOnWhite') !== undefined && document.getElementById('grayOnWhite') !== null)
    document.getElementById('grayOnWhite').checked = true;
    node.style.WebkitFilter = "saturate(100%) contrast(100%) grayscale(0%) invert(0%)";

  if (document.getElementById('grayOnWhite') !== undefined && document.getElementById('grayOnWhite') !== null)
    document.querySelector('input[id="mag-100"]').checked= true;
    node.style.zoom = "100%";
    
  if (document.getElementById('setVoice') !== undefined && document.getElementById('setVoice') !== null)
    document.querySelector('input[id="en_voice"]').checked= true;
  
  if (document.getElementById('setVariant') !== undefined && document.getElementById('setVariant') !== null)
    document.querySelector('input[id="key1_var"]').checked= true;
    
  if (document.getElementById('setKeyboardVariant') !== undefined && document.getElementById('setKeyboardVariant') !== null) {
    document.querySelector('input[id="key1_var"]').checked= false;
    document.querySelector('input[id="key2_var"]').checked= false;
  }

  //Reseting the aria-widget-slider thumb position
  var sliders = document.getElementsByClassName('aria-widget-slider');

  [].forEach.call(sliders, function(slider) {
    if (slider) {
      var s = new aria.widget.slider(slider);
      //console.log("Value of s is" +slider.getAttribute("id"));
      s.valueNow = 100;
      s.updateThumbPosition();
    }
  });

  //Resetting cookies
  switchColorScheme('');
  setCookie("contrast", 100, 1, '');
  setCookie("saturation", 100, 1, '');
  setCookie("magnification", 100, 1, '');
  setCookie("isInvert", false, 1, '');
  setCookie("isGrayscale", false, 1, '');
  setCookie("isMeSpeak", false, 1, '');
  setCookie("isKeyboard", false, 1, '');
  setCookie("style", 'grayOnWhite', '');
  setCookie("mespeak_speed", 100, 1, '');
  setCookie("mespeak_variant", "m1", 1, '');
  setCookie("keyboardVariant", "key1", 1, '');
  setCookie("isSpeakAllText", false, 1, '');
  //setCookie("mespeak_voice", "en", 1, '');
}

// *** Functions to switch style sheets ***
function switchColorScheme(title) {
  for (var i = 0, link = document.getElementsByTagName("link");
       i < link.length; i++) {
    if ((link[i].rel.indexOf("stylesheet") != -1) &&
        link[i].title) {
      link[i].disabled = true;
      if (link[i].title == title) {
        link[i].disabled = false;
      }
    }
    //setCookie(cookieName, title, cookieDurationInDays, domainName);
  }
}

function setStyleFromCookie() {
  //console.log("setStylefrom cookie");
  switchColorScheme(getCookie('style'));
  var grayScaleValue = invertValue = 0;

  // Setting color scheme radio button
  if (document.getElementById(getCookie('style')) !== undefined && document.getElementById(getCookie('style')) !== null)
    document.getElementById(getCookie('style')).checked = true;
  // Setting magnification radio button
  if (document.getElementById(("mag-"+getCookie('magnification'))) !== undefined && document.getElementById(("mag-"+getCookie('magnification'))) !== null)
    document.getElementById(("mag-"+getCookie('magnification'))).checked = true;
  else {
    if (document.getElementById("mag-100")) document.getElementById("mag-100").checked = true;
  }
    
  
  // Setting checkboxes' status
  if ((document.getElementById(getCookie('setInvert')) !== undefined && document.getElementById("setInvert") !== null) && getCookie("isInvert") == "true") {
    document.getElementById("setInvert").setAttribute("checked", "checked");
  }
  if ((document.getElementById(getCookie('setGrayscale')) !== undefined && document.getElementById("setGrayscale") !== null) && getCookie("isGrayscale") == "true") {
    document.getElementById("setGrayscale").setAttribute("checked", "checked");
  }
    
  if ((document.getElementById("setMeSpeak") !== undefined && document.getElementById("setMeSpeak") !== null) && getCookie("isMeSpeak") == "true")
    document.getElementById("setMeSpeak").setAttribute("checked", "checked");

  if ((document.getElementById("setKeyboard") !== undefined && document.getElementById("setKeyboard") !== null) && getCookie("isKeyboard") == "true")
    document.getElementById("setKeyboard").setAttribute("checked", "checked");
    
  if ((document.getElementById("setSpeakAllText") !== undefined && document.getElementById("setSpeakAllText") !== null) && getCookie("isSpeakAllText") == "true")
    document.getElementById("setSpeakAllText").setAttribute("checked", "checked");
    
    
  //Setting the contrast setting and saturation on body
  var node = document.getElementById("body");
  if (node) {
    if (getCookie("isInvert") == "true") invertValue = 100;
    if (getCookie("isGrayscale") == "true") grayScaleValue = 100;

    node.style.WebkitFilter = "saturate("+getCookie("saturation")+"%) contrast("+getCookie("contrast")+"%) grayscale("+grayScaleValue+"%) invert("+invertValue+"%)";
    node.style.filter = "saturate("+getCookie("saturation")+"%) contrast("+getCookie("contrast")+"%) grayscale("+grayScaleValue+"%) invert("+invertValue+"%)";
    node.style.zoom = getCookie("magnification")+"%";
  }

  //Setting position of the slider from the cookies
  if (document.getElementById("setContrastValue")) {
    document.getElementById("setContrastValue").setAttribute("aria-valuenow", getCookie("contrast"));
    var slider = document.getElementById("setContrastValue").parentNode.parentNode;
    if (slider) {
      var s = new aria.widget.slider(slider);
      s.initSlider();
    }
  }
    
  if (document.getElementById("setSaturationValue")) {
    document.getElementById("setSaturationValue").setAttribute("aria-valuenow", getCookie("saturation"));
    var slider = document.getElementById("setSaturationValue").parentNode.parentNode;
    if (slider) {
      var s = new aria.widget.slider(slider);
      s.initSlider();
    }
  }
   // set screen reader speed 
  if (document.getElementById("setSpeedValue")) {
    document.getElementById("setSpeedValue").setAttribute("aria-valuenow", getCookie("mespeak_speed"));
    var slider = document.getElementById("setSpeedValue").parentNode.parentNode;
    if (slider) {
      var s = new aria.widget.slider(slider);
      s.initSlider();
    }
  }

    
   // set screen reader variant radio button
 if (document.getElementById((getCookie('mespeak_variant')+"_var")) !== undefined && document.getElementById((getCookie('mespeak_variant')+"_var")) !== null)
    document.getElementById((getCookie('mespeak_variant')+"_var")).checked = true;
  else {
    if (document.getElementById("m1_var")) 
        document.getElementById("m1_var").checked = true;
  }
    
    // set keyboard variant radio button
 if (document.getElementById((getCookie('keyboardVariant')+"_var")) !== undefined && document.getElementById((getCookie('keyboardVariant')+"_var")) !== null)
    document.getElementById((getCookie('keyboardVariant')+"_var")).checked = true;
  else {
    if (document.getElementById("key1_var")) 
        document.getElementById("key1_var").checked = true;
    if (document.getElementById("key2_var")) 
        document.getElementById("key2_var").checked = false;
  }
    
  if (getCookie("magnification"))
    document.getElementsByName("mag-"+getCookie("magnification")).checked = true;


  /*// document.getElementById(getCookie('style')).checked = true;
  document.getElementById("setContrastValue").setAttribute("aria-valuenow", getCookie("contrast"));
  document.getElementById("setSaturationValue").setAttribute("aria-valuenow", getCookie("saturation"));
  document.getElementById("setMagnificationValue").setAttribute("aria-valuenow", getCookie("magnification"));
  */
}

function setCookiesFromUserPreferences() {
  //Check user login and set fetch use preferences
  if(document.getElementById("userLoginId")) {
    var userLoginId = document.getElementById("userLoginId").getAttribute("value");
    var data = {};
    data["userPrefLoginId"] = userLoginId;
    data["userPrefGroupTypeId"] = "GLOBAL_PREFERENCES";
    var userPreferenceNameList = ["style","contrast", "saturation", "magnification", "isInvert", "isGrayscale", "isMeSpeak", "isKeyboard", "mespeak_speed", "mespeak_variant", "isSpeakAllText", "keyboardVariant"];
    $.each(userPreferenceNameList, function(index, value) {
      data["userPrefTypeId_o_"+index] = value;
    })
    jQuery.ajax({
      async: true,
      type: 'post',
      url: "getUserPreferenceAjax",
      data: data,
      success: function(resp) {
        for (key in resp) {
          if (key.indexOf("userPrefMap_o_") > -1) {
            for (k in resp[key]) {
              setCookie(k, resp[key][k], 1, '');
            }
          }
        }
      }
    }).done(function(){
      setStyleFromCookie();
    });
  }
  setStyleFromCookie();
    
  // If text to speech is on, display the variant options.
  if (document.getElementById('speakVariants') != null) {
    var isMeSpeak = getCookie('isMeSpeak');
    if (isMeSpeak == 'false') {
        document.getElementById('speakVariants').style.display = 'none';
    }else {
        document.getElementById('speakVariants').style.display = 'block';
    }
  }


  // If speakKeyword is selected, display the options to speak by key or word.
  if (document.getElementById('setKeyboard') != null) {
    var isKeyboard = getCookie('isKeyboard');
    if (isKeyboard == 'false') {
        document.getElementById('keyboardVariants').style.display = 'none';
    }else {
        document.getElementById('keyboardVariants').style.display = 'block';
    }
  }
}

function setCookie(cookieName, cookieValue, cookieDuration, domain) {
  //This domain name is just for local testing purpose and should be removed in future.
  // domain = "127.0.0.1";
  var domain_string = domain ? ("; domain=" + domain) : '';
  document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + "; max-age=" + 60 * 60 * 24 * cookieDuration + "; path=/" + domain_string;
  return cookieValue;
}
function getCookie(cookieName) {
  var re = new RegExp(cookieName + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}
