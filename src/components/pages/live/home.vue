<template>
	<section class="live-wrap clearfix" id="live-wrap">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<crumb :crumbTxt="crumbTxt.txtList1">
				<submenu :subList="liveSubList" @showCategoryID="showCategoryID"></submenu>
			</crumb>
			<tvcon :liveConData="liveContent"></tvcon>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/bannerlive'
// 面包title
import crumb from 'components/common/crumb'
// 关联菜单
import submenu from 'components/common/submenu'
// 排行
import tvcon from 'components/common/tvcon'

export default {
	components: {
	    banner,
	    crumb,
	    submenu,
	    tvcon
	},
	data () {
		return {
			active: false,
			activeName: 'second',
			liveTabData: [],
			liveConData: [],
			liveContent: [],
			liveSubList: [],
			categoryID: 0,
			bannerList: [],
			crumbTxt: {
				'txtList1': '电视'
			}
		}
	},
    mounted () {
		this._getliveTabData()
		this._getliveConData()
		this._getBnnerData()
		this._getLiveContentInfo()
		setTimeout(function() {
			$('.sub-menu-bd').find('span').eq(0).click()
		}, 500)
	},
    watch: {
        // '$route': '_getliveConData'
    },
	methods: {
	    _getBnnerData () {
	      var self = this
	      self.$http({
	        method: 'post',
	        url: '/banner/RSWeb/gd/getContentListByColumnID',
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
				columnID: '003',
				count: '6'
	        }
	      })
	      .then((res) => {
	        if(res.data.status == 0) {
	          self.bannerList = res.data.data.contentInfos
	          // alert(self.bannerList)
	        }
	      })
	      .catch((res) => {
	        alert(res.data.errorMessage)
	      })
	    },
		_getliveTabData () {
			var self = this;
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live003',
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
				}
			})
			//this.$http.post('/api/PortalServer-App/new/ptl_ipvp_vod_vod011', paramPointList)
			.then((res) => {
        		if(res.data.status == 0) {
					self.liveTabData = res.data.data.liveCategoryList
					//alert(self.liveTabData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
      _getLiveContentInfo () {
        var self = this
        self.$http({
          method: 'post',
          url: '/api/PortalServer-App/new/ptl_ipvp_live_live003',
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
            page: 0,
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            self.liveSubList = res.data.data.liveCategoryList
            // console.log(self.liveSubList)
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      },
		_getliveConData () {
			var self = this
			// alert(self.categoryID)
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live005',
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
					start: '0',
					end: '200',
					channelName: '',
					programName: '',
					sortType: '2',
					categoryID: this.categoryID
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					self.liveContent = res.data.data.channelInfos
					// console.log(self.liveConData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		showCategoryID (val) {
        	// console.log(val)
			this.categoryID = val
			this._getliveConData()
		}
	}
}
</script>

<style scoped>
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
</style>
