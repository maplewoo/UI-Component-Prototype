# InlineJumpPagination（自绘跳页分页条）

一个可直接喂给 antd `Table.pagination` 的配置工厂 + 样式：页码导航照常，`showTotal` 里内嵌中文"共 N 项 … 跳至 [__] 页"。

- 解决的问题：宜搭运行时 antd 缺中文 locale，`showQuickJumper` 只会显英文"Go to"；本组件自绘中文跳页输入，规避 locale 依赖。
- 典型场景：任意需要"共 X 项 + 跳到第 N 页"的表格分页。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。
- 当前版本：v0.3
