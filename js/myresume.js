var MyResume = MyResume || {};

(function() {
  var self = self || {};
  self.pageMax = 0;
  self.pagesDom = [];
  self.pagesDefaultInnerHTML = [];
  self.pageStartIndex = {};

  function initMyResume() {
    console.log('%c Welcome, just contact me.', 'color:#00f;font-size:20px;');

    // init hash
    var hash = window.location.hash;
    hash = hash.match(/^#page\d+$/gi) ? hash : '#page1';
    window.location.hash = hash;

    self.pagesDom = document.getElementsByClassName('page');
    self.pageMax = self.pagesDom.length;

    for (var i = 0; i < self.pageMax; i++) {
      self.pagesDefaultInnerHTML[i] = self.pagesDom[i].innerHTML;

      var pageName = self.pagesDom[i].className.replace(/page\spage_/, '');
      var pageIndex = i + 1;
      self.pageStartIndex[pageName] = self.pageStartIndex[pageName] || pageIndex;
    };

    addGlobalEvents();

    // start view resume page
    viewResumePage();
  }

  function getPageNow() {
    return parseInt(window.location.hash.replace(/^#page/, ''));
  }

  function viewResumePage() {
    var pageNow = getPageNow();

    // update navigation
    var lis = document.getElementById('pagenavigation').getElementsByTagName('li');
    Util.removeClass(lis, 'selected');

    var pageName = '';
    for (var key in self.pageStartIndex) {
      var pageIndex = self.pageStartIndex[key];
      if (pageIndex >= pageNow) {
        pageName = key;
        break;
      }
    }
    Util.addClass(document.getElementById('li-' + pageName), 'selected');

    // set default innerHTML
    self.pagesDom[pageNow - 1].innerHTML = self.pagesDefaultInnerHTML[pageNow - 1];

    // page popup animation
    Util.addClass(self.pagesDom[pageNow - 1].getElementsByClassName('pagecontent'), 'a-zoomin a-duration1s');

    // init page with animation
    var initPageFunc = 'try{initPage_' + self.pagesDom[pageNow - 1].className.replace(/page\spage_/, '').replace(/\b\w/, function(str) {
      return str.toUpperCase();
    }) + '();}catch(e){}';
    eval(initPageFunc);
  }

  function addGlobalEvents() {
    Util.addEvent(document.getElementById('arrowdown'), 'click', pageDown, false);
    Util.addEvent(document.getElementById('arrowup'), 'click', pageUp, false);

    Util.addEvent(document, 'mousewheel', wheelPageHandler, false);
    Util.addEvent(document, 'keydown', keyPressHandler, false);

    var lis = document.getElementById('pagenavigation').getElementsByTagName('li');
    Util.addEvent(lis, 'click', li_ClickHandler, false);

    // for slide
    Util.addEvent(document, 'touchstart', TouchEventForSlide.touchStart, false);
    Util.addEvent(document, 'touchend', TouchEventForSlide.touchEnd, false);
    Util.addEvent(document, 'touchmove', TouchEventForSlide.touchMove, false);
    Util.addEvent(document, 'touchcancel', TouchEventForSlide.touchCancel, false);
  }

  function wheelPageHandler(event) {
    event = event || window.event;
    if (event.wheelDeltaY < 0 || event.wheelDelta < 0) {
      pageDown();
    }
    if (event.wheelDeltaY > 0 || event.wheelDelta > 0) {
      pageUp();
    }
  }

  function keyPressHandler(event) {
    event = event || window.event;
    var key = event.keyCode;
    if (key === 40) {
      pageDown();
    }
    if (key === 38) {
      pageUp();
    }
  }

  function li_ClickHandler() {
    var pageIndex = self.pageStartIndex[this.getElementsByTagName('span')[0].innerHTML.toLowerCase()];
    gotoPage(pageIndex);
  }

  var TouchEventForSlide = (function() {
    var startX,
      startY,
      endX,
      endY,
      nowX,
      nowY;

    function isSlide() {
      if (Math.abs(endY - startY) > 100) {
        return true;
      }
      return false;
    }

    function slidePage() {
      if (endY > startY) {
        pageUp();
      }
      if (endY < startY) {
        pageDown();
      }
    }

    function touchStart(event) {
      event = event || window.event;
      console.log('touchStart', event);
      startX = event.changedTouches[0].pageX;
      startY = event.changedTouches[0].pageY;
      event.preventDefault();
    }

    function touchEnd(event) {
      event = event || window.event;
      console.log('touchEnd', event);
      endX = event.changedTouches[0].pageX;
      endY = event.changedTouches[0].pageY;

      isSlide() && slidePage();
    }

    function touchMove(event) {
      event = event || window.event;
      console.log('touchMove', event);
      nowX = event.changedTouches[0].pageX;
      nowY = event.changedTouches[0].pageY;
    }

    function touchCancel(event){
      event = event || window.event;
      console.log('touchCancel', event);
      endX = event.changedTouches[0].pageX;
      endY = event.changedTouches[0].pageY;

      isSlide() && slidePage();
    }

    return {
      touchStart: touchStart,
      touchEnd: touchEnd,
      touchMove: touchMove,
      touchCancel: touchCancel
    }
  })();

  function pageDown() {
    gotoPage(getPageNow() + 1);
  }

  function pageUp() {
    gotoPage(getPageNow() - 1);
  }

  function gotoPage(pageIndex) {
    if (pageIndex < 1) {
      pageIndex = self.pageMax;
    }
    if (pageIndex > self.pageMax) {
      pageIndex = 1;
    }

    // go
    var pageNow = getPageNow();
    window.location.hash = window.location.hash.replace(pageNow, pageIndex);

    viewResumePage();
  }

  function initPage_Introduction() {
    var mySign = document.getElementById('mysign');
    var myEmail = document.getElementById('myemail');

    Util.addClass(mySign, 'hidden');
    Util.addClass(myEmail, 'hidden');

    setTimeout(function() {
      Util.removeClass(mySign, 'hidden');
      Util.addClass(mySign, 'a-sildeup a-duration1s');
    }, 1000);
    setTimeout(function() {
      Util.removeClass(myEmail, 'hidden');
      Util.addClass(myEmail, 'a-sildeup a-duration1s');
    }, 1500);
  }

  function initPage_Skill() {
    var skillTree = document.getElementById('skilltree');
    var expertSkills = skillTree.getElementsByClassName('expert');
    var familiarSkills = skillTree.getElementsByClassName('familiar');
    var justknowSkills = skillTree.getElementsByClassName('justknow');

    Util.addClass(expertSkills, 'hidden');
    Util.addClass(familiarSkills, 'hidden');
    Util.addClass(justknowSkills, 'hidden');

    setTimeout(function() {
      Util.removeClass(expertSkills, 'hidden');
      Util.addClass(expertSkills, 'a-zoomin a-duration1s');
    }, 1000);
    setTimeout(function() {
      Util.removeClass(familiarSkills, 'hidden');
      Util.addClass(familiarSkills, 'a-zoomin a-duration1s');
    }, 1600);
    setTimeout(function() {
      Util.removeClass(justknowSkills, 'hidden');
      Util.addClass(justknowSkills, 'a-zoomin a-duration1s');
    }, 2200);
  }

  function initPage_Internship() {
    var myInternship = document.getElementById('myinternship');
    var myProject = myInternship.getElementsByClassName('myintern');

    Util.addClass(myProject, 'hidden');

    setTimeout(function() {
      Util.removeClass(myProject[0], 'hidden');
      Util.addClass(myProject[0], 'a-sildeup a-duration1s');
    }, 800);
    for (var i = 1; i < myProject.length; i++) {
      (function(i) {
        setTimeout(function() {
          Util.removeClass(myProject[i], 'hidden');
          Util.addClass(myProject[i], 'a-sildeup a-duration1s');
        }, 800 + 800 * i);
      })(i);
    }
  }

  MyResume = {
    initMyResume: initMyResume
  };
})();


MyResume.initMyResume();