<template>
  <div class="tags-view-container">
    <div class='tags-view-wrapper'>
      <router-link ref='tag' class="tags-view-item" :class="{active: isActive(tag)}" :style="{width: 1 / visitedView.length * 100 + '%'}"
                   v-for="tag in visitedView"
                   :to="tag.path" :key="tag.path" :title="tag.meta.tagTitle" @contextmenu.prevent.native="openMenu(tag,$event)">
        <em class="path-text">{{tag.meta.tagTitle}}</em>
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </div>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      visitedView: []
    }
  },
  mounted () {
    // this.addViewTags(this.$route)
    // this.visitedView.push(this.$route)
  },
  watch: {
    $route (val) {
      this.addViewTags(val)
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags (route) {
      let isExist = false
      for (let i = 0; i < this.visitedView.length; i++) {
        if (this.visitedView[i].name === route.name || this.visitedView[i].path === route.path) {
          isExist = true
        }
      }
      if (!isExist && route.name !== 'welcome') {
        this.visitedView.push(route)
      }
      this.$emit('tagChange', this.visitedView)
    },
    closeSelectedTag (view) {
      for (let i = 0; i < this.visitedView.length; i++) {
        if (this.visitedView[i].name === view.name || this.visitedView[i].path === view.path) {
          this.visitedView.splice(i, 1)
        }
      }
      if (this.isActive(view)) {
        const latestView = this.visitedView.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.path)
        } else {
          this.$router.push('/welcome')
        }
      }
      this.$emit('tagChange', this.visitedView)
    },
    // 关闭其他
    closeOthersTags () {
      this.visitedView = []
      this.visitedView.push(this.selectedTag)
      this.$router.push(this.selectedTag.path)
      this.$emit('tagChange', this.visitedView)
    },
    // 关闭所有
    closeAllTags () {
      this.visitedView = []
      this.$router.push('/welcome')
      this.$emit('tagChange', this.visitedView)
    },
    openMenu (tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>
