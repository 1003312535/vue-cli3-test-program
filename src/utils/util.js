/**----------------------------------------浏览器是否全屏切换--------------------------------- */
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 浏览器开启全屏
 */
export const reqFullScreen = () => {
  console.log(111);
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
  return isFullscreen;
};

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }
  document.addEventListener('fullscreenchange', function(e) {
    console.log(e, 'ee');
    listen();
  });
  document.addEventListener('mozfullscreenchange', function(e) {
    console.log(e, 'ee');
    listen();
  });
  document.addEventListener('webkitfullscreenchange', function(e) {
    console.log(e, 'ee');
    listen();
  });
  document.addEventListener('msfullscreenchange', function(e) {
    console.log(e, 'ee');
    listen();
  });
};

/**----------------------------------------浏览器是否全屏切换--------------------------------- */


/**----------------------------------------对象深拷贝--------------------------------- */
export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
export const getObjType = (obj) => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**----------------------------------------对象深拷贝--------------------------------- */