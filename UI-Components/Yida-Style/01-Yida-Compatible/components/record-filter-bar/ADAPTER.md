# RecordFilterBar — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| filters | FilterDescriptor[] | 是 | 每项 {key,label,type,value[],onChange,options/history/countFor/matchMode…} |
| onClearAll | ()=>void | 是 | 清空全部筛选 |
| batch | {label,count,onClick,disabled?} | 否 | 第二行批量按钮；缺省不渲染 |
| selectWidth | number | 否 | 下拉等宽，**Default 按令牌=190** |
| clearDisabled | boolean | 否 | 缺省：任一 filter 有值即可用 |

## 输出 / 事件
- 各 filter `onChange(arr)`、关键词 `onMatchModeChange(mode)`、`batch.onClick`、`onClearAll`。

## External Dependencies
- **行级计数**：`options[].count` / `countFor(word)`＝当前数据集命中该值的行数（原页从子表行统计），宿主算。
- **过滤应用**：把各 filter 的 value 作用到表格行（任一/全部语义）由宿主完成，组件只收集条件。
- **批量写草稿**：`batch.onClick` 宿主改选中行判定/状态，不属组件。
- 复用件：`dropdown-footer`(C8)、`keyword-tag-search`(C9)、`corner-badge`(C6 计数胶囊)。

## 宿主需负责
- 声明 :root 令牌块；持有各 filter 的 value 与关键词 history（含 localStorage 持久化，若需要）。
- 提供 options/history 的数据；驱动被过滤表格的重渲染。
- 与记录卡头/表格同容器摆放（本条通常嵌在卡体顶部）。

## 注意
- 布局用 `grid: repeat(N,max-content) 1fr`（非 flex space-evenly，§4 定稿），`N=filters.length` 自动。
- 清除按钮右锚 `margin-right:32` 与卡头"撤销修改"中点对齐（照抄定位关系，勿挪）。
- 各下拉 `popupClassName` 可分别指定以避免同页面板串样式（默认共用 `rfb-pop`）。
