// FullscreenEditCard — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// Pattern：受控卡片壳 + 全屏态(fixed) + Esc + 锁 body 滚动 + 进入前复位兄弟卡 transform(宿主钩子)。
// 颜色/阴影/层级引用 design-tokens var(--token,#兜底)。图标内联 SVG，不引 @ant-design/icons。
import React, { useEffect } from 'react';
import { Card, Button } from 'antd';

var fcStyles = `
  .fc-card{border-radius:var(--r-card,8px);}
  .fc-card .ant-card-head{background:var(--head-bg,#fafbfc);border-bottom:1px solid var(--line,#f0f0f0);}
  .fc-card .ant-card-body{flex:1 1 auto;min-height:0;overflow:auto;}
  .fc-fs-btn{display:inline-flex;align-items:center;justify-content:center;}
`;

function ExpandIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" /></svg>;
}
function ExitIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" /></svg>;
}

function FullscreenEditCard(props) {
  var active = !!props.active;
  var inset = props.inset == null ? 12 : props.inset;

  useEffect(function () {
    if (!active) { return undefined; }
    var prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e) { if (e.key === 'Escape' && props.onActiveChange) { props.onActiveChange(false); } }
    window.addEventListener('keydown', onKey);
    return function () { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [active]);

  var normalStyle = { marginBottom: 14, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 72px)' };
  var fullStyle = { position: 'fixed', top: inset, left: inset, right: inset, bottom: inset, margin: 0, width: 'auto', zIndex: 950, background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - ' + (inset * 2) + 'px)' };

  function toggle() {
    if (!active) { if (props.onBeforeEnter) { props.onBeforeEnter(); } }
    if (props.onActiveChange) { props.onActiveChange(!active); }
  }

  var extra = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {props.extra}
      <Button type="text" size="small" className="fc-fs-btn" title={active ? (props.exitTitle || '退出全屏（Esc）') : (props.enterTitle || '全屏编辑')} icon={active ? <ExitIcon /> : <ExpandIcon />} onClick={toggle} />
    </span>
  );

  return (
    <Card className="fc-card" size="small" title={props.title} extra={extra} style={active ? fullStyle : normalStyle} styles={{ body: { padding: 16 } }}>
      <style>{fcStyles}</style>
      {props.children}
    </Card>
  );
}

// —— Demo：页面级同一时刻至多一张全屏；onBeforeEnter 复位兄弟吸顶 ——
function FullscreenEditCardDemo() {
  var state = React.useState('');
  var fs = state[0], setFs = state[1];
  function resetSiblings() {
    var cards = [].slice.call(document.querySelectorAll('.fc-card[data-fs-pin="1"]'));
    cards.forEach(function (c) { c.style.transform = ''; });
  }
  var rows = ['卡片 A', '卡片 B'];
  return (
    <div>
      <style>{fcStyles}</style>
      {rows.map(function (name) {
        return (
          <span key={name} data-fs-pin="1" style={{ display: 'block' }}>
            <FullscreenEditCard
              title={name} active={fs === name}
              onActiveChange={function (next) { setFs(next ? name : ''); }}
              onBeforeEnter={resetSiblings}
              extra={<Button type="primary" size="small">保存修改</Button>}
            >
              {name} 的内容区（长列表内部滚动）
            </FullscreenEditCard>
          </span>
        );
      })}
    </div>
  );
}

export { FullscreenEditCard };
export default FullscreenEditCardDemo;
