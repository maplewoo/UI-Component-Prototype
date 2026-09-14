// CornerBadge — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 无外部依赖。宿主按钮须 position:relative（corner 变体），见 ADAPTER.md。

var cornerBadgeStyles = `
  .corner-badge{font-variant-numeric:tabular-nums;}
  .corner-badge.corner{position:absolute;top:-8px;right:-8px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#F44336;color:#fff;font-size:12px;font-weight:500;line-height:18px;text-align:center;z-index:2;pointer-events:none;}
  .corner-badge.inline{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:rgba(255,255,255,0.28);color:#fff;font-size:12px;font-weight:500;line-height:1;margin-left:6px;}
`;

function CornerBadge(props) {
  var variant = props.variant || 'corner';
  var count = Number(props.count) || 0;
  var max = props.max || 99;
  var text = count > max ? (max + '+') : String(count);
  // corner：0 或禁用不渲染；inline：始终渲染
  if (variant === 'corner' && (props.disabled || count <= 0)) { return null; }
  return (
    <span className={'corner-badge ' + variant}>
      <style>{cornerBadgeStyles}</style>
      {text}
    </span>
  );
}

// —— Demo ——
function CornerBadgeDemo() {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
      <style>{cornerBadgeStyles}</style>
      <button style={{ position: 'relative', height: 32, padding: '0 15px', border: 0, borderRadius: 6, background: '#1677ff', color: '#fff', cursor: 'pointer' }}>
        保存修改<CornerBadge variant="corner" count={3} />
      </button>
      <button style={{ position: 'relative', height: 32, padding: '0 15px', border: 0, borderRadius: 6, background: '#1677ff', color: '#fff', cursor: 'pointer' }}>
        保存修改<CornerBadge variant="corner" count={0} />
      </button>
      <button style={{ height: 32, padding: '0 15px', border: 0, borderRadius: 6, background: '#1677ff', color: '#fff', cursor: 'pointer' }}>
        批量设为不适用<CornerBadge variant="inline" count={5} />
      </button>
    </div>
  );
}

export { CornerBadge };
export default CornerBadgeDemo;
