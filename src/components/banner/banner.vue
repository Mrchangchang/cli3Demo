<template>
    <div class="banner">
        <Carousel autoplay :autoplay-speed="5000"  loop>
            <CarouselItem v-for="item in picList">
                <div class="demo-carousel">
                    <img :src="item" alt="">
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
import { Carousel, CarouselItem } from "iview";
import { from } from "zen-observable";
import { retry } from 'async';
export default {
  components: {
    Carousel,
    CarouselItem
  },
  props: {
    picList: {
      type: Array,
      default() {
          return []
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.demo-carousel
    height 570px
    // width 420px
    img 
        display block
        height 100%
        width 100%
</style>
