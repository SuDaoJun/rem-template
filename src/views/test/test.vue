<template>
  <div class="index-wrapper">
    <h3>滑动测试</h3>
    <van-tabs @change='tabChange'>
      <van-tab title='flex布局'>
        <div class="wrapper-table">
          <div class="table-header van-hairline--bottom">
            <div class="header-box" v-for='item in tableHeader' :key='item'>
              {{item}}
            </div>
          </div>
          <div :class="index === clickActive?'table-active table-cell':'table-cell'" v-for='(item,index) in userList' :key='item.id' @click='activeChange(index)'>
            <div class="cell-row van-hairline--bottom">
              <div class="row-box">{{item.logonId}}</div>
              <div class="row-box">{{item.role}}</div>
              <div class="row-box">{{item.name}}</div>
              <div class="row-box">{{item.email}}</div>
              <div class="row-box">{{item.agencyName}}</div>
              <div class="row-box">{{item.phone}}</div>
              <div class="row-box">{{item.usedStatus}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- BetterScroll组件 -->
      <van-tab title='better-scroll'>
        <div class="scroll-table" ref='wrapperScroll'>
          <div class="bscroll-container" ref='scrollWidth'>
            <div class="table-header van-hairline--bottom">
              <div class="header-box" v-for='item in tableHeader' :key='item'>
                {{item}}
              </div>
            </div>
            <div :class="index === clickScrollActive?'table-active table-cell':'table-cell'" v-for='(item,index) in userList' :key='item.id' @click='activeChanges(index)'>
              <div class="cell-row van-hairline--bottom">
                <div class="row-box">{{item.logonId}}</div>
                <div class="row-box">{{item.role}}</div>
                <div class="row-box">{{item.name}}</div>
                <div class="row-box">{{item.email}}</div>
                <div class="row-box">{{item.agencyName}}</div>
                <div class="row-box">{{item.phone}}</div>
                <div class="row-box">{{item.usedStatus}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      clickActive: 99,
      clickScrollActive: 99,
      scroll: null,
      tableHeader: [
        "用户名",
        "账号类型",
        "姓名",
        "邮箱",
        "单位/公司名称",
        "手机号码",
        "账户状态"
      ],
      userList: []
    };
  },
  created() {},
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$api.user.getUserList().then(res => {
        console.log(res);
        let userList = res.data
        userList.forEach((item,index)=>{
          item.usedStatus = item.status === "1"?'禁用':'启用'
          item.logonId = item.name + index
          item.agencyName = '公司'
        })
        this.userList = userList
      });
    },
    tabChange(index,title){
      if(index === 1){
        this.$nextTick(()=>{
          this.$refs.scrollWidth.style.width= 32 * this.tableHeader.length+'vw'
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapperScroll, {
              scrollX: true,
              click: true,
              eventPassthrough: "vertical"
            })
          }else{
            this.scroll.refresh()
          }
        })
      }
    },
    activeChanges(index){
      if(index !== this.clickScrollActive){
        this.clickScrollActive = index
      }
    },
    activeChange(index){
      if(index !== this.clickActive){
        this.clickActive = index
      }
    }
  },
  watch: {},
  components: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.index-wrapper {
  padding: 20px 20px 40px;
  h3 {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }
  // flex布局样式
  .wrapper-table {
    width: 100vw;
    font-size: 16px;
    overflow-x: scroll;
    text-align: center;
    .table-header {
       padding: 10px 0;
      display: flex;
      .header-box {
        width: 120px;
        flex-shrink: 0;
      }
    }
    .table-active {
      background-color: #ecf5ff;
    }
    .cell-row{
      padding: 10px 0;
      display: flex;
      align-items: center;
      .row-box{
        width: 120px;
        flex-shrink: 0;
        word-wrap: break-word;
      }
    }
  }
  // better-scroll滚动样式
  .scroll-table{
    width: 100%;
    font-size: 16px;
    text-align: center;
    position: relative;
    overflow: hidden;
    .table-header {
      padding: 10px 0;
      display: flex;
      .header-box {
        width: 120px;
        flex-shrink: 0;
      }
    }
    .table-active {
      background-color: #ecf5ff;
    }
    .cell-row{
      padding: 10px 0;
      display: flex;
      align-items: center;
      .row-box{
        width: 120px;
        flex-shrink: 0;
        word-wrap: break-word;
      }
    }
  }
}
/deep/ .el-table__body tr.current-row>td{
  background-color: #ecf5ff !important;
}
</style>