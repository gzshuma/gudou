<template>
	<section class="live-wrap clearfix" id="live-wrap" @click="_getPointData();_getClassic()">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box">
			<selectmenu :classicData="classicData" @showSortTypeVal="showSortTypeVal" @showCategoryID="showCategoryID" @showYearVal="showYearVal" @showAreaVal="showAreaVal"></selectmenu>
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
import banner from 'components/common/banner'
// 电影图文
import movielist from 'components/common/movielist'
import selectmenu from 'components/common/selectmenu'
import pagination from 'components/common/pagination'
import loading from 'components/common/loading'
import nodata from 'components/common/nodata'
import { pListContrentData, pointContentFetch, pointClassicData } from '@/axios/api'

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
			classicData: {},
			currentPage: 1,
			categoryID: '',
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
		this._getPointData()
		this._getBnnerData()
		this._getClassic()
    },
    mounted () {
    	// 切换导航时重置
    	$(document).on('click', '.nav-box .catlist', function () {
    		setTimeout(function() {
    			location.reload()
    		}, 50)
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
    },
    watch: {
        $route (to, from) {
        	this._getPointData(),
        	this._getClassic()
        }
    },
	methods: {
	    _getBnnerData () {
			let self = this
			pointContentFetch().then(res => {
				if(res.data.status == 0) {
					const dataCard = res.data.data.cards
					dataCard.forEach(function (value, key) {
					if(value.type === 'carousel') {
						self.bannerList =  value.contents
					}
					})
				}
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
	    },
		_getPointData () {
			let self = this
			pListContrentData(self).then(res => {
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
			}).catch((res) => {
				console.log(res.data.errorMessage)
			})
		},
		_getClassic () {
			let self = this
			pointClassicData(self).then(res => {
        		if(res.data.status == 0) {
					const classicData = res.data.data
					self.classicData = classicData
					// console.log(self.classicData)
					self.year = classicData.year[0].yearID
					self.columnID = ''
					self.location = classicData.location[0].locationID
					self.sortType = '0'
				}
			}).catch((res) => {
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
			this.categoryID = ''
			this.categoryID = val
			// this._getPointData ()
		},
		showSortTypeVal (val) {
			this.sortType = 0
			this.sortType = val
			// this._getPointData ()
		},
		showYearVal (val) {
			this.year = 0
			this.year = val
			// this._getPointData ()
		},
		showAreaVal (val) {
			this.location = 0
			this.location = val
			// this._getPointData ()
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
.live-box { margin-top: -20px; }
</style>
