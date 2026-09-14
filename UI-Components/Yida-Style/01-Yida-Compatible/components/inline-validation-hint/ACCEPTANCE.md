# InlineValidationHint — ACCEPTANCE

- [ ] idle / 无文本：不渲染、不占位。
- [ ] loading：蓝，显"校验中…"。
- [ ] pass：绿 + 勾图标 + 理由。
- [ ] fail：红 + `!` + 详细理由，长文本换行不撑破列宽。
- [ ] required：红 + 短"必填"，与 fail 视觉可区分（一短一详）。
- [ ] info：灰中性提示。
- [ ] 各态 `margin-top:4px; font-size:12px` 一致，与上方字段贴合。
- [ ] 同色回应用到输入框边框（宿主侧）时，提示与控件色一致。
- [ ] `labels` 覆盖默认文案生效。
- [ ] 脱敏：包内无真实字段 ID / appType / 数据源 / 公司名 / 内部 URL / AI 接口地址；理由为 mock。
- [ ] 独立理解：凭 SPEC + preview + ADAPTER 可接入。
