<?php

/**
 * 淘宝买家秀
 * 
 * @package custom 
 * 
 **/

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport"content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"/>

        <!--引入css/js-->
        <?php $this->need('public/include.php'); ?>
	<!--顶部导航-->
	<?php $this->need('public/header.php'); ?>
    
   
    <link rel="stylesheet" href="<?php $this->options->themeUrl('assets/css/page-Buyersshow.css'); ?>">
    <!-- <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/css/style.min.css" /> -->
    <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/css/jquery.fancybox.min.css" />


    
  </head>
  <body>
    <!-- 主体 -->
    <div id="app">
      <div id="title">
        <h1>在线获取淘宝买家秀图片</h1>
        <div class="number">正在获取买家秀图片数量...</div>
        <div class="tool-tbshow">
          <div class="tit">如果有显示空白，请点击换一批，重新试试噢！</div>
          <div class="tit">【本图片数据，来源于互联网！】</div>

          <div class="tit">当前网址：<span id="Turl"></span></div>
          <div class="tit start">正在自动获取美图中....</div>
        </div>

        <div>
          <!-- 弹窗 -->
          <div id="str" style="display: none">
            <div class="str_mark">
              <div class="str_title">自定义获取图片数量</div>
              <strong class="off">X</strong>
              <input
                type="number"
                value=""
                placeholder="请输入获取的数量！"
                oninput="if(value.length>3)value=value.slice(0,3)"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              />
              <button class="btn" onclick="btn()">获 取</button>
              <button
                class="btn"
                onclick="clears ()"
                style="background-color: #dc143c"
              >
                清空
              </button>
              <div id="num_button">
                <button class="button_1" name="1">1张</button>
                <button class="button_5" name="5">5张</button>
                <button class="button_10" name="10">10张</button>
                <button class="button_20" name="20">20张</button>
              </div>
              <div id="diong">你还没有输入获取的数量噢!</div>
              <div id="ok_diong">获取成功！</div>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div>
          <button id="next" style="background-color: #ff4500">换一批</button>
          <button id="sub">再来几张</button>
          <button id="img_num" onclick="img_num()" style="display: none">
            当前图片数量
          </button>
          <button
            class="btn Strat_img"
            disabled
            style="
              background-color: #a0cfff;
              border-color: #a0cfff;
              cursor: not-allowed;
            "
          >
            开始获取
          </button>
          <button
            class="btn Stp"
            style="
              color: #fff;
              background-color: #f56c6c;
              border-color: #f56c6c;
            "
          >
            停止获取
          </button>
        </div>
        <div id="btn_down">
          <button class="btn_list">打开/关闭图片列表</button>
          <button class="btn_share" onclick="btn_share()">分享好友</button>
        </div>

        <!-- 侧边按钮 -->
        <div id="app_btn">
          <button id="app_next">换一批</button>
          <button id="app_ding">自定义</button>
          <a class="close" href="#">去顶部</a>
        </div>
        <div id="loadmore">图片努力加载中……</div>
      </div>

      
      <!-- 图片列表 -->
      <div id="data_div" style="display: none">
        <h1 class="title">图片列表</h1>
        <h2 style="color: #fff; font-size: 14px">
          当没有新的数据时，需要开启采集才会自动开始获取噢！
        </h2>
        <button
          onclick="btn_list()"
          style="background-color: deepskyblue; margin: 10px; padding: 0 12px"
        >
          获取图片列表
        </button>
        <button
          onclick="btn_on()"
          style="
            background-color: rgb(14 80 239);
            margin: 10px;
            padding: 0 12px;
          "
        >
          开启自动获取
        </button>
        <!-- <button
          onclick="btn_off()"
          style="
            background-color: rgb(255, 0, 76);
            margin: 10px;
            padding: 0 12px;
          "
        >
          关闭自动获取
        </button> -->
        <div id="list_img"></div>
      </div>

      <!-- end -->
      <div id="content"><div id="walBox"></div></div>
    </div>
  </body>
  <!-- 引入依赖文件 -->      <!-- 远程js依赖文件 -->
  <script src="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/js/jquery.min.js"></script>
  <script src="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/js/lazyload.min.js"></script>
  <script src="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/js/jquery.fancybox.min.js"></script>
  <script src="https://fastly.jsdelivr.net/gh/luolishe/Joe-king@main/themes/page-Buyersshowpage-Buyersshow/js/index.js"></script>



<!-- 本地js文件 -->
  <!-- <script src="<?php $this->options->themeUrl('assets/js/Buyersshow/jquery.min.js'); ?>"></script>
  <script src="<?php $this->options->themeUrl('assets/js/Buyersshow/lazyload.min.js'); ?>"></script>
  <script src="<?php $this->options->themeUrl('assets/js/Buyersshow/jquery.fancybox.min.js'); ?>"></script>
  <script src="<?php $this->options->themeUrl('assets/js/Buyersshow/index.js'); ?>"></script> -->


  <?php $this->need('public/footer.php'); ?>
</html>
