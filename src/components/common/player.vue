<template>
	<div class="clearfix">
		<!-- <div class="wrap clearfix">
			<div class="fl palyer-le"> -->
				<!-- <video-player class="vjs-custom-skin"  :options="playerOptions" @ready="playerReadied" 	</video-player> -->

        <!-- <input type="text" :value="playerUrl"> -->

        <video-player class="vjs-custom-skin" controls preload="auto" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
          <!-- <source src="http://gslb.gcable.cn:8070/live/CCTV6_800.m3u8?ci=123&testid=liuwenjin"> -->
        </video-player>
			<!-- </div> -->
      <slot></slot>
      
		</div>

	</div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import share from 'components/common/share'
export default {
  props: {
    playerOptions: {
      type: Object
    }
  },

  mounted() {
    // alert(this.playerUrl)
  },
  
	components: {
		share,
		// jujilist
	},
      data() {
      return {
        // playerOptions: {
        //   // videojs and plugin options
        //   sources: [{
        //     withCredentials: false,
        //     type: "application/x-mpegURL",
        //     src: "http://gslb.gcable.cn:8070/live/CCTV6_800.m3u8?ci=123&testid=liuwenjin"
        //   }],
        //   controlBar: {
        //     timeDivider: false,
        //     durationDisplay: false
        //   },
        //   flash: { hls: { withCredentials: false }},
        //   html5: { hls: { withCredentials: false }},
        //   poster: "/static/images/author-5.jpg"
        // }



        // initialized: false,
        // currentTech: '',
        // streams: {
        //   rtmp: '',
        //   hls: ''
        // },
        // playerOptions: {
        //   overNative: true,
        //   autoplay: true,
        //   volume: 0.6,
        //   controls: true,
        //   width: 812,
        //   height: 415,
        //   techOrder: ['flash', 'html5'],
        //   sourceOrder: true,
        //   flash: { hls: { withCredentials: false } },
        //   html5: { hls: { withCredentials: false } },
        //   sources: [
        //     // {
        //     //   type: 'rtmp/mp4',
        //     //   src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
        //     // }, 
        //     {
        //       withCredentials: false,
        //       type: 'application/x-mpegURL',
        //       src: 'http://gslb.gcable.cn:8070/live/CCTV6_800.m3u8?ci=123&testid=liuwenjin'
        //       // src: this.playerUrl
        //     }
        //   ],
        //   poster: '/vue-videojs-demo/static/images/logo.png',
        //   controlBar: {
        //     timeDivider: false, // 时间分割线
        //     durationDisplay: false, // 总时间
        //     progressControl: true, // 进度条
        //     customControlSpacer: true, // 未知
        //     fullscreenToggle: true // 全屏
        //   },
        // }
      }
    },

    computed: {
      // player () {
      //   return this.$refs.videoPlayer.player
      // },
      // currentStream () {
      //   return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
      // }
    },
    methods: {
      // playerReadied(player) {
      //   var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      //   player.tech_.hls.xhr.beforeRequest = function(options) {
      //     // console.log(options)
      //     return options
      //   }
      // }


      // onPlayerReadied () {
      //   if (!this.initialized) {
      //     this.initialized = true
      //     this.currentTech = this.player.techName_
      //   }
      // },
      // record current time
      // onTimeupdate (e) {
      //   console.log('currentTime', e.cache_.currentTime)
      // },
      // enterStream () {
      //   // this.playerOptions.sources[1].src = this.streams.hls
      //   this.playerOptions.sources[0].src = this.streams.rtmp
      //   this.playerOptions.autoplay = true
      // },
      // changeTech () {
      //   if (this.currentTech === 'Html5') {
      //     this.playerOptions.techOrder = ['html5']
      //   } else if (this.currentTech === 'Flash') {
      //     this.playerOptions.techOrder = ['flash']
      //   }
      //   this.playerOptions.autoplay = true
      // }
    }
}
</script>

<style>
.vjs-custom-skin > .video-js { width: 812px; height: 415px; }
.player-bd { padding: 55px 0 25px; background: #212121; min-width: 1200px; height: 515px; }
.player-bd .wrap { padding-top: 20px; }
/*.palyer-le { width: 100%; height: 100%; }*/
.player-box, .player-box img { width: 812px; height: 455px; }
.palyer-ri .el-tabs__item { color: #aaa; }
.palyer-tabs-top .el-tabs__item { font-size: 18px; padding: 0; width: 185px; text-align: center; }
.palyer-tabs-top .is-active{ color: #ff9c01; }
.palyer-tabs-top .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.player-tabs-list { position: relative; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; }
.player-tabs-list.cur { color: #ff9c01; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
 
/*定义滚动条轨道 内阴影+圆角*/
.player-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #363636; }
.player-bd ::-webkit-scrollbar-thumb { border-radius: 2.5px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #aaa; }
</style>
