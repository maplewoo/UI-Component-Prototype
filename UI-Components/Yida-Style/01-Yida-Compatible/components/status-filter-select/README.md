# StatusFilterSelect（带状态色点的多选筛选 · Component）

一个多选下拉：下拉面板里每个选项 = 勾选框 + **状态色点** + 文字，选中项浅蓝底；收起后已选值渲染为灰底可删的 tag；底部一行"已选 N 项 / 清空"。用于"自查状态 / 复查状态"这类**带语义色的枚举多选筛选**。

- 解决的问题：把"多选 + 每项一个状态色点 + 可删 tag + 计数/清空脚部"的筛选下拉标准化，让状态值在选项和已选 tag 里一眼可辨。
- 与相邻组件区别：`judge-select`(C1) 是单选判定控件；`dropdown-footer`(C8) 是通用面板元素；本件 = 面向"带色状态枚举"的多选筛选下拉，复用 C8 的勾选框/脚部 + 状态色点。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。基于 antd `Select mode="multiple"`。
- 当前版本：v0.1
- 依赖：`../dropdown-footer/`（OptionCheck/DropdownFooter 同源）。
