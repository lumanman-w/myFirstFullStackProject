<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <!-- <el-input v-model="model.icon"></el-input> -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="难度">
        <!-- el-rate 的数据不能为空 -->
        <el-rate
          style="margin-top: 0.6rem;"
          v-model="model.scores.difficult"
          :max="9"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <!-- el-rate 的数据不能为空 -->
        <el-rate
          style="margin-top: 0.6rem;"
          v-model="model.scores.skills"
          :max="9"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <!-- el-rate 的数据不能为空 -->
        <el-rate
          style="margin-top: 0.6rem;"
          v-model="model.scores.attack"
          :max="9"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <!-- el-rate 的数据不能为空 -->
        <el-rate
          style="margin-top: 0.6rem;"
          v-model="model.scores.survive"
          :max="9"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.items" multiple>
          <el-option
            v-for="item of items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple>
          <el-option
            v-for="item of items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="model.teamTips"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      categories: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
      /* 有时下面这句不能引起界面的变化，通常使用上面这句，是vue的显式赋值 */
      // this.model.icon = res.url;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
      /* Object.assign()合并对象，后面对象有，前面对象没有的属性会加上，前面有后面有的会覆盖 */
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  min-height: 100%;
  width: auto;
}
</style>
