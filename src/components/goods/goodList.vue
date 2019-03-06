<template>
  <div class="goodList">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="users">
        <Icon type="logo-buffer"></Icon>商品管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>商品列表
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 搜索框 -->
    <Input
      suffix="ios-search"
      v-model="query"
      placeholder="请输入关键词"
      style="width: auto"
      @keydown.enter.native="search"
    />
    <Button type="success" style="margin-left:10px" @click="search">搜索</Button>

    <!-- 数据表格 -->
    <template>
      <Table border :columns="goodsTitle" :data="goodsData" class="dataTable">
        <template slot-scope="{row}" slot="creatTime">
          <span>{{ row.add_time | timeFormat}}</span>
        </template>
        <template slot-scope="{ row  }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="ediGoods(row)">编辑</Button>
          <Poptip :confirm="true" title="你确定删除吗？删除无法恢复哦！" @on-ok="removeGoods(row)">
            <Button type="error" size="small">删除</Button>
          </Poptip>
        </template>
      </Table>
    </template>
    <!-- 分页 -->
    <template>
      <Page
        :total="total"
        size="small"
        show-total
        show-elevator
        show-sizer
        :page-size-opts="[5,10,15,20]"
        @on-change="changePagenum"
        @on-page-size-change="changePagesize"
      />
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      goodsTitle: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "商品编号",
          key: "goods_id",
          width: 80
        },
        {
          title: "商品标题",
          key: "goods_name"
        },
        {
          title: "商品价格（元)",
          key: "goods_price",
          width: 150
        },
        {
          title: "商品数量",
          key: "goods_number",
          width: 100,
          align: "center"
        },
        {
          title: "商品重量（kg）",
          key: "goods_weight",
          width: 130,
          align: "center"
        },
        {
          title: "创建时间",
          slot: "creatTime",
          width: 150
        },
        {
          title: "操作",
          slot: "action",
          width: 150
        }
      ], // 表格参数处理
      goodsData: [], // 表格数据
      query: "", // 查询的关键词
      pagenum: 1, // 默认查询的页数为1
      pagesize: 10, // 默认查询10 条数据
      total: 0 // 总条数、默认为0
    };
  },
  created() {
    //   调用初始化数据
    this.initData();
  },
  methods: {
    //初始化数据
    async initData() {
      const { data: res } = await this.$http.get("goods", {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      //   console.log(res);
      if (res.meta.status === 200) {
        this.goodsData = res.data.goods;
        this.total = res.data.total;
      }
    },
    // 按关键字搜索
    search() {
      this.initData();
    },
    // 编辑商品
    ediGoods(row) {
      console.log(row);
    },
    // 删除商品
    async removeGoods(row) {
      console.log(row);
      const { data: res } = await this.$http.delete(`goods/${row.goods_id}`);
      if (res.meta.status === 200) {
        this.$Message.success("删除成功！");
        this.initData();
      } else {
        this.$Message.error("删除失败");
      }
    },
    // 分页
    changePagenum(num) {
      //   console.log(num);
      // this.pagenum = num , 重新向服务器发起请求
      this.pagenum = num;
      this.initData();
    },
    // 每页显示条数
    changePagesize(num) {
      //   console.log(num);
      // this.pagesize = num , 重新向服务器发起请求
      this.pagesize = num;
      this.initData();
    }
  },
  //   过滤器处理时间
  filters: {
    timeFormat: data => {
      var date = new Date(data);
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return Y + "-" + M + "-" + D + "   " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style lang="scss" scoped>
.goodList {
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: #a7beee;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .dataTable {
    margin: 10px 0;
  }
}
</style>