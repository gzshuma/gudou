<template>
	<div class="classic-bd">
		<!-- <div class="classic-list clearfix">
			<div class="fl classic-name">年份</div>
			<div class="fl classic-box classic-select classic-year" cid="0">
				<span @click="yearChange(v.yearID, index)" class="classic-all" v-if="index<1" v-for="(v, index) in classicData.year" :class="{cur:index === nowIndex2}">{{v.yearName}}</span>
				<span @click="yearChange(v.yearID, index)" v-if="index>0" v-for="(v, index) in classicData.year" :class="{cur:index === nowIndex2}">{{v.yearName}}</span>
			</div>
		</div> -->
		<div class="classic-list clearfix">
			<div class="fl classic-name">一级栏目</div>
			<div class="fl classic-box classic-select classic-first" >
				<!-- <span @click="categoryIDChange('', index)" v-if="index<1" v-for="(v, index) in classicData" :class="{cur:index === nowIndex0}">全部</span> -->
				<span @click="categoryIDChange(v.categoryID, index)" v-for="(v,index) in classicData" :class="{cur:index === nowIndex0}">{{v.categoryName}}</span>
			</div>
		</div>
		<div class="classic-list clearfix">
			<div class="fl classic-name">二级栏目</div>
			<div class="fl classic-box classic-select classic-second">
				<span @click="columnIDChange('', index)" :class="{cur:index === nowIndex1}">全部</span>
				<span @click="columnIDChange(v.categoryID, index)" v-for="(v,index) in classicSecondData" :class="{cur:index === nowIndex1}">{{v.categoryName}}</span>
			</div>
		</div>
		<!-- <div class="classic-list clearfix">
			<div class="fl classic-name">地区</div>
			<div class="fl classic-box classic-select classic-area" cid="2">
				<span @click="areaChange(v.locationID, index)" class="classic-all" v-if="index<1" v-for="(v, index) in classicData.location" :class="{cur:index === nowIndex3}">{{v.locationName}}</span>
				<span @click="areaChange(v.locationID, index)" v-if="index>0" :class="{cur:index === nowIndex3}" v-for="(v, index) in classicData.location">{{v.locationName}}</span>
			</div>
		</div>
		<div class="classic-list sort-box clearfix">
			<div class="fl classic-name">排序：</div>
			<div class="fl classic-box classic-select">
				<span @click="sortTypeChange(0, 0)" class="classic-all" :class="{cur:0 === nowIndex1}">最近更新</span>
				<span @click="sortTypeChange(3, 1)" class="hotclick" :class="{cur:1 === nowIndex1}">最近热播</span>
			</div>
		</div> -->
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	name: 'rank',
	props: {
		classicData: {
			type: Array
		},
		classicSecondData: {
			type: Array
		}
	},
    created () {
    },
	data () {
		return {
			nowIndex0: 0,
			nowIndex1: 0
		}
	},
	mounted () {
    	setTimeout(function() {
    		$('.classic-first span').eq(0).click();
    	},800)
	},
	methods: {
		categoryIDChange (val, index) {
			this.nowIndex0 = index
			this.$emit('showCategoryID', val)
		},
		columnIDChange (val, index) {
			this.nowIndex1 = index
			this.$emit('showColumnID', val)
		}
	}
}
</script>

<style scoped>
.classic-bd { margin: 25px 0; }
/*  */
.classic-bd .classic-box span:hover{ color: #ff9c01; }

.classic-list { padding: 15px 15px 0 25px; border-bottom: #e1e1e1 1px solid; }
.classic-name { width: 80px; color: #888; margin-bottom: 15px; }
.classic-box { font-size: 0; width: 1070px; }
.classic-box span { margin-bottom: 15px; cursor: pointer; }
.classic-box span, .select-con { display: inline-block; vertical-align: middle; font-size: 14px; margin-right: 35px; }
.select-con { margin-right: 0; }
.classic-box span.cur { color: #ff9c01; }
.selected-classic { font-size: 0; border: #888 1px solid; padding: 2px 6px; }
.selected-classic span, .selected-classic i { display: inline-block; vertical-align: middle; font-size: 14px; margin-right: 0; color: #888; }
.classic-box .selected-classic { margin-right: 15px; }
.selected-classic .select-close { font-size: 12px; margin-right: 0; }
.selected-box { border-bottom: 0; }
.selected-box .classic-name { line-height: 25px; }
.sort-box { padding: 15px 15px 15px 25px; border-bottom: 0; }
.pad-left { padding-left: 40px; }
</style>