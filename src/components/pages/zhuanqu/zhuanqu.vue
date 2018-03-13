<template>
	<section class="live-wrap clearfix" id="live-wrap" @click="_getPointData();_getClassic();_getClassic1();_getClassic2()">
	<!-- <section class="live-wrap clearfix" id="live-wrap" @click="_getPointData();_getClassic();_getClassic1();_getClassic2()"> -->
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box">
			<selectmenu :classicData="classicData" :classicSecondData="classicSecondData" :classicThirdData="classicThirdData" :classicFourthData="classicFourthData" @showColumnID="showColumnID" @showColumnID1="showColumnID1" @showColumnID2="showColumnID2" @showCategoryID="showCategoryID"></selectmenu>
			<!-- <loading v-if="!showLoading"></loading> -->
			<movielist :movieData="pointData.programs" @showCurrentSizeChange="showCurrentSizeChange"></movielist>
			<nodata class="nodata-div"></nodata>
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
import { zqBannerFetch, zqListFetch, zqClassicFetch, zqClassic1Fetch, zqClassic2Fetch, zqClassic3Fetch } from '@/axios/api'

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
			classicData1: [],
			classicData2: [],
			classicSecondData: [],
			classicThirdData: [],
			classicFourthData: [],
			currentPage: 1,
			categoryID: 'default',
			columnID: 'default', // 一二级栏目
			columnID1: '',
			columnID2: '',
			sortType: 0,
			year: '',
			location:'',
			currentSizeChange: 24,
			bannerList: [],
			show: false,
			showLoading: false,
			showData: false
		}
	},
    created () {
		this._getBnnerData()
		this._getClassic(function() {
			setTimeout(function() {
    			$('.classic-first span').eq(0).click()
			},100)
		})
		this._getPointData()
    },
    mounted () {

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
    	
    	$(document).on('click', '.first-list', function () {
    		setTimeout(function() {
    			$('.second-list').eq(0).click()
    			if($('.second-list').length>0) {
    				$('.second-wrap').show()
    			}else {
    				$('.second-wrap, .third-wrap, .fourth-wrap').hide()
    			}
    		}, 200)

    		$('.nodata-div').hide()
    		setTimeout(function() {
	    		if($('.movie-bd ul').length>0) {
	    			$('.nodata-div').hide()
	    		}else {
	    			$('.nodata-div').show()
	    		}
	    	}, 800)
    	})

    	$(document).on('click', '.second-list', function () {
    		setTimeout(function() {
    			$('.third-list').eq(0).click()
    			if($('.third-list').length>0) {
    				$('.third-wrap').show()
    			}else {
    				$('.third-wrap, .fourth-wrap').hide()
    			}
    		}, 200)

    		$('.nodata-div').hide()
    		setTimeout(function() {
	    		if($('.movie-bd ul').length>0) {
	    			$('.nodata-div').hide()
	    		}else {
	    			$('.nodata-div').show()
	    		}
	    	}, 800)
    	})
    	
    	$(document).on('click', '.third-list', function () {
    		setTimeout(function() {
    			$('.fourth-list').eq(0).click()
    			if($('.fourth-list').length>0) {
    				$('.fourth-wrap').show()
    			}else {
    				$('.fourth-wrap').hide()
    			}
    		}, 200)

    		$('.nodata-div').hide()
    		setTimeout(function() {
	    		if($('.movie-bd ul').length>0) {
	    			$('.nodata-div').hide()
	    		}else {
	    			$('.nodata-div').show()
	    		}
	    	}, 800)
    	})
    	setTimeout(function() {
			$('.classic-first span').eq(0).click()
		},500)
    },
    watch: {
        $route (to, from) {
        	this._getClassic(),
        	this._getPointData()
        }
    },
	methods: {
	    _getBnnerData () {
	        var self = this
	        zqBannerFetch().then(res => {
	          if(res.data.status == 0) {
	            self.bannerList = res.data.data.mediaAreaList.mediaAreaList
	          }
	        }).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		_getPointData () {
			let self = this
			zqListFetch(self).then(res => {
        		if(res.data.status == 0) {
					self.showLoading = true
        			if(res.data.data.programs.length>0) {
						// self.showLoading = true
	        			self.show = true
						const pointData = res.data.data
						const count = res.data.data.count
						self.pointData = pointData
						// console.log(self.pointData)
						self.count = count
        			}else {
						self.pointData = {
							programs: []
						}
						self.show = false
						self.showLoading = false
        			}
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		_getClassic () {
			let self = this
			zqClassicFetch(self).then(res => {
        		if(res.data.status == 0) {
					const classicData = res.data.data.categorys
					self.classicData = classicData
					// self._getClassic1()
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		_getClassic1 () {
			let self = this
			zqClassic1Fetch(self).then(res => {
        		if(res.data.status == 0) {
					const classicSecondData = res.data.data.categorys
					self.classicSecondData = classicSecondData
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		_getClassic2 () {
			let self = this
			zqClassic2Fetch(self).then(res => {
        		if(res.data.status == 0) {
					const classicThirdData = res.data.data.categorys
					self.classicThirdData = classicThirdData
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
	        })
		},
		_getClassic3 () {
			let self = this
			zqClassic3Fetch(self).then(res => {
        		if(res.data.status == 0) {
					const classicFourthData = res.data.data.categorys
					self.classicFourthData = classicFourthData
				}
			}).catch( res => {
	          console.log(res.data.errorMessage)
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
			var self = this
			setTimeout(function() {
				if($('.classic-second').html() == '') {
					self.categoryID = val
					self._getPointData()
				}
			}, 100)
		},
		showColumnID (val) {
			this.columnID1 = ''
			this.columnID1 = val
			this._getClassic2 ()
			var self = this
			setTimeout(function() {
				if($('.classic-third').html() == '') {
					self.categoryID = val
					self._getPointData()
				}
			}, 100)
		},
		showColumnID1 (val) {
			this.columnID2 = ''
			this.columnID2 = val
			this._getClassic3 ()
			var self = this
			setTimeout(function() {
				if($('.classic-fourth').html() == '') {
					self.categoryID = val
					self._getPointData()
				}
			}, 100)
		},
		showColumnID2 (val) {
			this.categoryID = ''
			this.categoryID = val
			var self = this
			setTimeout(function() {
				if($('.classic-fourth').html() == '') {
					self._getPointData()
				}
			}, 100)
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
/*.live-box { margin-top: 0; }*/
.nodata-div { display: none; }
</style>