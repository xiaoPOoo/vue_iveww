<template>
  <div class="order">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="categories">
        <Icon type="logo-buffer"></Icon>分类管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>商品分类
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 搜索订单 -->
    <Input
      suffix="ios-search"
      placeholder="请输入关键字"
      v-model="query"
      style="width: auto;margin-right:15px"
      @keyup.enter.native ="queryData"
    />
    <Button type="success"  @click="queryData">搜素</Button>
    <!-- 数据展示列表 -->
    <template>
      <Table border :columns="columDate" :data="listData" class="list-table">
        <template slot-scope="{ row }" slot="pay_status">
          <Tag checkable color="error">{{ row.pay_status == 0?'未支付':'已支付' }}</Tag>
        </template>
        <template slot-scope="{ row }" slot="send">
          <Tag checkable color="success">{{ row.is_send == false?'已发货':'未发货' }}</Tag>
        </template>
        <template slot-scope="{ row }" slot="orderTime">
          <span>{{ row.create_time | dataFormat}}</span>
        </template>
      </Table>
    </template>
    <!-- 分页 -->
    <Page :total="total" size="small" show-total show-elevator show-sizer @on-change="changenum" @on-page-size-change="changesize"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "", // 默认查询参数为空
      pagenum: 1, // 当前默认查询分页1
      pagesize: 10, // 默认查询10条数据
      total:0,//默认总条数为0
      columDate: [
        {
          title: "订单编号",
          key: "order_number"
        },
        {
          title: "支付状态",
          slot: "pay_status"
        },
        {
          title: "是否发货",
          slot: "send"
        },
        {
          title: "个人/公司",
          key: "order_fapiao_title"
        },
        {
          title: "下单时间",
          slot: "orderTime"
        }
      ],
      listData: []
    };
  },
  created() {
    // 调用初始化的数据
    this.initData();
  },
  methods: {
    async initData() {
      const { data: res } = await this.$http.get("orders", {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      // console.log(res); // 测试拿到的数据
      // 先判断是否已经请求成功拿到数据
      if (!res.meta.status === 200) this.$Message.error("数据请求失败");
      this.listData = res.data.goods;
      this.total = res.data.total ;  // 获取总条数
    },
    // 点击分页显示每页展示第几页
    changenum(num){
      this.pagenum = num;
      // 调用数据初始化
      this.initData();
    },
    // 点击分页按钮，显示每页多少条数
    changesize(num){
      this.pagesize = num;
      // 调用数据初始化 
      this.initData();
    },
    // 查询数据
    queryData(){
      // 由于数据的双向绑定，可以直接调用数据初始化，当拿到了query参数
      console.log('已经发送了查询事件');
      this.$Message.error("由于接口问题，暂时无法查询，功能以实现")
      this.initData();
    }
  },
  filters: {
    //时间格式化
    dataFormat: data => {
      var date = new Date(data);
      // 格式化年月日
      var Y = date.getFullYear();
      var M = date.getMonth() + 1;
      var D = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      return Y + "/" + M + "/" + D + "     " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: #a7beee;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .list-table {
    margin: 15px 0;
  }
}
</style>