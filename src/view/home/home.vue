<template>
    <div class="home">
        <Row  type="flex" justify="center">
            <Col span="20"  class="banner-wrapper">
                <banner :picList="picList"></banner>
            </Col>
        </Row>
        <Row   justify="center" style="padding: 32px;">
            <Col span="20" push="2" >
                <row type="flex" :gutter="16" >
                    <Col span="16">
                        <Card style="width: 320px">
                            <div style="text-align: center">
                                <img src="~../../assets/logo.png" alt="">
                                <h3>相册</h3>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6" push="2">
                        <card style="height: 280px;">
                            <p slot="title">消息公告</p>
                            <p>
                                这是楠楠定制的个人网站
                            </p>
                        </card>
                    </Col>
                </row>
            </Col>
        </Row>
    </div> 
</template>
<script>
import Banner from "@/components/banner/banner";
import { Row, Col, Card } from "iview";
import { from } from "zen-observable";
export default {
  components: {
    Banner,
    Row,
    Col,
    Card
  },
  data() {
    return {
      picList: [
        "/static/34fae6cd7b899e51fab3e9c048a7d933c8950d21.jpg",
        "/static/mmexport1541269520684.jpg",
        "/static/1465558100452.jpg"
      ],
      imgPic: require('../../assets/logo.png')
    };
  }
};
</script>
<style lang="stylus" scoped>
.banner-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: #efefef;
    margin: 0 auto;

    .banner {
        width: 100%;
    }
}
</style>
