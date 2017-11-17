<template>
  <div class="myorder-box">
	<div class="search-tab">
		<span class="tab-list" :class="{cur:1!=nowIndex}" @click="toggleTabs(0)">直播</span>
		<span class="tab-list" :class="{cur:0!=nowIndex}" @click="toggleTabs(1)">点播</span>
	</div>
	<div class="myorder-top-bd" v-if="orderList.length>0||orderList2.length>0">
		<span class="myorder-delete"  @click="deleteRecord" v-show="hideDiv">删除收藏记录</span>
		<span class="myorder-deleteall " v-show="isTrue" @click="deleteAllRecord">清空</span>
		<span class="myorder-complete " v-show="isTrue" @click="completeRecord">完成</span>
	</div>
    <div class="collectionBar coll1" v-show=" nowIndex== 0 ">
      <ul>
        <li class="collArr1" v-for="(v, index) in orderList">
			<span class="order-close" @click="deleteDom(v,$event)"><i class="el-icon-close"></i></span>
			<div @click="urlDirect(v.locationChannelID, v.channelID)">
				<div class="pic-ri-top">
					<img v-lazy="item" alt="" v-for="item in v.imageUrl[0]">
					<span class="pic-mask">
						<span class="mask-time">
							{{v.updateTime.substr(4,2)}}-{{v.updateTime.substr(6,2)}}
							{{v.updateTime.substr(8,2)}}:{{v.updateTime.substr(10,2)}}
						</span>
					</span>
				</div>
				<div class="pic-btm">
					{{v.channelName}}
				</div>
			</div>
        </li>
      </ul>
    </div>
		<div class="collectionBar coll2"  v-show=" nowIndex== 1 ">
      <ul>
        <li class="collArr2" v-for="(v, index) in orderList2">
			<span class="order-close" @click="deleteDom(v,$event)"><i class="el-icon-close"></i></span>
			<router-link tag="div" :to="{name: 'detail', params: { id: v.programID }}" :key="v.id">
				<div class="pic-ri-top">
					<img :src="item" alt="" v-for="item in v.imageUrl[0]">
					<span class="pic-mask">
						<span class="mask-time">{{v.createTime}}</span>
					</span>
				</div>
				<div class="pic-btm">
					{{v.programName}}
				</div>
			</router-link>
        </li>
      </ul>
    </div>
	<!-- <pagination></pagination> -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
	components: {
	},
	data () {
		return {
			nowIndex:0,
			isTrue: false,
			hideDiv: true,
			isShow: false,
			puser:sessionStorage.getItem('user'),
			ptoken:sessionStorage.getItem('flag'),
			start:0,
			end:'',
			orderList: [],//直播
			orderList2: [],//点播
		}
	},
	created(){
		
		
	},
	mounted(){
	 	 this.queryCollect();
		 this.queryCollect2();	  
	},
	methods: {
		toggleTabs:function(index){
			this.nowIndex=index;
		},
	     //查询点播收藏
		queryCollect2( ){
			var self = this;
			self.$http({
			  method: 'get',
			  url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod031',
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
			    timestamp: self.GLOBAL.config.timestamp,
			    start: '',
			    end: ''
			  },
			})
			.then((res) => {
			    if(res.data.status == 0) {
			      this.orderList2 =  res.data.data.vod 
			    }
			})
			.catch((res) => {
			  alert(res.data.errorMessage)
			})
		},
		
		//查询直播收藏
		queryCollect( ) {
			let self = this;
			self.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live026',
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
			            timestamp: self.GLOBAL.config.timestamp,
						start: '',
						end: ''
					},
				})
				.then((res) => {
					if(res.data.status == 0) {
						this.orderList =  res.data.data.live 
					 }
				})
				.catch((res) => {
					alert(res.data.errorMessage)
				})
			},
		deleteDom( val,el ){//删除按钮  单个
			if( this.nowIndex == 1 ){//点播
					this.delAllPlay1( val )
			}else{
					this.delAllPlay2( val )
			}
			$(el.target).closest( 'li' ).remove()
		},
		deleteRecord ( ) {
			this.isTrue = true
			this.hideDiv = false
			if( this.nowIndex == 1 ){//点播
				$('.coll2').find('.order-close').show()
			}else{
				$('.coll1').find('.order-close').show()
			}
		},
		completeRecord () {
			this.isTrue = false
			this.hideDiv = true
			$('.order-close').hide()
		},
		deleteAllRecord () {
			this.isTrue = false
			this.hideDiv = false
	  		if( this.nowIndex == 1 ){//点播
				$('.collArr2').remove()
			}else{
				$('.collArr1').remove()
			}
			if( this.nowIndex == 1 ){//点播清空

				this.orderList2.forEach(function(item,index){
					 this.delAllPlay1( item )
				}.bind( this ))
			}else{//直播清空
				this.orderList.forEach(function(item,index){
					 this.delAllPlay2( item )
				}.bind( this ))
			}
		},
		delAllPlay1( val ){//点播清空
			let self = this;
			self.$http({
	            method: 'post',
	            url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod033',
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
		            timestamp: self.GLOBAL.config.timestamp,
	                
	            },
	            //post用data
	            data:{
	              programID: val.programID,
	              columnID: val.columnID,
	            }
          })
          .then((res) => {
				if(res.data.status == 0) {
					console.log( '取消点播收藏' )
				}
          })
          .catch((res) => {
            console.log( res )
            this.$message.warning(res.data.errorMessage)
          })
		},
		delAllPlay2( val ){//直播清空
			let self = this;
        	self.$http({
	            method: 'post',
	            url: '/api/PortalServer-App/new/ptl_ipvp_live_live028',
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
		            timestamp: self.GLOBAL.config.timestamp,
	            },
	            //post用data
	            data:{
	              channelID: val.channelID,
	            }
			})
			.then((res) => {
				if(res.data.status == 0) {
					console.log( '取消直播收藏' )
				}
			})
			.catch((res) => {
				// console.log( res )
				this.$message.warning(res.data.errorMessage)
			})
		},
	    urlDirect ($id, $channelId) {
	      // console.log($id)
	      this.$router.push({
	        name: 'livedetail',
	        params: {
	          id: this.$md5($id),
	          channelid: $channelId + '_channel'
	        }
	      })
	    }
	}
}
</script>

<style scoped>
.collectionBar { position: relative; height: auto; }
.collectionBar .el-tabs__header { position: relative; z-index: 1; }
.collectionBar .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 18px; padding: 0 15px; margin: 0; cursor: pointer; }
.collectionBar .is-active{ color: #ff9c01; }
.collectionBar .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.collectionBar .rank-bd li { margin-bottom: 20px; }
.collectionBar .live-crumb { margin-top: 10px; }
.myorder-top-bd { position: absolute; right: 25px; top: 11px; font-size: 14px; z-index: 2; }
.myorder-top-bd span { margin-left: 15px; cursor: pointer; }
.collectionBar .pic-mask { position: absolute; left: 0; bottom: 0; height: 30px; width: 100%; background: rgba(0,0,0,.7); color: #fff; line-height: 30px; }
.collectionBar .mask-time { position: absolute; right: 10px; top: 0; font-size: 14px; color: #fff; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.collectionBar { width: 100%; overflow: hidden; }
.collectionBar ul { padding: 15px 0 0 28px; }
.collectionBar li { cursor: pointer; position: relative; float: left; width: 165px; height: 280px; background: #f0f0f0; margin: 0 24px 24px 0; overflow: hidden; }
.collectionBar li:nth-child(5n+5) { margin: 0 0 24px 0; }
.collectionBar .pic-ri-top { position: relative; width: 100%; height: 245px; }
.collectionBar li img { width: 100%; height: 100%; }
.collectionBar .pic-title { padding-left: 8px; width: 140px; }
.collectionBar .progress-bar { height: 2px; }
.collectionBar .pic-btm { position: relative; height: 35px; line-height: 35px; font-size: 14px; color: #445560; padding: 0 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; }
.movie-pos { position: absolute; right: 8px; top: 3px; }
.movie-num { font-size: 26px; font-style: italic; }
.collectionBar .icon-arror { color: #888; font-size: 18px; }
.collectionBar li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
.collectionBar .order-close { cursor: pointer; display: none; position: absolute; right: 0; top: 0; background: #eb5031; width: 30px; height: 30px; line-height: 30px; text-align: center; color: #fff; z-index: 2; }
.collectionBar .block { display: block; }

.search-tab { border-bottom: #ddd 1px solid; height: 36px; line-height: 35px; font-size: 16px; margin-left: 25px;box-sizing: border-box; }
.search-tab span { display: inline-block; vertical-align: middle; padding: 0 10px; height: 34px; line-height: 34px; cursor: pointer; border-bottom: #ddd 1px solid; }
.search-tab .cur { border-bottom: #ff9c01 1px solid; }

</style>
