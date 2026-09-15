# FullscreenEditCard（可全屏编辑卡片 · Pattern）

类型：**Pattern**（卡片壳 + 全屏态切换 + 滚动锁 + Esc 退出 + 进入前复位吸顶）。

一张"可全屏编辑"的卡片：普通态内联在页面流里（内部滚动、`max-height`）；点头部全屏图标后 `position:fixed` 铺满视口（内缩 12、抬升阴影、`z-index` 覆盖工作台外壳），Esc 退出，期间锁 `body` 滚动。进入全屏前必须清零同列其它卡片的吸顶 `translateY`（否则 fixed 叠加位移、从视口顶偏）。

- 解决的问题：把"卡片全屏编辑 + Esc + 锁滚动 + 与整卡吸顶(P3)互斥复位"这套易踩坑的行为固化。
- 宜搭兼容版本：是（`01-Yida-Compatible`）。
- 当前版本：v0.1
- 关联：与 `scroll-pin-card`(P3，若提取) 互斥——进入全屏前复位其 transform。
