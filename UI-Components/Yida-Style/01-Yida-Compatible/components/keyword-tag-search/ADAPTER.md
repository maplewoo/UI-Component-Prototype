# KeywordTagSearch — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string[] | 是 | 已选关键词（受控） |
| onChange | (words)=>void | 是 | 增删标签回调 |
| history | string[] | 否 | 历史词（宿主去重/截断/持久化后传入） |
| countFor | (word)=>number | 否 | 命中计数 |
| matchMode | 'any'\|'all' | 否 | 匹配模式（受控） |
| onMatchModeChange | (m)=>void | 否 | 提供则底栏显模式切换，否则显"已选/清空" |
| placeholder / maxTagCount / style / popupClassName / typedAddLabel | - | 否 | 透传/定制 |

## 输出 / 事件
- `onChange(words)`：加/删词；空数组 = 清空。
- `onMatchModeChange(mode)`：仅当宿主开启模式切换。

## External Dependencies
- antd `Select`（tags）。
- **持久化（localStorage / 远端偏好）= 外部能力**：组件只渲染传入的 `history`；历史词的写入（回车加词后并入 history、去重、限长 N、存储）由宿主在 `onChange` 里做。
- 命中计数 `countFor` 依赖宿主当前筛选结果集（对某词命中的行数）。

## 宿主需负责
- 维护 `matchMode` 的过滤语义（任一=命中任一词、全部=同时含所有词）应用于表格数据。
- 关键词与行数据的匹配大小写/归一化策略（示例用不区分大小写子串）。
- 与 `dropdown-footer` 保持面板元素样式一致（本包内联了最小版，真实页可共用一份 helper）。

## 已知坑
- 面板 portal → 颜色字面 + `popupClassName` 作用域（已内置）。
- tags 模式下历史项过滤按 label 子串；若历史很多需自定义 `filterOption` 时注意不要连"回车加词"一起改掉。
