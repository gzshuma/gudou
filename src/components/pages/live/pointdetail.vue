<template>
	<section class="livedetail-wrap clearfix">
		<div class="episodes-box">
			<div class="wrap clearfix">
				<div class="episodes-bd">
					<input type="hidden" id="player-input" :value="playerUrl">
					<div class="episodes-crumb" v-if="detailData.columnName">
						<span class="txt-bold">正在播放：</span>
						<router-link tag="span" to="/" class="cursor-style">首页 <i class="el-icon-arrow-right"></i></router-link>
						<span>{{detailData.columnName}}<i class="el-icon-arrow-right"></i></span>
						<span>{{detailData.programName}}<i class="el-icon-arrow-right"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="player-bd clearfix">
			<div class="wrap clearfix">
				<div class="fl palyer-le" @mouseover="iframeMouseover" @mouseleave="iframeMouseleave">
					<!-- <player></player> -->
					<div v-if="!CA" class="tips-style">{{caText}}</div>
	        		<iframe name="iframeDom" src="/static/m3u8player/index1.html" id="iframeBox" width="100%" height="420" scrolling="no" frameborder="0"></iframe>
					<div class="video-malv" id="videoMalv" v-if="OK" @mouseleave="videoMalvBlur">
					    <ul>
					        <li v-for="(v, index) in playerArray" @click="malvClick(index, v.url)">{{v.text}}</li>
					    </ul>
					    <div class="videoMalv-selected" @mouseover="videoMalvSlect">{{malvSet}}</div>
					</div>
	        	</div>
	        	<div class="fr palyer-ri">
					<div class="episodes-reset" :class="episodesData.length>1 ? '':'dis-hide'">
						<el-tabs class="juji-box">
							<el-tab-pane label="1-24" v-if="episodesData.length>0">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index<24" :key="v.programID" @click="getUrl(v,index,$event)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
							<el-tab-pane label="25-48" v-if="episodesData.length>24">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index>=24&&index<48" :key="v.programID" @click="getUrl(v,index,$event)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
							<el-tab-pane label="49-72" v-if="episodesData.length>48">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index>=48&&index<72" :key="v.programID" @click="getUrl(v,$event,index)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
							<el-tab-pane label="73-96" v-if="episodesData.length>72">
								<span class="juji-list" :class="{cur:nowIndex==index}" v-for="(v,index) in episodesData" v-if="index>=72&&index<96" :key="v.programID" @click="getUrl(v,$event,index)">
									<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
										<el-button>{{index+1}}</el-button>
									</el-tooltip>
								</span>
							</el-tab-pane>
						</el-tabs>
					</div>
					<infodiscrib :detailData="detailData"></infodiscrib>
	        	</div>
			</div>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
import { Message } from 'element-ui'
import player from 'components/common/player'
import infodiscrib from 'components/common/infodiscrib'
import share from 'components/common/share'
// import {GetQueryString, getParamValue} from '@/util'
import {getDay, Monday,dateComparate, GetQueryString, getParamValue} from '@/util'
import { pointDetailData, pointJujiData, malvDataFetch, authorityFetch } from '@/axios/api'
export default {
	components: {
		player,
		infodiscrib,
		share,
		player
	},
	data () {
		return {
			OK: false,
			CA: false,
			caText: '',
			detailData: {},
			episodesData: [],
			playerUrl: '',
			nowIndex: 0,
			episodesNum: [
			],
			bitrateValue: '',
			playerArray: [],
			malvSet: this.malvSet ?  this.malvSet : '流畅'
		}
	},
    mounted () {
		this._getDetailData()
		this._getEpisodes (0)
		this._getMalvData()

		// 进入点击播放列表第一集
		setTimeout(function() {
			$('.juji-list').eq(0).click()
		}, 800)
    },
	computed: {

	},
	methods: {

		// 获取详情信息
		_getDetailData () {
			var self = this
			pointDetailData(self).then( res => {
        		if(res.data.status == 0) {
					const detailData = res.data.data.programinfo
					self.detailData = detailData
					//alert(this.detailData)
				}
			}).catch( res => {
				console.log(res.data.errorMessage)
			})
		},

		// 获取集数
		_getEpisodes () {
			let self = this

			pointJujiData(self).then( res => {
        		if(res.data.status == 0) {
					const episodesData = res.data.data.programItems
					self.episodesData = episodesData
				}
			}).catch( res => {
				console.log(res.data.errorMessage)
			})
		},

		// 码率接口
		_getMalvData () {
			var self = this

			malvDataFetch().then( res => {
        		if(res.data.status == 0) {
					self.bitrateValue = res.data.data.resolutions;
				}
			}).catch( res => {
				console.log(res.data.errorMessage)
			})
		},

		// 点击集数播放
		getUrl (val, index, el)  {
			this.nowIndex = index
			var data = {}
			// console.log(val)
			var data = val.movieUrl[0] // 点播地址
			// console.log(data)
			for(var v in data){
			    data = data[v]
			}
			let a = data.split('8070')
			let b = 'http://172.16.149.223:8060' + a[1]
			// console.log(b)

			// 获取媒资
			let Len = b.lastIndexOf("\/");
			let meizi  = b.substring(Len + 1, b.length);
			meizi = meizi.split('.')[0]
			// console.log(meizi)

			let pid = this.$route.params.id.split('_')
			pid = pid[1]


			var playerStr = []

			let playStr = ''
			
			// 循环播放源
			var dataStr = {
				url: '',
				text: ''
			}

			// console.log(val.movieUrl)

			for(var v in val.movieUrl) {
					for(var value in val.movieUrl[v]) {
						// alert(value)
						var dataAdress = val.movieUrl[v][value]
						playStr = val.movieUrl[v][value]

						this.bitrateValue.forEach(function(item, n) {
							// console.log(item.resolutionID)
							if(value==item.resolutionID) {
								// alert(item.bitrate)
								// alert(playStr)
								if(item.bitrate==1) {
									dataStr = {
										url: playStr,
										text: '流畅'
									}
									playerStr.push(dataStr)
								}else if(item.bitrate==2) {
									dataStr = {
										url: playStr,
										text: '标清'
									}
									playerStr.push(dataStr)
								}else if(item.bitrate==3) {
									dataStr = {
										url: playStr,
										text: '高清'
									}
									playerStr.push(dataStr)
								}else if(item.bitrate==4) {
									dataStr = {
										url: playStr,
										text: '超清'
									}
									playerStr.push(dataStr)
								}else if(item.bitrate==4) {
									dataStr = {
										url: playStr,
										text: '超清'
									}
									playerStr.push(dataStr)
								}
							}
						})

						this.playerArray = playerStr;
					}
			}

			// 鉴权获取
			let self = this;
			authorityFetch(self, pid, meizi).then( res => {
				var self = this
				if(res.data.status == 0) {
					let str = res.data.data.authResult.split('?')[1]
					// console.log(str)
					// alert(GetQueryString(str, 'errorReason=0'))
					var flag = GetQueryString(str, 'errorReason=0');
					// 判断是否存在ACL
					if( GetQueryString(str, 'a=') && flag ){
						// console.log('0')
						this.CA = true
						// iframe赋值
						this.playerUrl = b+'?'+str

						// console.log(b+'?'+str)

						// 赋值给iframe
						iframeDom.window.childrenFun(b+'?'+str)
					}else {
						// console.log(getParamValue(str, 'errorcode')[1])
						var num = getParamValue(str, 'errorcode')[1]
						this.CA = false
						var txt = '';
						if(num == '9980') {
							txt = '您还未登录，请登录后再试'
						}else {
							txt = '无法播放错误代码 ' + num
						}
						// var txt = '无法播放错误代码 ' + num
						this.caText = txt
						Message.warning(txt)
					}
					// console.log(this.playerUrl)
						// this.playerUrl = b+'?'+str
				}
			}).catch( res => {
				console.log(res.data.errorMessage)
			})
		},

		iframeMouseover() {
			this.OK = true
		},
		iframeMouseleave() {
			this.OK = false
		},
		malvClick(sindex, src) {
			let meizi = src.split('.m3u8')[0]
			// console.log(meizi) 
			var index = meizi.lastIndexOf("\/");
			// console.log(index) 
			meizi  = meizi.substring(index + 1, meizi.length);
			meizi = meizi.split('.')[0];
			// alert(meizi)
			$('.videoMalv-selected').html($('#videoMalv li').eq(sindex).html());
			$('.videoMalv-selected').removeClass('selected-class');
			this.malvSet = $('#videoMalv li').eq(sindex).html();
			$('#videoMalv li').hide();
			// alert(this.malvSet)
			// console.log(meizi)
			// 鉴权获取

			let pid = this.$route.params.id.split('_')
			pid = pid[1]

			let self = this;
			authorityFetch(self, pid, meizi).then( res => {
				var self = this
				if(res.data.status == 0) {
					let str = res.data.data.authResult.split('?')[1];
					// console.log(str)
					var playStr = src + '?' +str
					// alert(playStr)
					iframeDom.window.childrenFun(playStr)
				}
			}).catch( res => {
				console.log(res.data.errorMessage)
			})
		},

		// 点击选择码率
		videoMalvSlect() {
			$('#videoMalv li').show();
			$('.videoMalv-selected').addClass('selected-class');
		},

		// 移开消失
		videoMalvBlur() {
			$('#videoMalv li').hide();
			$('.videoMalv-selected').removeClass('selected-class');
		}
	}
}
</script>

<style scoped>
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.cursor-style { cursor: pointer; }
.episodes-box { background: #212121; min-width: 1200px; }
.episodes-bd { width: 100%; padding: 70px 0 0; border-bottom: #434343 1px solid; overflow: hidden; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.episodes-crumb { color: #f2f2f2; margin: 25px 0 20px; }
.txt-bold { color: #888; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #888; }
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.palyer-le { position: relative; width: 812px; height: 415px; margin-bottom: 15px; background: #000; overflow: hidden; }
.palyer-box { color: #f00; }
.yuding{ color: #ff9c01; }
.player-bd { padding: 10px 0 25px; background: #212121; min-width: 1200px; overflow: hidden;}
.player-bd .wrap { padding-top: 20px; }
.player-box, .player-box img { width: 812px; height: 455px; }
.player-tabs-list { position: relative; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; }
.player-tabs-list.cur { color: #ff9c01; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
.palyer-ri { width: 370px; height: 445px; color: #f0f0f0; overflow: hidden; }
 
/*定义滚动条轨道 内阴影+圆角*/
.player-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #363636; }
.player-bd ::-webkit-scrollbar-thumb { border-radius: 2.5px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #aaa; }
.episodes-reset { padding: 0; margin-bottom: 20px; }
.el-tabs__item { font-size: 16px; color: #f2f2f2; }
.el-tabs__item:hover { font-size: 16px; color: #f2f2f2; }
.el-tabs__header { border-bottom-color: #48576a; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.el-tab-pane { width: 366px; }
.juji-list { float: left; width: 60px; height: 36px; border-radius: 5px; line-height: 36px; background: #f0f0f0; text-align: center; border-radius: 0; background: none; border: 1px solid #363636; border-width: 0 1px 1px 0; cursor: pointer; }
.dis-hide { display: none; }
</style>
<style>
.palyer-ri .el-tabs__item { color: #fff; font-size: 16px; }
.palyer-tabs-top .el-tabs__item { font-size: 18px; padding: 0; width: 185px; text-align: center; }
.palyer-tabs-top .is-active{ color: #ff9c01; }
.palyer-tabs-top .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.el-button, .el-textarea__inner { color: #f2f2f2; font-size: 16px; }
.juji-list.cur { background: #333; }
.juji-list.cur .el-button { color: #ff9c01; }
.juji-list:nth-child(10n+10) { margin-right: 0; }
.juji-list .el-button { background: none; border: 0; }
.juji-list .el-button:hover { color: #ff9c01; }
.episodes-crumb { color: #888; margin: 25px 0 35px; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #d1cfcf; }
.juji-box .is-active{ color: #ff9c01; }
.juji-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.el-tabs__content { width: 365px; border: #363636 2px solid; border-bottom-width: 1px; overflow: hidden; }
.el-tabs__header { border-bottom-color: #48576a; }
.tips-style { z-index: 101; position: absolute; top: 0; left: 0; width: 100%; height: 425px; padding: 0; line-height: 415px; font-size: 20px; color: #fff; text-align: center; background: #000; }
.video-malv { /*display: none;*/ position: absolute; bottom: 5px; right: 180px; z-index: 100; cursor: pointer; }
.videoMalv-selected { background: #f00; border-radius: 3px; width: 70px; height: 27px; line-height: 27px; text-align: center; font-size: 14px; color: #fff; }
.selected-class { border-radius: 0 0 3px 3px; }
.video-malv li { display: none; width: 70px; height: 27px; line-height: 27px; background: #ccc; text-align: center; }
.video-malv li:first-child { border-radius: 3px 3px 0 0; }
.video-malv li:hover { background: #333; color: #fff; }
</style>