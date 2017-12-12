<template>
	<section class="live-wrap clearfix" id="live-wrap" @click="_getPointData();_getClassic()">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box">
			<selectmenu :classicData="classicData" :classicSecondData="classicSecondData" @showColumnID="showColumnID" @showCategoryID="showCategoryID"></selectmenu>
			<loading v-if="!showLoading"></loading>
			<movielist :movieData="pointData.programs" @showCurrentSizeChange="showCurrentSizeChange"></movielist>
			<nodata v-if="!show"></nodata>
		</div>
		<pagination v-if="show" :count="pointData.count" @showCurrentSizeChange="showCurrentSizeChange" @showCurrentPage="showCurrentPage"></pagination>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/bannerzhuanqu'
// 电影图文
import movielist from 'components/common/zqmovielist'
import selectmenu from 'components/common/selectmenuzq'
import pagination from 'components/common/pagination'
import loading from 'components/common/loading'
import nodata from 'components/common/nodata'

export default {
	components: {
    	banner,
	    movielist,
	    selectmenu,
	    pagination,
	    loading,
	    nodata
	},
	data () {
		return {
			pointData: [],
			classicData: [],
			classicSecondData: [],
			currentPage: 1,
			categoryID: '',
			columnID: 'default', // 一二级栏目
			sortType: 0,
			year: '',
			location:'',
			currentSizeChange: 24,
			bannerList: [],
			show: false,
			showLoading: false
		}
	},
    created () {
		this._getBnnerData()
		this._getClassic(function(){
			this._getPointData()
		})
    },
    mounted () {
    	// 切换导航时重置
    	$(document).on('click', '.nav-box .catlist', function () {
    		setTimeout(function() {
    			location.reload()
    		}, 200)
    	})

    	// 点击页面显示矫正
    	$(document).on('click', '.el-pager li', function () {
    		setTimeout(function() {
    			$('.movie-wrap, .movie-bd ul').click()
    		}, 200)
    	})
    	$(document).on('click', '.btn-next', function () {
    		setTimeout(function() {
    			$('.movie-wrap, .movie-bd ul').click()
    		}, 200)
    	})
    	$(document).on('click', '.btn-prev', function () {
    		setTimeout(function() {
    			$('.movie-wrap, .movie-bd ul').click()
    		}, 200)
    	})
    	$(document).on('click', '.classic-first span', function () {
    		$('.classic-second').find('span').eq(0).click()
    	})
    },
    watch: {
        $route (to, from) {
        	this._getPointData(),
        	this._getClassic()
        }
    },
	methods: {
	    _getBnnerData () {
	        var self = this
	        self.$http({
	          method: 'post',
	          url: '/api/PortalServer-App/new/ptl_ipvp_cmn_cmn017',
	          params: {
	            mediaAreaList: 'mediaAreaList',
	            puser: self.GLOBAL.config.puser,
	            timestamp: self.GLOBAL.config.timestamp,
	            locationName: '',
	            ptn: self.GLOBAL.config.ptoken,
	            ptype: self.GLOBAL.config.ptype,
	            plocation: self.GLOBAL.config.plocation,
	            ptoken: self.GLOBAL.config.ptoken,
	            pserialNumber: self.GLOBAL.config.pserialNumber,
	            pversion:  self.GLOBAL.config.pversion,
	            pserverAddress: self.GLOBAL.config.pserverAddress,
	            countyName: '',
	            nonce: self.GLOBAL.config.nonce,
	          }
	        })
	        .then((res) => {
	          if(res.data.status == 0) {
	            self.bannerList = res.data.data.mediaAreaList.mediaAreaList
	          }
	        })
	        .catch((res) => {
	          alert(res.data.errorMessage)
	        })
	      },
		_getPointData () {
			let self = this
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod011',
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
					columnID: self.columnID,
					categoryID: self.categoryID,
					start: (self.currentPage-1) * self.currentSizeChange,
					end: (self.currentPage) * self.currentSizeChange,
					// end: '1000',
					sortType: self.sortType,
					location: self.location
				}
			})
			.then((res) => {
        		if(res.data.status == 0) {
					self.showLoading = true
        			if(res.data.data.programs.length>0) {
	        			self.show = true
						const pointData = res.data.data
						const count = res.data.data.count
						self.pointData = pointData
						// console.log(self.pointData)
						self.count = count
        			}else {
						self.pointData = []
						self.show = false
        			}
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		_getClassic () {
			let self = this
			self.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod009',
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
					columnID: this.$route.params.id,
				}
			})
			.then((res) => {
        		if(res.data.status == 0) {
					const classicData = res.data.data.categorys
					self.classicData = classicData
					// console.log(self.classicData)
					// self.columnID = self.classicData[0].categoryID
					// self._getPointData()
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		_getClassic1 () {
			let self = this
			self.$http({
				method: 'get',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod009',
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
					columnID: self.columnID
				}
			})
			.then((res) => {
        		if(res.data.status == 0) {
					const classicSecondData = res.data.data.categorys
					self.classicSecondData = classicSecondData
					// console.log(self.classicData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		showCurrentPage (val) {
			this.currentPage = val
		},
		showCurrentSizeChange (val) {
			this.currentSizeChange = val
		},
		showCategoryID (val) {
			this.columnID = ''
			this.columnID = val
			this._getClassic1 ()
			// this._getPointData()
		},
		showColumnID (val) {
			this.categoryID = ''
			this.categoryID = val
			// this._getPointData()
		}
	}
}
</script>

<style scoped>
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .vue-tablist { border-bottom: 1px #e1e1e1 solid; height: 34px; font-size: 16px; margin-bottom: 20px; overflow: hidden; }
.tabs-box .vue-tablist li { float: left; line-height: 33px; padding: 0 15px; margin: 0 10px 0 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .vue-tablist li[aria-selected=true] { border-bottom: #ff9c01 2px solid; color: #ff9c01; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; } 
.live-box { margin-top: -35px; }
</style>