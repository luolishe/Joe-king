var prefixs = ["-webkit-", "-moz-", "-ms-", ""];

        /* 防止触发ie的图片拖动效果 */
        document.ondragstart = function() {
            return false;
        };
        /* 随机选择一只舰娘 */
        var kans = $('.kankore-bath .kan'),
            kan_id = Math.floor(Math.random() * kans.length),
            kan = kans.eq(kan_id);
        /* 随机从左侧或右侧进入屏幕 */
        var screen_width = $(window).width(),
            screen_height = $(window).height(),
            x = Math.random() > .5 ? screen_width : -170,
            dx = x > 0 ? -10 : 10,
            y = screen_height - 170,
            angle = 1.3,
            water_direction = x > 0 ? 'waves-r2l' : 'waves-l2r';
        /* 根据舰娘漂浮的方向决定水流方向 */
        var water_animation = {};
        for(var i in prefixs)
            water_animation[prefixs[i] + 'animation'] = water_direction + ' 10s linear infinite';
        $('.kankore-bath .water').css(water_animation);
        /* 把舰娘放到初始位置上 */
        kan.css({
            'left': x,
            'top': y,
            'display': 'block'
        }).addClass('floating');
        /* 鼠标抓取 */
        $(document).on('mousedown', '.kan', start_drag)
            .on('mousemove', dragging)
            .on('mouseup', stop_drag);
        /* resize */
        $(window).resize(function() {
            screen_height = $(window).height(),
                y = screen_height - 170;
        });
        var tick = null;
        float();
        /* GO */
        function float() {
            clearInterval(tick);
            tick = setInterval(frame, 1000);
        }

        function frame() {
            if(x < -170) {
                dx = 10
            }
            else if(x > screen_width) {
                dx = -10
            }
            x += dx;
            var _y = y + 3 * Math.sin(x) - 3;
            angle = Math.random() * 4 - 2;
            var transform = {
                'left': x,
                'top': _y
            };
            for(var i in prefixs) {
                transform[prefixs[i] + 'transform'] = 'rotate(' + angle + 'deg)';
            }
            kan.css(transform);
            
        }

        function pause() {
            clearInterval(tick);
        }

        var offsetX, offsetY, mouse_down_flag = false,
            mouse_move_flag = false;

        function start_drag(e) {
            /* 暂停漂浮动画 */
            pause();
            kan.removeClass('floating').addClass('dragging');
            /* 记录用户操作 */
            mouse_down_flag = true;
            mouse_move_flag = false;
            /* 记录鼠标点击的位置与舰娘图像的左上角坐标差 */
            offsetX = kan.offset().left - e.pageX;
            offsetY = kan.offset().top - e.pageY;
        }

        function dragging(e) {
            if(!mouse_down_flag) return;
            mouse_move_flag = true;
            x = e.clientX + offsetX;
            /* 舰娘跟随鼠标移动 */
            kan.css({
                'left': x,
                'top': e.clientY + offsetY
            });
        }

        function stop_drag() {

                /* 有移动则是鼠标拖拽事件 */
                kan.removeClass('dragging').addClass('dropping');
                kan.css({
                    'left': x,
                    'top': y
                });
                setTimeout(function() {
                    kan.removeClass('dropping').addClass('floating');
                    frame();
                    float();
                }, 800);
            
            /* 重置标识 */
            mouse_down_flag = false;
            mouse_move_flag = false;
        }
        
        
        
        
$(function() {
    var num = $("#footgundong").find("li").length;
    if (num > 1) {
        setInterval(function() {
            $('#footgundong').animate({
                marginTop: "-45px"
            }, 500, function() {
                $(this).css({
                    marginTop: "0"
                }).find("li:first").appendTo(this);
            });
        }, 3000);
    }
});
window.onscroll = function() {
    let scrollNow = window.pageYOffset;
    let pageClientHeight = document.documentElement.clientHeight;
    let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - pageClientHeight;
    let fullWindowHeightInPercentage = Math.round((scrollNow / scrollHeight) * 100);
    let percentage = document.getElementById('percentage');
    percentage.innerHTML = '<i class="newiconfont newicon-A7"></i> ' + fullWindowHeightInPercentage + '%';
    
    if (fullWindowHeightInPercentage == 0) percentage.innerHTML = '<i class="newiconfont newicon-A7"></i> 到顶啦！';
    if (fullWindowHeightInPercentage == 100) percentage.innerHTML = '<i class="newiconfont newicon-A7"></i> 到底啦！';
    if (fullWindowHeightInPercentage == Infinity) percentage.innerHTML = '<i class="newiconfont newicon-A7"></i> 返回顶部！';
};
var prefixs = ["-webkit-", "-moz-", "-ms-", ""];
document.ondragstart = function() {
    return false;
};
/*
var kans = $('.kankore-bath .kan'),
    kan_id = Math.floor(Math.random() * kans.length),
    kan = kans.eq(kan_id);
var screen_width = $(window).width(),
    screen_height = $(window).height(),
    x = screen_width,
    dx = -10,
    y = screen_height - 120,
    angle = 1.3,
    water_direction = x > 0 ? 'waves-r2l' : 'waves-l2r';
kan.css({
    'left': x,
    'top': y,
    'display': 'block'
}).addClass('floating');
*/
/*$(document).on('mousedown', '.kan', start_drag).on('mousemove', dragging).on('mouseup', stop_drag);
$(window).resize(function() {
    screen_height = $(window).height(), y = screen_height - 120;
});
*/
var tick = null;
float();

function float() {
    clearInterval(tick);
    tick = setInterval(frame, 1000);
}

function frame() {
    if (x < 280) {
        dx = 10
    } else if (x > (screen_width - 100)) {
        dx = -10
    }
    x += dx;
    var _y = y + 3 * Math.sin(x) - 3;
    angle = Math.random() * 4 - 2;
    var transform = {
        'left': x,
        'top': _y
    };
    for (var i in prefixs) {
        transform[prefixs[i] + 'transform'] = 'rotate(' + angle + 'deg)';
    }
    kan.css(transform);
}

function pause() {
    clearInterval(tick);
}
var offsetX, offsetY, mouse_down_flag = false,
    mouse_move_flag = false;

function start_drag(e) {
    pause();
    kan.removeClass('floating').addClass('dragging');
    mouse_down_flag = true;
    mouse_move_flag = false;
    offsetX = kan.offset().left - e.pageX;
    offsetY = kan.offset().top - e.pageY;
}

function dragging(e) {
    if (!mouse_down_flag) return;
    mouse_move_flag = true;
    x = e.clientX + offsetX;
    kan.css({
        'left': x,
        'top': e.clientY + offsetY
    });
}

function stop_drag() {
    kan.removeClass('dragging').addClass('dropping');
    kan.css({
        'left': x,
        'top': y
    });
    setTimeout(function() {
        kan.removeClass('dropping').addClass('floating');
        frame();
        float();
    }, 800);
    mouse_down_flag = false;
    mouse_move_flag = false;
}









/*禁用左键*/
/*
$(document).ready(function() {
    document.onselectstart = function() {
        return false;
    }
    */
    document.onkeydown = function() {
        if (window.event && window.event.keyCode == 123) {
            event.keyCode = 0;
            event.returnValue = false;
            new Vue({
                data: function() {
                    this.$notify({
                        title: "嘿！别瞎按",
                        message: "坏孩子！",
                        position: 'bottom-right',
                        offset: 50,
                        showClose: false,
                        type: "error"
                    });
                    return {
                        visible: false
                    };
                }
            });
            return false;
        }
        if (event.ctrlKey && window.event.keyCode == 85) {
            return false;
        }
        if ((event.ctrlKey) && (event.shiftKey) && (event.keyCode == 73)) {
            new Vue({
                data: function() {
                    this.$notify({
                        title: "嘿！别瞎按",
                        message: "坏孩子！",
                        position: 'bottom-right',
                        offset: 50,
                        showClose: false,
                        type: "error"
                    });
                    return {
                        visible: false
                    };
                }
            });
            return false;
        } else if ((event.ctrlKey) && (event.keyCode == 83)) {
            return false;
        }
    };
});


// $(document).on('click', '#eatfish', function() {
//     swal({
//         title: "快来关注小站“公众号”！",
//         text: "打开微信扫一扫即可关注喵喵！现在还在试运行哦，有不足之处快来留言提意见呀！",
//         button: false,
//         icon: "/ziyuan/image/qrcode/公众号.webp"
//     });
// });




// var laiyuan = document.referrer;
// $(function() {
//     if (laiyuan.indexOf("foreverblog") > 0) {
//         swal({
//             title: "欢迎你，“虫洞”穿梭旅行者",
//             text: "欢迎您无意间通过虫洞穿越到小站。\n小站是火喵的日常博客，记录日常生活中的快乐。火喵也会常常在线，遇到留言就会及时回复哒！最后！祝玩得开心吖！",
//             button: false,
//             icon: "https://jihulab.com/ScarletDor/owo/-/raw/master/avatar/cat_ran/22.webp"
//         });
//     } else if (laiyuan.indexOf("travellings") > 0) {
//         swal({
//             title: "欢迎你，“开往”穿梭旅行者",
//             text: "欢迎您无意间通过开往穿越到小站。\n小站是火喵的日常博客，记录日常生活中的快乐。火喵也会常常在线，遇到留言就会及时回复哒！最后！祝玩得开心吖！",
//             button: false,
//             icon: "https://jihulab.com/ScarletDor/owo/-/raw/master/avatar/cat_ran/22.webp"
//         });
//     }
// });


$(function() {
    setTimeout(function() {
        if ($('.cardads').height() == 0 && $('.postads').height() == 0) {
            new Vue({
                data: function() {
                    this.$notify({
                        title: "🚫 小站广告未显示",
                        dangerouslyUseHTMLString: true,
                        message: "ㅤㅤ广告未显示会影响部分功能<span class='aboutads' style='color:#999999;'> ☛<em>&nbsp;<u>详情</u></em></span>",
                        dangerouslyUseHTMLString: true,
                        position: 'bottom-right',
                        offset: 50,
                        duration: 0
                    });
                    return {
                        visible: false
                    };
                }
            });
        }
    }, 5000);
});
$(document).on('click', '#dorzs', function() {
    swal({
        title: "请喵吃鱼啦",
        text: "哇！喵喵超级开心的！！",
        icon: "/000pages/api/api-mc.php",
        buttons: {
            weixin: {
                text: "微信",
                value: "weixin",
            },
            zfb: {
                text: "支付宝",
                value: "zfb",
            },
        },
    }).then(function(value) {
        if (value == "weixin") {
            swal({
                title: "感谢打赏！",
                text: "感谢您的微信打赏，我会努力做得更好！",
                button: false,
                icon: "/ziyuan/image/qrcode/微信.webp"
            });
        } else if (value == "zfb") {
            swal({
                title: "感谢打赏！",
                text: "感谢您的支付宝打赏，我会努力做得更好！",
                button: false,
                icon: "/ziyuan/image/qrcode/支付宝.webp"
            });
        }
    });
});
$(document).on('click', '#bloglogin', function() {
    swal({
        title: "管理入口",
        text: "火喵酱登录的管理入口哦",
        buttons: {
            login: {
                text: "跳转",
                value: "login",
            },
        },
    }).then(function(value) {
        if (value == "login") {
            window.open("/admin/login.php", 'top');
        }
    });
});
$(document).on('click', '.aboutcopy', function() {
    swal({
        title: "💡 关于复制",
        text: "右键因为没什么用所以屏蔽了，如需复制代码框内代码，可点击代码框右上方按钮复制，带粘贴图案的红色文字可以点击复制",
        button: false,
    });
});
$(document).on('click', '.aboutads', function() {
    swal({
        title: "💡 关于广告屏蔽插件",
        text: "现在屏蔽广告功能正在试用。\n\n屏蔽广告并不会影响网站的正常访问以及评论区的显示，但是会影响留言操作，所以还是希望能够关闭广告屏蔽插件。\n\n如果未曾使用屏蔽广告插件，请反复刷新几次待广告成功加载即可；如果仍未成功显示广告，请去留言板给火喵留言。",
        button: false,
    });
});
$(document).on('click', '#shoucang', function() {
    new Vue({
        data: function() {
            this.$notify({
                title: "⭐ 嘿！欢迎收藏小站",
                message: "ㅤㅤ️使用 Ctrl+D 即可添加收藏",
                dangerouslyUseHTMLString: true,
                position: 'bottom-right',
                offset: 50,
                showClose: false
            });
            return {
                visible: false
            };
        }
    });
});
$(document).on('click', '#sslanquan', function() {
    new Vue({
        data: function() {
            this.$notify({
                title: "🔰 安全站点",
                message: "<div id='myssl'>ㅤㅤ使用 <u>TrustAsia</u> 证书，保障通信安全</div>",
                dangerouslyUseHTMLString: true,
                position: 'bottom-right',
                offset: 50,
                showClose: false
            });
            return {
                visible: false
            };
        }
    });
});
$(document).on('click', '#myssl', function() {
    window.open('//myssl.com/seal/detail?domain=dorcandy.cn', '安全签章', 'height=880,width=470,top=0,right=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
});
/*document.addEventListener("copy", function(e) {
    new Vue({
        data: function() {
            this.$notify({
                title: "嘿！复制成功",
                message: "若要转载请务必保留原文链接！爱你呦~",
                position: 'bottom-right',
                offset: 50,
                showClose: false,
                type: "success"
            });
            return {
                visible: false
            };
        }
    });
});*/

$(document).on('click', '#gongnengmenu', function() {
    new Vue({
        data: function() {
            this.$notify({
                title: "🔖 功能菜单（测试）",
                message: "<br><span id='1'>ㅤㅤ🏠 设为浏览器主页</span><br><br><span id='2'>ㅤㅤ🌟 添加到收藏夹</span><br><br><span id='3'>ㅤㅤ📦 安装小站应用</span>",
                dangerouslyUseHTMLString: true,
                position: 'bottom-left',
                offset: 50,
            });
            return {
                visible: false
            };
        }
    });
});
if (window.Notification) {
    Notification.requestPermission();
} else {
    swal({
        text: "浏览器不支持消息提醒，推荐使用chrome浏览器"
    });
}
document.querySelector('#btn-submit').addEventListener('click', function() {
    const title = "稿件已成功发送";
    const options = {
        requireInteraction: true,
        icon: "https://static01.imgkr.com/temp/65fa86e4685b47abbad54a1124c84076.webp",
        body: "可以去留言板催促火喵审核通过哦！"
    };
    notification = new Notification(title, options);
});


