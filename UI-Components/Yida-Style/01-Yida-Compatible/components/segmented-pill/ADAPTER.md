# SegmentedPill — ADAPTER

## 输入（props）
| prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [{value,label}] | 是 | 分段集合 |
| value | string | 是 | 当前值（受控） |
| onChange | (value)=>void | 是 | 切换回调 |
| lockPredicate | (value)=>boolean | 否 | 判定某段是否锁定 |
| onLockClick | (value)=>void | 否 | 点击锁定段的回调（宿主放 Toast） |
| activeColor | string | 否 | 滑块/激活主色，默认 `#1677ff` |
| width | number\|'100%' | 否 | 默认 360 |

## 输出 / 事件
- `onChange(value)`：切到未锁定段。
- `onLockClick(value)`：点击锁定段（组件本身不提示、不切换）。

## External Dependencies
- 无直接依赖。锁定提示所需的 Toast/message、以及"哪个视图脏了"的状态源，均由宿主提供。

## 宿主需负责
- 维护 `value` 与各视图的脏状态；用 `lockPredicate` 表达"另一视图有未保存改动则锁定当前切换"这类规则。
- 切换后若需重算布局（如吸顶/滚动位置），在 `onChange` 里自行触发，组件不感知。
- 分段文案（自查/复查等角色名）是业务约定，不内置。
