<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <m-header :navData="navData" :userList="userList"></m-header>
    <transition :name="transitionName">
      <router-view class="transition-view"></router-view>  
    </transition>
    <m-footer></m-footer>
    <div id="back-top" class="back-top" title="点击回到顶部"><i class="iconfont icon-backtop"></i></div>
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
      userList: {},
      transitionName: 'slide-left'
    }
  },
  mounted () {
    let $obj = $('#back-top')
    $(function(){
        // 返回顶部
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>100){
                    $obj.fadeIn(300)
                }else {
                    $obj.fadeOut(0)
                }
            })
 
            // 回到页面顶部
            $obj.click(function(){
                $('body,html').animate({scrollTop:0},800)
                return false
            })
        })
    })
  },
  created () {
    this._getNavData()
    this._getUserInfo()
    this._getBitrate()
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
    },

    //获取用户信息
    _getUserInfo( ){
    var self = this;
    this.$http({
      method: 'get',
      url: '/api/PortalServer-App/new/aaa_usr_usr008',
      params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp
      },
        })
        .then((res) => {
        if(res.data.status == 0) {

          // this.$store.dispatch('addUser' , res.data.data);
          this.userList = res.data.data;

          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
    },

    //获取用户信息
    _getBitrate( ){
    var self = this;
    this.$http({
      method: 'get',
      url: '/api/PortalServer-App/new/ptl_ipvp_cmn_cmn009',
      params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp
      },
        })
        .then((res) => {
        if(res.data.status == 0) {
            // console.log(res.data.data.resolutions)
            localStorage.setItem('bitrateValue',JSON.stringify(res.data.data.resolutions))

          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
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
.back-top { position:fixed; display:none; bottom:40px; right:20px; color: #515151; }
.back-top i { font-size: 80px; text-align:center; text-decoration:none; color:#515151; display:block; width:64px; cursor: pointer;
    /*使用CSS3中的transition属性给跳转链接中的文字添加渐变效果*/
    -moz-transition:color 1s;
    -webkit-transition:color 1s;
    -o-transition:color 1s; }
.back-top i:hover { color:#FFD114; }
.back-top i { border-radius:6px; display:block; height:64px; width:56px; margin-bottom:5px;color: #F7931E;
    /*使用CSS3中的transition属性给<span>标签背景颜色添加渐变效果*/
    -moz-transition:background 1s;
    -webkit-transition:background 1s;
    -o-transition:background 1s; }
</style>
