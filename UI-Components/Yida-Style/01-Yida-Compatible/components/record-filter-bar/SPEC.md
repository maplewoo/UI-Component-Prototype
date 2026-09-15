# RecordFilterBar — SPEC

## 0 · 令牌取值约定（Token Defaults）
本条取色/尺寸/字号/圆角/阴影/间距一律引用 `../design-tokens.md`，实现写成 `var(--token, 兜底字面值)`、不裸写死。有覆盖入口（props）标 `Default 按令牌`；无覆盖入口的布局/结构规则标 `MANDATORY`。下拉面板子件令牌见 `dropdown-footer`/`keyword-tag-search`。

## Purpose
一行式表格筛选栏：多个自定义面板多选 + 关键词标签 + 清除全部 + 一个批量操作按钮。descriptor 驱动，不写死具体筛选项。

## Structure
```
<div class="rfb-bar">
  <div class="rfb-row">                 // grid: repeat(N, max-content) 1fr; column-gap:24
    <div class="rfb-item"><span rfb-label>归属：</span><MultiFilter/></div>
    ... 自查状态 / 复查状态 / 检查内容关键词
    <div class="rfb-clear"><Button 清除筛选/></div>   // grid-column:last; justify-self:end; margin-right:32
  </div>
  <div class="rfb-actions"><Button 批量设为不适用+计数/></div>
</div>
```
每个子下拉复用 C8（多选：OptionCheck+OptionCount+DropdownFooter 清空）或 C9（关键词 tags）。

## States
- 无筛选：清除按钮 disabled。
- 有筛选：清除可用；批量按钮 `count>0` 才可用（`disabled` 由 `selectedCount` 决定）。
- 各下拉：默认/搜索（关键词 typed 提示）/选中态——同 C8/C9。

## Interaction Rules
- 每个 filter 受控：`value[]` 由宿主持有，`onChange(arr)` 上抛。
- 清除全部 → `onClearAll()`（宿主清空各 filter）。
- 批量按钮 → `batch.onClick()`（宿主写草稿/应用）。
- 关键词任一/全部模式：`matchMode`+`onMatchModeChange` 上抛（C9）。
- 组件不做过滤计算、不改数据（见 External）。

## Visual Rules
- 行 `display:grid; grid-template-columns:repeat(N,max-content) 1fr; column-gap:24px; align-items:center; padding:12px 0; border-bottom:1px solid --line`（**MANDATORY** §4"整行 grid 左对齐、间隙 24"；`N`=filters 数）。
- item `display:flex; align-items:center; min-width:max-content`；label `--f-body`/500/`--t2`、`white-space:nowrap`（**MANDATORY 标签紧贴下拉**）。
- 下拉等宽 **190**、`margin-left:6`（**Default 按令牌**：§4 定稿 190，可经 `selectWidth` 覆盖）；`maxTagCount:'responsive'`。
- 清除筛选：`grid-column` 落最后一条 `1fr`、`justify-self:end`、`margin-right:32`（**MANDATORY** §4"清除锚本行最右端、右缩 32"，与卡头撤销中点对齐）。
- 第二行 `.rfb-actions` 左对齐、`padding:0 0 12`、下 1px `--line`；批量按钮 `type=primary` + 计数 `rfb-cnt`（复用 C6 按钮内胶囊）。
- 面板（portal）观感、勾选框、命中数、历史、色点全部同 C8/C9，字面/`var()` 写在 `popupClassName` 作用域。

## Data Contract
props：
- `filters: FilterDescriptor[]`，每项：
  - `{ key, label, type:'multi'|'keyword', value:string[], onChange(arr), placeholder?, showDot?, showCount?, tagRender?, popupClassName? }`
  - `multi`：`options:[{label,value,count?,color?}]`
  - `keyword`：`history:string[]`, `countFor(word)=>number`, `matchMode:'any'|'all'`, `onMatchModeChange`
- `onClearAll: ()=>void`
- `batch?: { label:string, count:number, onClick:()=>void, disabled?:boolean }`
- `selectWidth?: number`（**Default 按令牌=190**）
- `clearDisabled?: boolean`（缺省：任一 filter 有值即可用）

## External Dependencies
- **行级计数**：`options[].count` / `countFor(word)` = 当前数据集里命中该值的行数，由宿主算（原页从 `subformMap` 行统计）。
- **过滤应用**：把各 filter 的 `value` 作用到表格行（任一/全部语义）由宿主做，组件只收集条件。
- **批量写草稿**：`batch.onClick` 里宿主改选中行判定，不属组件。
- 复用件 `dropdown-footer`(C8)、`keyword-tag-search`(C9)、`corner-badge`(C6 计数胶囊)。

## Implementation Constraints
- 布局用 grid `max-content` 轨道而非 `space-evenly`（旧内核 flex 会塌，§4 定稿）。
- 每个下拉 `popupClassName` 唯一，避免同页多面板串样式；面板 portal → `var()`/字面色。

## Demo-Only Properties
- 具体筛选项（归属/自查/复查/关键词）、示例选项与计数、`selectWidth`、批量按钮文案。

## Migration Rules
- 原页 `renderFilterBar` + `cs-filter-*` / `cs-dd-foot` / `cs-kw-*` → `rfb-*` 组合 C8/C9。
- `ownerCount/contentCount` 统计、`displayRows` 过滤、`handleBatchNotApplicable`、各 `*Filter` state 全上移宿主。

## Boundary Conditions
- `filters` 为空：不渲染行（宿主可整条不渲染）。
- `batch` 缺省：不渲染第二行。
- 清除按钮：`clearDisabled` 未传时按"任一 filter 有值"自动判定。
