const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { /* 名称 */
    type: String
  },
  avatar: { /* 头像 */
    type: String
  },
  title: { /* 称号 */
    type: String
  },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], /* 关联分类 */
  scores: { /* 评分--复合类型 */
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{ /* 技能 */
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], /* 顺风出装 */
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], /* 逆风出装 */
  usageTips: { type: String },/* 使用技巧 */
  battleTips: { type: String },/* 对抗技巧 */
  teamTips: { type: String },/* 团队技巧 */
  partners: [{ /* 关系 */
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)