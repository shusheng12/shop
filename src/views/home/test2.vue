<template>
  <div>
    <el-card class="el1">
      <div class="flex-fa">
        <div class="header-ml">目录</div>
        <div class="header-icon">
          <el-tooltip class="item" effect="dark" content="添加" placement="top">
            <img
              src="@/assets/img/添加 copy 4.png"
              class="xg-icon"
              alt="添加"
              @click="operateData('new')"
            />
          </el-tooltip>
        </div>
      </div>
      <div>
        <div v-for="i in 2" :key="i" class="form-item">
          <div class="left-icon">
            <i class="el-icon-document" @click="operateData('new')" />
          </div>
          <span>您有一条未读消息</span>
          <div class="right-icon">
            <el-tooltip
              class="item"
              effect="dark"
              content="内置表单"
              placement="right"
            >
              <img
                src="@/assets/img/系统内置事件20px.png"
                class="xg-icon"
                alt="添加"
              />
            </el-tooltip>
          </div>
        </div>
        <div v-for="i in 2" :key="i" class="form-item">
          <div class="left-icon">
            <i class="el-icon-document" />
          </div>
          <span>已读消息</span>
        </div>
      </div>
    </el-card>
    <!-- 弹窗2 -->
    <el-dialog
      title="新增校验规则"
      :visible.sync="dialogFormVisible"
      width="680px"
      class="alert"
    >
      <el-form :model="form" label-width="160px">
        <el-form-item label="校验字段：" prop="pass">
          <div class="input-margin">
            <el-radio-group v-model="radio1" fill="#1890FF">
              <el-radio :label="1">数据范围</el-radio>
              <el-radio :label="2" class="margin">唯一校验</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="校验字段：" prop="pass" label-width="160px">
          <el-radio-group v-model="radio" fill="#1890FF">
            <el-radio :label="3">数据范围</el-radio>
            <el-radio :label="6" class="margin">唯一校验</el-radio>
            <el-radio :label="7">条件校验</el-radio>
            <el-radio :label="9">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 校验公式预览 -->
        <div v-if="radio === 3" class="border-sty">
          <el-form-item label="校验公式预览：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <span>{xxxx值}*5>{yyyy值}</span>
              <el-input
                v-model="input3"
                placeholder="公式文本分析"
                size="mini"
                class="tjsx-form-select3"
              />
            </div>
          </el-form-item>
          <el-form-item label="公式左侧：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-right"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="公式判断符号：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-input
                v-model="input3"
                placeholder="公式文本分析"
                size="mini"
                class="tjsx-form-select3"
              />
            </div>
          </el-form-item>
          <el-form-item label="公式左侧：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-right"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- 唯一性组合 -->
        <div v-else-if="radio === 6" class="border-sty">
          <el-form-item label="公式左侧：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty2">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- 关联表1 -->
        <div v-if="radio === 7" class="border-sty">
          <el-form-item label="关联表：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="glb-text">变量参数名：table1_1</div>
            </div>
          </el-form-item>
          <el-form-item label="校验公式预览：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <span>{xxxx值}*5>{yyyy值}</span>
              <el-input
                v-model="input3"
                placeholder="公式文本分析"
                size="mini"
                class="tjsx-form-select3"
              />
            </div>
          </el-form-item>
          <el-form-item label="公式左侧：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-right"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="公式判断符号：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-input
                v-model="input3"
                placeholder="公式文本分析"
                size="mini"
                class="tjsx-form-select3"
              />
            </div>
          </el-form-item>
          <el-form-item label="公式左侧：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-right"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- 关联表2 -->
        <div v-if="radio === 9" class="border">
          <el-form-item label="关联表：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="glb-text">变量参数名：table1_1</div>
            </div>
          </el-form-item>
          <el-form-item label="当前表：" prop="pass" label-width="160px">
            <div class="jygs-margin">
              <span>表1—3</span>
            </div>
          </el-form-item>
          <el-form-item
            label="当前表不可重复字段："
            prop="pass"
            label-width="160px"
          >
            <div class="jygs-margin">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                class="select-left"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <el-select v-model="value1" placeholder="请选择" size="mini" />
              </el-select>
              <div class="img-sty1">
                <img src="@/assets/img/添加 copy 4.png" alt="添加" />
              </div>
            </div>
          </el-form-item>
          <div class="border-background">
            <div class="border-background1">
              <el-form-item label="关联表：" prop="pass" label-width="160px">
                <div class="jygs-margin">
                  <el-select
                    v-model="value1"
                    placeholder="请选择"
                    size="mini"
                    class="select-left"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                    <el-select
                      v-model="value1"
                      placeholder="请选择"
                      size="mini"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                label="当前表不可重复字段："
                prop="pass"
                label-width="160px"
              >
                <div class="jygs-margin">
                  <el-select
                    v-model="value1"
                    placeholder="请选择"
                    size="mini"
                    class="select-left"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                    <el-select
                      v-model="value1"
                      placeholder="请选择"
                      size="mini"
                    />
                  </el-select>
                  <div class="img-sty3">
                    <img src="@/assets/img/添加 copy 4.png" alt="添加" />
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="img-sty4">
              <img src="@/assets/img/添加 copy 4@2x.png" alt="添加" />
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  props: {
    catalogList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultProps: {
        children: "children2",
        label: "catalogName",
      },
      treeSelectData: {},
      // 弹出框数据
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      radio: "3",
      radio1: "1",
      formLabelWidth: "120px",
      options: [
        {
          value: "选项1",
          label: "黄金糕糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      // 弹出框数据
    };
  },
  watch: {},
  created() {},
  methods: {
    handleNodeClick(data) {
      this.treeSelectData = data;
      this.$emit("changeTempTabList", data);
    },
    operateData(type) {
      if (type === "new") {
        this.$emit("operateData", { catalogName: "", sort: 1 }, type);
      } else {
        this.$emit("operateData", this.treeSelectData, type);
      }
    },
    async getCataloglistfun() {
      let res = await getCatalogList();
      console.log(res);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el1 {
  max-width: 392px;
  min-width: 140px;
}

.form-item {
  position: relative;
  padding: 12px 10px;
  color: #999999;
  font-size: 14px;
  box-sizing: border-box;
  max-width: 392px;
  min-width: 140px;
}

.formClassificate {
  height: calc(100vh - 246px);
  margin-bottom: 0;
  overflow-y: auto;
  border-top: 0;
  background-color: #fff;

  .modifyOperating {
    padding: 12px;
    margin-bottom: 12px;
    text-align: right;
    border-bottom: solid 1px #e6e6e6;

    i {
      font-size: 26px;
      margin: 0px 4px;
      cursor: pointer;
    }

    .el-icon-edit-outline {
      color: #146d95;
    }

    .el-icon-delete {
      color: #ef3e4a;
    }
  }
}

.flex-fa {
  height: 42px;
  line-height: 42px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 1px;
  max-width: 392px;
  min-width: 140px;
  overflow: hidden;
  font-weight: 400;
  color: #333333;
  border-bottom: 1px solid #d1d1d1;
}

.header-ml {
  padding-left: 14px;
  padding-top: 2px;
}

.header-icon {
  padding-right: 22px;
  color: #999999;
  padding-top: 2px;
}

.icon-color {
  color: #00CECB;
}

.left-icon {
  float: left;
  margin-right: 8px;
}

.right-icon {
  // float: right;
  position: absolute;
  right: 12px;
  top: 10px;
  padding-right: 12px;
}

.form-item:hover {
  color: #00CECB;
  background: rgba(0, 206, 203, 0.11);
  box-sizing: border-box;
  border-right: 2px solid #00CECB;

  .right-icon {
    right: 10px;
  }
}

// 弹出框眼熟
.alert {
  font-size: 16px;
}

/deep/.el-dialog__header {
  background: rgba(245, 245, 245, 1);
}

/deep/.el-radio-group {
  margin-top: 11px;
}

/deep/.el-form-item__label {
  font-weight: 500;
}

.alert-top {
  margin-top: 5px;
  font-size: 14px;
}

.tjsx-form-select {
  width: 96px;
}

.tjsx-form-select2 {
  width: 170px;
  height: 28px;
}

.tjsx-form-select3 {
  margin-left: 4px;
  width: 196px;
  height: 28px;
}

.img-sty {
  padding-top: 4px;
  float: right;
  margin-right: 146px;
}

.img-sty1 {
  padding-top: 4px;
  float: right;
  margin-right: 232px;
}

.img-sty2 {
  padding-top: 4px;
  float: right;
  margin-right: 234px;
}

.img-sty3 {
  padding-top: 4px;
  float: right;
  margin-right: 32px;
}

.img-sty4 {
  float: right;
  margin: 50px 50px 0 0;
}

.alert-form-sjfw {
  margin-top: 12px;
  margin-right: 20px;
  padding-top: 4px;
  border: 1px dashed #CBCBCB;
  width: 334px;
  float: right;
  height: 200px;
  padding-left: 10px;
  background: #fafafa;
  font-size: 14px;
}

.input-margin {
  margin-top: 4px;
}

.margin {
  margin-left: 4px;
}

.border-sty {
  width: 100%;
  padding: 0 0 10px 0;
}

.p-margin {
  padding-top: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFan;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}

.select-left {
  width: 222px;
}

.select-right {
  width: 84px;
}

.glb-text {
  float: right;
  padding-right: 110px;
}

.alert-form-sjfw {
  margin-top: 12px;
  margin-right: 20px;
  padding-top: 4px;
  border: 1px dashed #CBCBCB;
  width: 390px;
  float: right;
  height: 146px;
  padding-left: 10px;
  background: #fafafa;
  font-size: 14px;
}

.tjsx-margin {
  margin-top: 6px;
}

.jygs-sty {
  float: right;
  padding-right: 10px;
  height: 50px;
}

.alert-form-tjsx {
  margin-top: 12px;
  margin-right: 20px;
  padding-top: 4px;
  border: 1px dashed #CBCBCB;
  width: 390px;
  float: right;
  height: 146px;
  padding-left: 10px;
  background: #fafafa;
  font-size: 14px;
}

/deep/.el-dialog__footer {
  background: rgba(249, 249, 249, 1);
}

.border-background {
  width: 600px;
  height: 130px;
  background: rgba(238, 238, 238, 0.18);
  border: 1px dashed rgba(151, 151, 151, 1);
  margin-left: 20px;
}

.border-background1 {
  width: 440px;
  height: 114px;
  background: rgba(238, 238, 238, 0.18);
  border: 1px dashed rgba(151, 151, 151, 1);
  margin-left: 44px;
  margin-top: 8px;
  float: left;
}

.jygs-margin {
  margin-top: 6px;
}
</style>
