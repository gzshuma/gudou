<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <m-header :navData="navData"></m-header>
    <transition :name="transitionName">
      <router-view class="transition-view"></router-view>  
    </transition>
    <m-footer></m-footer>
    <div id="back-top" class="back-top"><a href="#top">返回顶部</a></div>
  </div>
</template>

<script>
import $ from 'jquery'
// 头部组件
import header from 'components/common/header'
import footer from 'components/common/footer'
export default {
  components: {
    'm-header': header,
    'm-footer': footer
  },
  data () {
    return {
      navData: [],
      transitionName: 'slide-left'
    }
  },
  mounted () {
    this._getNavData()
    let $obj = $('#back-top')
    $(function(){
        // 返回顶部
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>100){
                    $obj.fadeIn(300)
                }else {
                    $obj.fadeOut(300)
                }
            })
 
            // 回到页面顶部
            $("#back-top").click(function(){
                $('body,html').animate({scrollTop:0},1000)
                return false
            })
        })
    })
  },
  created () {
    // this.recordEnter()
  },
  methods: {
    _getNavData () {
      this.$http({
        method: 'post',
        url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod008',
        params: {
          ptype: this.GLOBAL.config.ptype,
          plocation: this.GLOBAL.config.plocation,
          puser: '',
          pserverAddress: this.GLOBAL.config.pserverAddress
        }
      })
      .then((res) => {
        if(res.data.status == 0) {
          // alert(1)
          const navData = res.data.data.columns
          this.navData = navData
        }
      })
      .catch((res) => {
      })
    }
  },
  watch: {
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = 'slide-right'
      }else {  
        this.transitionName = 'slide-left' 
      }
    }
  }
}
</script>

<style>
.transition-view { position: relative; height: 100%; transition: all .3s cubic-bezier(.55,0,.1,1); }
.slide-left-enter, .slide-right-leave-active { opacity: 1; -webkit-transform: translate(100%, 0); transform: translate(100%, 0); }  
.slide-left-leave-active, .slide-right-enter { opacity: 0; -webkit-transform: translate(-100%, 0); transform: translate(-100%, 0); }
.back-top { position:fixed; display:none; bottom:40px; right:20px; background: #000; color: #fff; }
.back-top a{ text-align:center; text-decoration:none; color:#d1d1d1; display:block; width:64px;
    /*使用CSS3中的transition属性给跳转链接中的文字添加渐变效果*/
    -moz-transition:color 1s;
    -webkit-transition:color 1s;
    -o-transition:color 1s; }
.back-top a:hover{ color:#979797; }
.back-top a span{ border-radius:6px; display:block; height:64px; width:56px; margin-bottom:5px;
    /*使用CSS3中的transition属性给<span>标签背景颜色添加渐变效果*/
    -moz-transition:background 1s;
    -webkit-transition:background 1s;
    -o-transition:background 1s; }
.back-top a:hover span{ } 
</style>
