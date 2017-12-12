<template>
	<div class="classic-bd">
		<div class="classic-list clearfix">
			<div class="fl classic-name">一级栏目</div>
			<div class="fl classic-box classic-select classic-first" >
				<span class="first-list" @click="categoryIDChange(v.categoryID, index)" v-for="(v,index) in classicData" :class="{cur:index === nowIndex0}">{{v.categoryName}}</span>
			</div>
		</div>
		<div class="classic-list clearfix">
			<div class="fl classic-name">二级栏目</div>
			<div class="fl classic-box classic-select classic-second">
				<span class="second-list" @click="columnIDChange(v.categoryID, index)" v-for="(v,index) in classicSecondData" :class="{cur:index === nowIndex1}">{{v.categoryName}}</span>
			</div>
		</div>
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
    		$('.first-list').eq(0).click()
    	},200)
	},
	methods: {
		categoryIDChange (val, index) {
			// console.log(index)
			this.nowIndex0 = index
			this.$emit('showCategoryID', val)
		},
		columnIDChange (val, index) {
			// alert(index)
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