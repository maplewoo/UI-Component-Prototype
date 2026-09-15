# ImagePasteUploader — ACCEPTANCE

- [ ] idle：112×28 蓝底白字"图片上传"，hover 底色变浅(#4096ff)；点击/Enter/Space → armed。
- [ ] armed：白底蓝字 + 左侧 6px 灯点随文字同色呼吸闪烁；文案 `Ctrl+V`；粘贴完成不退出、可连贴；失焦/Esc 复位。
- [ ] 粘贴仅取 `image/*`（回退 clipboardData.files），非图片忽略并 `preventDefault`。
- [ ] 达上限：`images.length>=limit` 时阻断并 `onLimitReached`，不追加、不报错崩。
- [ ] 缩略图：48×48 圆角 4 边框 #e8e8e8、横隙 16 纵隙 4、`margin-top:6`；`48+16+48=112` 与按钮等宽对齐。
- [ ] 删除 X：hover 右上角淡入 16×16 红底白 X（圆角 4、边框同图色、z-index:2），点 X＝`onRemove` 且不触发预览。
- [ ] 预览：点缩略图 antd `Image` 放大、悬停无遮罩、多图 PreviewGroup 成组。
- [ ] 只读态：仅缩略图、无按钮、无删除。
- [ ] disabled：不进入 armed、不显删除。
- [ ] 锚定盒：112 固定宽、`margin:0 auto` 居中，盒中点＝按钮中点；列宽拉伸时盒不变、整体居中、余数靠左。
- [ ] 令牌：颜色/尺寸写成 `var(--token,#字面)`，无裸写死；宿主无 `:root` 时按字面兜底仍正确。
- [ ] 真人 Ctrl+V 已计入：预览/Demo 用 objectURL 演示，不假装自动化可粘贴。
- [ ] 脱敏：包内无真实 appType/formUuid/字段ID(imageField…)/OSS 接口地址/Token/公司·人员名；图示与 URL 为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
