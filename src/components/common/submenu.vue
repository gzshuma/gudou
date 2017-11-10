<template>
  <div class="sub-menu-bd">
	<span @click="categoryIDChange(0, '-1')" :class="{cur:'-1' === nowIndex}">全部</span>
	<span v-for="(v, index) in subList" v-if="subList" @click="categoryIDChange(v.categoryID, index)" :class="{cur:index === nowIndex}">
		{{v.categoryName}}
	</span>
  </div>
</template>

<script>
export default {
	name: 'submenu',
	props: {
		subList: {
			type: Array
		}
	},
	data () {
		return {
			nowIndex: '-1'
		}
	},
	methods: {
        categoryIDChange (val, index) {
        	this.nowIndex = index
            this.$emit('showCategoryID', val)
        }
	}
}
</script>

<style scoped>
.sub-menu-bd { position: absolute; top:0; right: 0; font-size: 0; z-index: 10; }
.sub-menu-bd span { display: inline-block; vertical-align: middle; padding: 0 15px; border-right: #ddd 1px solid; font-size: 14px; height: 16px; line-height: 16px; cursor: pointer; }
.sub-menu-bd span.cur { color: #ff9c01; }
.sub-menu-bd span:last-child { border-right: 0; padding-right: 0; }
</style>