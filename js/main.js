/* eslint-disable no-undef */
// console.js
'use strict'
// darkmode.js
// reverse button
const scrollWidth =
  document.body.scrollWidth || document.documentElement.scrollWidth
let darkControlButton = null
let searchControlButton = null
if (scrollWidth <= 742) {
  darkControlButton = document.getElementsByClassName('darkwidget')[0]
  searchControlButton = document.getElementsByClassName('searchwidget')[0]
} else {
  darkControlButton = document.getElementsByClassName('darknavbar')[0]
  searchControlButton = document.getElementsByClassName('searchnavbar')[0]
}

darkControlButton.addEventListener('click', () => {
  setDarkmode(reverseDarkModeSetting())
})
// scroll-up.js
const smoothScrollToTop = () => {
  let yTopValve =
    window.pageYOffset ||
    document.body.scrollTop ||
    document.documentElement.scrollTop
  if (yTopValve > 1) {
    window.requestAnimationFrame(smoothScrollToTop)
    scrollTo(0, Math.floor(yTopValve * 0.85))
  } else {
    scrollTo(0, 0)
  }
}
setTimeout(() => {
  document.getElementById('scrollbutton').onclick = smoothScrollToTop
}, 0)
// popbutton.js
const reversePopButton = () => {
  const scrollButton = document.getElementById('scrollbutton')
  const menuButton = document.getElementById('menubutton')
  const reverseButton = document.getElementById('popbutton')
  const scrollWidth =
    document.body.scrollWidth || document.documentElement.scrollWidth
  if (scrollButton.style.opacity === '1') {
    scrollButton.style.bottom = '32px'
    scrollButton.style.opacity = '0'
    reverseButton.style.transform = 'none'
  } else {
    reverseButton.style.transform = 'rotate(90deg)'
    scrollButton.style.bottom = '85px'
    scrollButton.style.opacity = '1'
  }
  const mobileToc = document.getElementById('mobiletoc')
  if (scrollWidth <= 862 && mobileToc) {
    if (menuButton.style.opacity === '1') {
      menuButton.style.right = '32px'
      menuButton.style.opacity = '0'
    } else {
      menuButton.style.right = '85px'
      menuButton.style.opacity = '1'
    }
  }
  const darkButton = document.querySelector('.darkwidget')
  const searchButton = document.querySelector('.searchwidget')
  if (scrollWidth <= 742) {
    if (darkButton.style.opacity === '1') {
      darkButton.style.bottom = '32px'
      darkButton.style.opacity = '0'
      darkButton.style.transform = 'none'
    } else {
      darkButton.style.display = 'flex'
      reverseButton.style.transform = 'rotate(90deg)'
      darkButton.style.bottom = '138px'
      darkButton.style.opacity = '1'
    }

    if (searchButton.style.opacity === '1') {
      searchButton.style.bottom = '32px'
      searchButton.style.opacity = '0'
      searchButton.style.transform = 'none'
    } else {
      searchButton.style.display = 'flex'
      searchButton.style.transform = 'rotate(90deg)'
      searchButton.style.bottom = '191px'
      searchButton.style.opacity = '1'
    }
  }
}
setTimeout(() => {
  document
    .getElementById('popbutton')
    .addEventListener('click', reversePopButton)
}, 0)
// menuButton.js
function menuClick(event) {
  const target = event.target
  const mobileToc = document.getElementById('mobiletoc')
  if (!mobileToc) {
    return
  }
  if (!mobileToc.contains(target)) {
    mobileToc.style.display = 'none'
    mask.remove()
    document.removeEventListener('click', menuClick)
  }
}
const clickMenuButton = () => {
  const mobileToc = document.getElementById('mobiletoc')
  if (!mobileToc) {
    return
  }
  mobileToc.style.display = 'block'
  const mask = document.createElement('div')
  mask.id = 'mask'
  document.body.append(mask)
  setTimeout(() => {
    document.addEventListener('click', menuClick)
  }, 0)
}
setTimeout(() => {
  document.getElementById('menubutton').onclick = clickMenuButton
}, 0)
// search.js
// search button
function searchClick(event) {
  const searchContent = document.querySelector('#local-search')
  if (!searchContent.contains(event.target)) {
    const searchInput = document.querySelector('#search-input')
    const content = document.querySelector('#search-content')
    searchInput.value = ''
    searchContent.style.display = 'none'
    content.innerHTML = ''
    mask.remove()
    document.removeEventListener('click', searchClick)
  }
}

setTimeout(() => {
  searchControlButton.addEventListener('click', () => {
    const mask = document.createElement('div')
    mask.id = 'mask'
    document.body.append(mask)
    const searchMain = document.querySelector('#local-search')
    searchMain.style.display = 'block'
    setTimeout(() => {
      document.addEventListener('click', searchClick)
    }, 0)
  })
})

const localSearch = function (path) {
  fetch(path)
    .then((res) => res.json())
    .then((res) => {
      let input = document.getElementById('search-input')
      let resultContent = document.getElementById('search-content')

      input.addEventListener('input', function () {
        let str = '<ul class="search-result-list">'
        let keyword = this.value.trim().toLowerCase()
        resultContent.innerHTML = ''
        if (this.value.trim().length <= 0) {
          return
        }
        res.forEach(function (data) {
          let isMatch = true
          if (!data.title || data.title.trim() === '') {
            data.title = 'Untitled'
          }
          const dataTitle = data.title.trim().toLowerCase()
          const dataContent = data.content
            .trim()
            .replace(/<[^>]+>/g, '')
            .toLowerCase()
          let firstOccur = -1
          if (dataTitle !== '') {
            const indexTitle = dataTitle.indexOf(keyword)
            const indexContent = dataContent.indexOf(keyword)
            firstOccur = indexContent
            if (indexTitle < 0 && indexContent < 0) {
              isMatch = false
            } else if (indexContent < 0) {
              firstOccur = 0
            }
          } else {
            isMatch = false
          }
          if (isMatch) {
            str += `<li><a href="${data.url}" class="search-result-title" >${dataTitle}</a>`
            const content = data.content
            if (firstOccur >= 0) {
              const start = Math.max(0, firstOccur - 12)
              const end = Math.min(content.length, firstOccur + 12)
              let matchContent = content.substr(start, end)
              matchContent = matchContent.replace(
                new RegExp(keyword, 'gi'),
                '<em class="search-keyword">' + keyword + '</em>'
              )
              str += '<p class="search-result">' + matchContent + '...</p>'
            }
            str += '</li>'
          }
        })
        str += '</ul>'
        if (str.indexOf('<li>') === -1) {
          return (resultContent.innerHTML =
            '<ul><span class="local-search-empty">没有搜索到结果<span></ul>')
        }
        resultContent.innerHTML = str
      })
    })
}

function get_qqinfo(){
  var serverUrl = $('#ArtalkComments').attr('serverApi');
  if (serverUrl == '') return;
  var qq_num = $('.artalk-nick').val();
  if(qq_num && !isNaN(qq_num)){
    $("#loading").html('<a style="font-size:16px;margin-left:5px;">正在获取QQ信息中...</a>').show();
    $.ajax({
      url: serverUrl,
      type: "get",
      data: {qq:qq_num},
      dataType: "json",
        success: function(data) {
          if(data != null) {
            // 数据获取成功时
            $(".artalk-nick").val(data[qq_num][6] == "" ? 'QQ用户' : data[qq_num][6]);
            $(".artalk-email").val(qq_num + '@qq.com'); 
            $(".artalk-link").val('https://user.qzone.qq.com/' + qq_num); 
            $("#loading").html('<a style="font-size:16px;margin-left:5px;">QQ信息获取成功...</a>').show().fadeOut(5000);
            document.querySelector(".artalk-nick").dispatchEvent(new Event("input"));
            document.querySelector(".artalk-email").dispatchEvent(new Event("input"));
            document.querySelector(".artalk-link").dispatchEvent(new Event("input"));
          } 
        },
        // 数据获取失败执行
        error: function(err) {
          if (err.responseText == "") {
            $("#loading").html('<a style="font-size:16px;margin-left:5px;">QQ号码有误，请正确输入...</a>').show().fadeOut(5000);
          } else {
            $("#loading").html('<a style="font-size:16px;margin-left:5px;">网络错误，无法获取...</a>').show().fadeOut(5000);
          }
          
        }
    });
  }
}

// 代码块复制
function addCopy() {
  var copyHtml = '';
  copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
  copyHtml += '<span>复制</span>';
  copyHtml += '</button>';
  $(".highlight .code pre").before(copyHtml);
  new ClipboardJS('.btn-copy', {
    target: function(trigger) {
      return trigger.nextElementSibling;
    }
  });
}

// 隐藏图片
function displayImg(productImg) {
  if (productImg == "undefined" || productImg == null || productImg == "") {
    return;
  }
  //给图片容器赋值路径
  $("#Screenshot").attr("src", productImg);
  $(document).mousemove(function(e) {
    $("#Screenshot").css("position", "absolute").css("left", e.pageX+1+"px").css("top", e.pageY+1+"px").css("width","400px");
  })
}

// 关闭图片，当鼠标移出时执行
function hideImg() {
  $("#Screenshot").attr("src", "");
  $(document).mousemove(function(e) {
    $("#Screenshot").css("position", "absolute").css("left", "-400px").css("top", "-400px");
  })
}

function showToast(message, timeout) {
  timeout = isNaN(timeout)?3000:timeout;
  var m = document.createElement('div');
  m.innerHTML = message;
  m.style.cssText="width:10px; min-width: 250px;margin-left: -125px; background:#000; opacity:0.6; height:auto;min-height: 30px; color:#fff; line-height:30px; text-align:center; border-radius:4px; position:fixed; top:5%; left:50%; z-index:999999;";
  document.body.appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() { document.body.removeChild(m) }, d * 1000);
  }, timeout);
}

if ('serviceWorker' in navigator) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      showToast("✨  网站更新了，请刷新页面 👇"+`<br><a style="color:red" href="javascript:void(0)" onclick="location.reload()">刷新页面</a>`,5e5);
    })
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
  })
}