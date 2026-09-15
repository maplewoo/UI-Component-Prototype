# StatusFilterSelect — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string[] | 是 | 已选（受控） |
| onChange | (arr)=>void | 是 | 增删/清空回调 |
| options | [{label,value,color?,count?}] | 是 | 枚举；`color`＝状态色点色（缺省灰点） |
| placeholder | string | 否 | 默认"可多选" |
| width | number | 否 | **Default 按令牌=190** |
| showCount | boolean | 否 | 右靠命中数（需 options[].count 或 countFor） |
| countFor | (value)=>number | 否 | 与 options[].count 二选一 |
| onClearAll | ()=>void | 否 | 底部清空；缺省＝onChange([]) |
| clearText | string | 否 | 默认"清空" |
| popupClassName | string | 否 | 默认 `sfs-pop`，多实例请各自唯一 |

## 输出 / 事件
- `onChange(arr)`：加/删/清空。

## External Dependencies
- antd `Select`（multiple）。
- **命中计数**：`countFor`/`options[].count`＝当前结果集命中该值的行数，宿主算（原页从子表行统计）。
- **过滤应用**：把 `value` 作用到表格（"任一"命中即显示）由宿主做，组件只维护选择。
- 复用件 `dropdown-footer`(C8)；色点与 `judge-select`/`status-pill`/`progress-line` 共用 `--j-*` 令牌。

## 宿主需负责
- 声明 :root 令牌块（用 `--brand/--brand-bg/--line/--line-strong/--t1/--t3/--t4/--j-*`、`--r-small/--f-aux`）。
- 持有 `value`（如 `judgeFilter`/`reviewFilter`），并把选中值映射到被过滤数据。
- 提供状态枚举与配色（`--j-*`），与页面其它状态件一致。

## 注意
- 关原生右上角状态勾，用 sfs-chk 取代；面板样式在 `popupClassName` 作用域、颜色 `var()`。
- 已选 tag 为灰底（颜色在"色点"，非 tag 底色）——若产品要彩色 tag，属变体，另行确认，不改此定稿。
