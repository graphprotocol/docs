import meta from '../en/_meta.js'

export default {
  ...structuredClone(meta),
  network: 'Graph网络',
  '###1': {
    type: 'heading',
    title: '子图',
  },
  developing: '开发',
  deploying: '部署',
  publishing: '发布',
  managing: '管理',
  querying: '查询',
  cookbook: '导览',
  'release-notes': '发布说明&更新向导',
  '###3': {
    type: 'heading',
    title: '索引',
  },
}
