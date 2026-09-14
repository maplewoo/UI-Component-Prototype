// SegmentedPill — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 受控分段切换 + 可选锁定。锁定判定与提示由宿主经 lockPredicate/onLockClick 注入。

var segStyles = `
  .seg-pill{position:relative;display:flex;padding:4px;background:#eef0f3;border-radius:10px;box-sizing:border-box;}
  .seg-thumb{position:absolute;top:4px;left:4px;bottom:4px;background:var(--sc,#1677ff);border-radius:6px;box-shadow:0 1px 3px rgba(16,24,40,0.15);transition:transform .28s cubic-bezier(.4,0,.2,1);z-index:0;}
  .seg-item{position:relative;z-index:1;flex:1 1 50%;text-align:center;border:0;background:transparent;cursor:pointer;font-size:16px;font-weight:600;color:rgba(0,0,0,0.88);padding:8px 12px;border-radius:6px;transition:color .28s ease;white-space:nowrap;font-family:inherit;}
  .seg-item.is-active{color:#fff;}
  .seg-item.is-locked{color:rgba(0,0,0,0.25);cursor:not-allowed;}
  .seg-pill :focus-visible{outline:2px solid var(--sc,#1677ff);outline-offset:2px;border-radius:4px;}
`;

function SegmentedPill(props) {
  var options = props.options || [];
  var idx = Math.max(0, options.map(function (o) { return o.value; }).indexOf(props.value));
  var n = options.length || 1;
  var lockedFn = props.lockPredicate || function () { return false; };
  return (
    <div className="seg-pill" role="tablist" style={{ '--sc': props.activeColor || '#1677ff', width: props.width || 360, maxWidth: '100%' }}>
      <style>{segStyles}</style>
      <span className="seg-thumb" style={{ width: 'calc((100% - 8px)/' + n + ')', transform: 'translateX(' + (idx * 100) + '%)' }} />
      {options.map(function (o) {
        var locked = lockedFn(o.value) && o.value !== props.value;
        var cls = 'seg-item' + (o.value === props.value ? ' is-active' : '') + (locked ? ' is-locked' : '');
        return (
          <button key={o.value} type="button" role="tab" aria-selected={o.value === props.value} className={cls}
            onClick={function () {
              if (locked) { if (props.onLockClick) { props.onLockClick(o.value); } return; }
              if (props.onChange) { props.onChange(o.value); }
            }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// —— Demo ——
function SegmentedPillDemo() {
  var st = React.useState('self');
  return (
    <SegmentedPill
      options={[{ value: 'self', label: '视图A' }, { value: 'review', label: '视图B' }]}
      value={st[0]}
      onChange={st[1]}
      lockPredicate={function (v) { return v !== st[0] && v === 'review' && st[0] === 'self' && window.__demoLock === true; }}
      onLockClick={function () { if (window.__demoToast) { window.__demoToast('当前有未保存的修改'); } }}
    />
  );
}

export { SegmentedPill };
export default SegmentedPillDemo;
