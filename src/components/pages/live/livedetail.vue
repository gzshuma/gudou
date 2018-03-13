<template>
	<section class="livedetail-wrap clearfix">
		<div class="episodes-box">
			<div class="wrap clearfix">
				<div class="episodes-bd">
					<div class="episodes-crumb" v-if="subData.channelName">
						<span class="txt-bold">正在播放：</span>
						<router-link tag="span" to="/" class="cursor-style">首页 <i class="el-icon-arrow-right"></i></router-link>
						<span>{{subData.channelName}} <i class="el-icon-arrow-right"></i></span>
						<span>{{subData.epgName}} <i class="el-icon-arrow-right"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="player-bd live-player clearfix">

			<!-- <player></player> -->
			<div class="wrap clearfix">
				<div class="fl palyer-le" @mouseover="iframeMouseover" @mouseleave="iframeMouseleave">
					<div v-if="!CA" class="tips-style">{{caText}}</div>
	        		<iframe name="iframeDom" :src="'/static/m3u8player/index.html'+playerUrl" id="iframeBox" width="100%" height="415" scrolling="no" frameborder="0"></iframe>
					<div class="video-malv" id="videoMalv" v-if="OK" @mouseleave="videoMalvBlur">
					    <ul>
					        <li v-for="(v, index) in playerStr" @click="malvClick(index, v.url)">{{v.text}}</li>
					    </ul>
					    <div class="videoMalv-selected" @mouseover="videoMalvSlect">{{malvSet}}</div>
					</div>
				</div>
				<div class="fr palyer-ri">
					<div class="scroll-left" @click="tabLeftChange"></div>
					<div class="scroll-right" @click="tabRightChange"></div>
					<div class="player-tabs-box">
						<div class="player-tabs-header clearfix">
							<div class="player-tabs-pos" id="player-tabs-pos">
								<span class="tabs-hd-list"  v-for="index in 14" :class="{ cur:index-8 == nowIndex }" @click="changeTab(index-8,monday(index-8))">
									<i v-if="getDay==index-8">今天</i>
									<i v-else>
										<span v-if="index==1">周日</span>
										<span v-if="index==2">周一</span>
										<span v-if="index==3">周二</span>
										<span v-if="index==4">周三</span>
										<span v-if="index==5">周四</span>
										<span v-if="index==6">周五</span>
										<span v-if="index==7">周六</span>
										<span v-if="index==8">周日</span>
										<span v-if="index==9">周一</span>
										<span v-if="index==10">周二</span>
										<span v-if="index==11">周三</span>
										<span v-if="index==12">周四</span>
										<span v-if="index==13">周五</span>
										<span v-if="index==14">周六</span>
									</i>
									<i>
										{{monday(index-8).substr(4,2)}}.{{monday(index-8).substr(6,2)}}
									</i>
								</span>
							</div>
						</div>
						<div class="player-tabs-con">
							<div class="player-tabchange" :class="{'block':item-8 === nowIndex}" v-for="item in 14">
								<div class="player-tabs-list" @click="changeMovies(v,index,$event)"  v-for="(v,index) in detailData"  :class=" v.epgID == endTimeArr.epgID && isok ? 'player-cur aaa':'' ">
									<span class="p-tabs-time">
										{{v.startTime.substr(8,2)}}.{{v.startTime.substr(10,2)}}
									</span>
									<span class="p-tabs-con">{{v.channelName}}：{{v.epgName}}</span>
									<span class="icon-p-tabs icon-info iconfont icon-back"  :class=" v.epgID == endTimeArr.epgID ? 'playa':'' " v-if="dateCompa(v.startTime)<0"></span>

									<span class="icon-p-tabs icon-info iconfont icon-alarm"  :appoint="v.epgID"  v-if="dateCompa(v.startTime)>0"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<share class="position-bottom clearfix" :collectData="collectData" v-if="CA"></share>
			</div>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
import { Message } from 'element-ui'
import share from 'components/common/share'
import {getDay, Monday,dateComparate, GetQueryString, getParamValue} from '@/util'
import player from 'components/common/player'
import { paramFunction, malvDataFetch, authorityLiveFetch, liveDetailData, queryAppointFetch, addAppointFetch, queryCollectFetch, addAppointUrl, delleteAppointUrl } from '@/axios/api'

export default {
	components: {
		share,
		player
	},
	data () {
		return {
			OK: false,
			CA: false,
			caText: '',
			collectData:{
				isZhibo: true,//是否直播
				id: this.$route.params.channelid.split('_')[0],
				columnID: '',
          		columnName: '',
				collectArr:[],//查看收藏的信息
			},
			urlOption: '',
			appointData: [],//查看预定的接口
			detailData: [],
			episodesData: [],
			getDay:getDay(),
			startTime: Monday(getDay())+'000000',
			endTime: Monday(getDay())+'235959',
			authority : '', //截取后的鉴权返回值
			isok: true,//是否默认选中
			weekIndex: "",
			nowIndex: getDay(),
			clickIndex: getDay(),
			playIndex: "",
			monday: Monday,
			playerUrl: '',
			jianquan: '',
			num: 0,
			subData: {
				channelName: '',
				epgName: ''
			},
			// bitrateValue: JSON.parse(localStorage.getItem('bitrateValue')),
			bitrateValue: '',
			playerStr: [],
			malvSet: this.malvSet ?  this.malvSet : '流畅'
		}
	},
	created () {
	},
    mounted () {
		this.queryCollect();
		this.queryAppoint();
		this._getDetailData();
		this._getMalvData();
		setTimeout(function() {
			this.startAppoint.forEach(function(item,index){
				$( '[appoint='+item.programID+']' ).addClass( 'yuding' )
			})
		}.bind( this ), 120);

		setTimeout(function() {
			$('.player-tabchange.block .player-cur').click()
		},800)
		// alert(JSON.stringify(this.bitrateValue));
    },
    computed:{
		//计算属性
		endTimeArr: function() {
			if (this.getDay == this.nowIndex) {
				let arr = [];
				this.detailData.forEach(
					function(val, index) {
						let gg = this.dateCompa(val.startTime);
						if (gg < 0) {
							arr.push(val);
						}
					}.bind(this)
				);
				// console.log(JSON.stringify(arr))
				return arr.pop() || {};
			} else {
				return false;
			}
		},
		//默认预定的  比当前大的
		startAppoint: function(){
			// if (this.getDay == this.nowIndex) {
			let arr = [];
			this.appointData.forEach(function( item,index ){
			if (this.dateCompa(item.remindTime) > 0) {  //如果时间比当前时间大
				arr.push(item);
			}
		}.bind(this))
			return arr;
		}
    },
	methods: {
		_getDetailData () {
			let self = this
			liveDetailData(self).then( res => {
        		if(res.data.status == 0) {
					const detailData = res.data.data.epgs
					self.detailData = detailData
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		dateData (date,startAppoint) {
			startAppoint = startAppoint || [];
			this.startTime = date+'000000'
			this.endTime = date+'235959'
			this._getDetailData()
			this.queryAppoint()

			//初始化加渲染
			$( '.yuding' ).removeClass( 'yuding' )
			setTimeout(function() {
				startAppoint.forEach(function(item,index){
					$( '[appoint='+item.programID+']' ).addClass( 'yuding' )
				})
			}.bind( this ), 200);

		},

		dateCompa: function (date) {
			let year = date.substr(0,4)
			let month = date.substr(4,2)
			let day = date.substr(6,2)
			let hour = date.substr(8,2)
			let minute = date.substr(10,2)
			let second = date.substr(12,2)
			let d = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
            return dateComparate(d)
		},
		
		//查询预定提醒
		queryAppoint( ){
			var self = this;
			queryAppointFetch().then( res => {
				if(res.data.status == 0) {
					this.appointData = res.data.data.reminds
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		changeTab(index, date) {
			this.nowIndex = index;
			this.dateData (date,this.startAppoint)
		},
		playerClick(index) {
			this.playIndex = index;
		},
    
		//添加预定提醒
		addAppoint( val ){
			var self = this;
			
			self.$http({
				method: 'post',
				// url: '/api/PortalServer-App/new/ptl_ipvp_live_live024',
				url: addAppointUrl(),
				params: paramFunction(),
				//post用data
				data:{
					channelID: self.$route.params.channelid.split('_')[0],
					remindTime: val.startTime
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					this.$message( '你已成功订阅' );
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		//删除预定提醒
		delAppoint( val ){
			var self = this;
			this.$http({
				method: 'post',
				// url: '/api/PortalServer-App/new/ptl_ipvp_live_live025',
				url: delleteAppointUrl(),
				params: paramFunction(),
				//post用data
				data:{
					channelID: self.$route.params.channelid.split('_')[0],
					remindTime: val.startTime
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					this.$message( '取消订阅' )
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},

		// 点击列表动作
		changeMovies(val, index, el) {
			if (this.dateCompa(val.startTime) > 0) {  //如果时间比当前时间大
				let user = sessionStorage.getItem('user')
				if (!user) { // 未登录跳到登录页
					this.$message.warning( '您还没有登录请先登录！' )
					return false
				}
				//订阅
				let target = $( el.target ).closest('.player-tabs-list').find('.icon-alarm')
				target.toggleClass('yuding')
				if(target.hasClass('yuding')) {
					this.addAppoint( val )
				}else{
					this.delAppoint( val )
				}
			} else {
				this.isok = false;

				// 点击当前播放的和回播的动作操作
				this.num +=1

				var self = this
				// 地址	
				var data = {}
				var data = val.historyUrl[0]
				// console.log(val.historyUrl[0])
				for(var v in data){
				    data = data[v]
				}

				// console.log(data)

				// 获取媒资
				let meizi = data.split('?')
				var index = meizi[0].lastIndexOf("\/");  
				meizi  = meizi[0].substring(index + 1, meizi[0].length);
				meizi = meizi.split('.')[0]

				// console.log(meizi)

				// 当前直播和回播的视频源
				let url = data.split('?')
				let movieUrl = url[0].split('8070')
				let playStr = '', playStr_1 = ''

				// console.log(movieUrl[1])

				playStr = 'http://172.16.149.223:8060' + movieUrl[1] + '?'
				playStr_1 = 'http://172.16.149.223:8060' + movieUrl[1] + '?' + url[1] + '&'


				// console.log(playStr)

				// 
				this.playerStr = []
				// 循环播放源
				var dataStr = {
					url: '',
					text: ''
				}


				// console.log(val.historyUrl)

				var playStr_mlv;
				for(var v in val.historyUrl) {
						// console.log(v)
					for(var value in val.historyUrl[v]) {
						var dataAdress = val.historyUrl[v][value]
						// console.log(dataAdress)
						let url_1 = dataAdress.split('?')
						// console.log(url_1[1])
						let movieUrl_1 = url_1[0].split('8070')
						let movieSource = '', movieSource_1 = ''
						movieSource = 'http://172.16.149.223:8060' + movieUrl_1[1] + '?'
						movieSource_1 = 'http://172.16.149.223:8060' + movieUrl_1[1] + '?' + url_1[1] + '&'

						// console.log(movieSource)

						if(val.epgID==self.endTimeArr.epgID) {
							playStr_mlv = movieSource
							$(el.target).addClass('player-cur')
						}else if(self.num == 1) {
							playStr_mlv = movieSource
						}else {
							playStr_mlv = movieSource_1
						}

						// console.log(playStr)

						self.bitrateValue.forEach(function(item, n) {
							if(value==item.resolutionID) {
								if(item.bitrate==1) {
									dataStr = {
										url: playStr_mlv,
										text: '流畅'
									}
									self.playerStr.push(dataStr)
								}else if(item.bitrate==2) {
									dataStr = {
										url: playStr_mlv,
										text: '标清'
									}
									self.playerStr.push(dataStr)
								}else if(item.bitrate==3) {
									dataStr = {
										url: playStr_mlv,
										text: '高清'
									}
									self.playerStr.push(dataStr)
								}else if(item.bitrate==4) {
									dataStr = {
										url: playStr_mlv,
										text: '超清'
									}
									self.playerStr.push(dataStr)
								}
							}
						})
					}
				}


				// console.log(playStr)

				// 鉴权获取
				let self = this;

				authorityLiveFetch(self, meizi).then( res => {
					if(res.data.status == 0) {

						// console.log(res.data.data.authResult)
						
						let str = res.data.data.authResult.split('?')[1];
						// console.log(encodeURIComponent(str))
						// console.log(str)

						// str = encodeURIComponent(str)

						if(val.epgID==this.endTimeArr.epgID) {
							playStr = playStr + str
							$(el.target).addClass('player-cur')
						}else if(this.num == 1) {
							playStr = playStr + str
						}else {
							playStr = playStr_1 + str
						}

						// 初始化添加直播样式
						$('.player-tabs-list').removeClass('player-cur aaa')
						$(el.target)
							.closest('.player-tabs-list')
							.addClass('player-cur aaa')
							.siblings('.player-tabs-list').removeClass('player-cur aaa')

						// console.log(playStr)

						playStr = encodeURIComponent(playStr)

						var flag = GetQueryString(str, 'errorReason=0');

						// 判断鉴权中是否有ACL
						if(GetQueryString(str, 'a=') && flag) {
							this.CA = true
							// 赋值给iframe
							iframeDom.window.childrenFun(playStr)
						}else {
							var num = getParamValue(str, 'errorcode')[1]
							this.CA = false
							var txt = '无法播放错误代码 ' + num
							this.caText = txt
							Message.warning(txt)
						}
						// console.log(self.playerStr)
						// iframeDom.window.childrenUrl(self.playerStr)
					}
				}).catch( res => {
					console.log(res.data.errorMessage)
				})

				this.malvSet = '流畅'
				
				// 获取面包削标题
				this.subData.channelName = val.channelName
				this.subData.epgName = val.epgName
			}
		},

		//查询直播收藏
		queryCollect( ){
			var self = this;
			queryCollectFetch().then(res => {
				if(res.data.status == 0) {
					this.collectData.collectArr =  res.data.data.live 
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
			$('.videoMalv-selected').html($('#videoMalv li').eq(sindex).html());
			$('.videoMalv-selected').removeClass('selected-class');
			this.malvSet = $('#videoMalv li').eq(sindex).html();
			$('#videoMalv li').hide();
			// alert(this.malvSet)
			// console.log(meizi)

			// 鉴权获取
			let self = this;
			authorityLiveFetch(self, meizi).then( res => {
				// var self = this
				if(res.data.status == 0) {
					let str = res.data.data.authResult.split('?')[1];
					// console.log(str)
					var playStr = src +str
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
		},

		// 点击切换tab
		tabLeftChange() {
			$('#player-tabs-pos').css('left', 0);
		},
		tabRightChange() {
			$('#player-tabs-pos').css('left', '-370px');
		}
	}
}
</script>

<style scoped>
.cursor-style { cursor: pointer; }
.episodes-box { background: #212121; min-width: 1200px; }
.episodes-bd { width: 100%; padding: 70px 0 20px; margin-bottom: 15px; float: left; border-bottom: #434343 1px solid; overflow: hidden; }
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
.player-bd { padding: 0; background: #212121; min-width: 1200px; overflow: hidden; }
.player-bd .wrap { padding-top: 20px; }
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
.url-box { color: #fff; }
.palyer-ri { position: relative; width: 370px; height: 495px; color: #f0f0f0; /*overflow: hidden;*/ }
.tabs-hd-list { float: left; width: 52.857142857px; text-align: center; cursor: pointer; }
.tabs-hd-list.cur { color: #ff9c01; }
.tabs-hd-list i.cur { color: #ff9c01; }
.tabs-hd-list i { display: block; margin-bottom: 5px; }
.player-tabs-list { font-size: 0; position: relative; width: 260px; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; cursor: pointer; }
.player-tabs-list.cur { color: #ff9c01; }
.icon-p-tabs { display: inline-block; vertical-align: middle; position: absolute;
  right: 15px; top: 5px; font-size: 20px; }
.p-tabs-time { display: inline-block; vertical-align: middle; font-size: 14px;
  position: absolute; left: 0; top: 0; width: 80px; text-align: center; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
.p-tabs-con { display: inline-block; vertical-align: middle; width: 230px; white-space: nowrap;
  text-overflow: ellipsis; overflow: hidden; font-size: 14px; }
.player-cur.aaa { color: #ff9c01; }
.yuding{ color: #ff9c01; }
.playa.icon-back:before { content: "\e608"; font-size: 28px; }
.playa.icon-back { right: 10px; }
.player-tabchange { display: none; }
.block { display: block; }
.tips-style { position: absolute; z-index: 101; top: 0; left: 0; width: 100%; height: 425px; padding: 0; line-height: 415px; font-size: 20px; color: #fff; text-align: center; background: #000; }
iframe { background: #000; }
.video-malv { /*display: none;*/ position: absolute; bottom: 5px; right: 180px; z-index: 100; cursor: pointer; }
.videoMalv-selected { background: #f00; border-radius: 3px; width: 70px; height: 27px; line-height: 27px; text-align: center; font-size: 14px; color: #fff; }
.selected-class { border-radius: 0 0 3px 3px; }
.video-malv li { display: none; width: 70px; height: 27px; line-height: 27px; background: #ccc; text-align: center; }
.video-malv li:first-child { border-radius: 3px 3px 0 0; }
.video-malv li:hover { background: #333; color: #fff; }
.fiilScreen { background: rgba(0,0,0,0); width: 50px; height: 50px; position: absolute; bottom: 0; right: 0; }

.player-tabs-header { position: relative; width: 100%; height: 36px; overflow: hidden; }
.player-tabs-pos { position: absolute; left: -370px; top: 0; width: auto; height: 36px; }
.scroll-left, .scroll-right { position: absolute; top: 0; width: 18px; height: 36px; opacity: .3; cursor: pointer; z-index: 10; }
.scroll-left { left: -18px; background: url(/static/common/images/left.png) 5px 5px no-repeat; }
.scroll-right { right: -18px; background: url(/static/common/images/right.png) 5px 5px no-repeat; }
.scroll-left:hover, .scroll-right:hover { opacity: 1; }
</style>