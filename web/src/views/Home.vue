<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/2.jpg"
             class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/3.png"
             class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/4.jpg"
             class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-3"
           slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
      },
    };
  },
};
</script>

<style lang="scss" type="text/scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
</style>
