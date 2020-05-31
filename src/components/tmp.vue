<template>
  <swiper ref="swiper" class="swiper" :options="swiperOption">
    <swiper-slide class="menu left">
      <div />
    </swiper-slide>
    <swiper-slide class="content center">
      <div />
    </swiper-slide>
    <swiper-slide class="menu right">
      <div />
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuOpened: false,
      swiper: {
        // defalut value to prevent error
        activeIndex: 1,
        updateAutoHeight: () => {},
      },
      swiperOption: {
        init: false,
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
        autoHeight: true,
        spaceBetween: 10,
        on: {
          slideChange: () => {
            this.$store.commit('meta/setActiveIndex', this.swiper.activeIndex)
            this.swiper.updateAutoHeight()
          },
        },
      },
    }
  },
  computed: {
    activeIndex() {
      return this.$store.getters['meta/activeIndex']
    },
  },
  mounted() {
    this.$refs.swiper.$swiper.init()
    this.swiper = this.$refs.swiper.$swiper
  },
}
</script>

<style lang="scss" scoped>
@import './base.scss';
.swiper {
  .left {
    height: 400px;
    background: aqua;
  }
  .center {
    height: 500px;
    background: blue;
  }
  .right {
    height: 600px;
    background: indigo;
  }
  .menu {
    overflow: auto;
    width: 95%;
  }
  .swiper-wrapper {
    height: auto;
  }

  .content {
    overflow: auto;
    width: 100%;
  }
  .swiper-container {
    width: 100%;
    height: auto;
  }
}
</style>
