
//iOS 交互声明
let flag = true;
function connectWebViewJavascriptBridgeIOS(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}


//Android 交互声明
function connectWebViewJavascriptBridgeANDROID(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function () {
        callback(WebViewJavascriptBridge);
      },
      false
    );
  }
}

export default {
  callhandler(name, data, callback) {
    if(/(Android)/i.test(navigator.userAgent)){
      connectWebViewJavascriptBridgeANDROID(function(bridge){
        bridge.callHandler(name, data, callback)
      })
    }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
      connectWebViewJavascriptBridgeIOS(function (bridge) {
        bridge.callHandler(name, data, callback)
      })
    }
  },
  registerhandler(name, callback) {
    if(/(Android)/i.test(navigator.userAgent)){
      connectWebViewJavascriptBridgeANDROID(function(bridge){
        if(flag){
          bridge.init(function(message, responseCallback) {
            callback(message, responseCallback)
          });
          flag = false;
        }
        bridge.registerHandler(name, function(data, responseCallback){
          callback(data, responseCallback)
        })
      })
    }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
      connectWebViewJavascriptBridgeIOS(function (bridge) {
        bridge.registerHandler(name, function (data, responseCallback) {
          callback(data, responseCallback)
        })
      })
    }
    
  }
}