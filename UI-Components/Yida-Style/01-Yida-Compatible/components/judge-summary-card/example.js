// JudgeSummaryCard — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// Pattern：组合 progress-line + status-pill。此处内联两子件的最小版以自包含；真实页应复用 ../progress-line / ../status-pill 组件（单一来源）。
import React from 'react';
import { Card } from 'antd';

var jcStyles = `
  .jc-card .ant-card-head{min-height:40px;padding:8px 16px;background:var(--head-bg,#fafbfc);border-bottom:1px solid var(--line,#f0f0f0);}
  .jc-card .ant-card-head-title{padding:0;}
  .jc-card .ant-card-body{padding:12px 16px;}
  .jc-title{font-size:var(--f-sub,16px);font-weight:var(--fw-strong,600);color:var(--t1,rgba(0,0,0,.88));}
  .jc-total{font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));}
  .jc-progress{display:flex;align-items:center;gap:12px;margin-bottom:14px;}
  .jc-progress .pl-label{font-size:var(--f-body,14px);color:var(--t1,rgba(0,0,0,.88));}
  .jc-progress .pl-track{position:relative;flex:1 1 auto;height:14px;border-radius:99px;background:var(--track,#eef0f3);overflow:hidden;}
  .jc-progress .pl-track i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:var(--pc,var(--j-pass,#19c355));}
  .jc-progress .pl-pct{font-size:var(--f-title,20px);font-weight:var(--fw-strong,600);color:var(--pc,var(--j-pass,#19c355));min-width:52px;text-align:right;font-variant-numeric:tabular-nums;}
  .jc-pills{display:flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;overflow-x:auto;}
  .jc-pill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border:1px solid var(--line,#f0f0f0);border-radius:13px;background:#fff;flex:0 0 auto;cursor:default;}
  .jc-pill.click{cursor:pointer;}
  .jc-pill.click:hover{background:var(--fill-hover,#f5f7fa);}
  .jc-pill .dot{width:8px;height:8px;border-radius:50%;}
  .jc-pill .n{font-weight:var(--fw-strong,600);color:var(--t1,rgba(0,0,0,.88));font-variant-numeric:tabular-nums;}
  .jc-pill .lab{font-size:var(--f-aux,12px);color:var(--t3,rgba(0,0,0,.45));}
`;

function JudgeSummaryCard(props) {
  var items = props.items || [];
  var total = props.total != null ? props.total : items.reduce(function (s, it) { return s + (Number(it.count) || 0); }, 0);
  return (
    <Card className="jc-card" size="small"
      title={<span className="jc-title">{props.title}</span>}
      extra={<span className="jc-total">{'共 ' + total + ' 项'}</span>}>
      <style>{jcStyles}</style>
      <div className="jc-progress" style={{ '--pc': props.barColor || 'var(--j-pass,#19c355)' }}>
        <span className="pl-label">{props.rateLabel || '完成率'}</span>
        <span className="pl-track"><i style={{ width: Math.max(0, Math.min(100, Number(props.rate) || 0)) + '%' }} /></span>
        <span className="pl-pct">{(Number(props.rate) || 0)}%</span>
      </div>
      <div className="jc-pills">
        {items.map(function (it, i) {
          return (
            <span key={i} className={'jc-pill' + (props.onItemClick ? ' click' : '')} onClick={props.onItemClick ? function () { props.onItemClick(it); } : undefined}>
              <i className="dot" style={{ background: it.color || 'var(--j-pending-dot,#b0bec5)' }} />
              <b className="n">{Number(it.count) || 0}</b>
              <span className="lab">{it.shortLabel || it.label}</span>
            </span>
          );
        })}
      </div>
    </Card>
  );
}

// —— Demo：自查(绿)/复查(蓝) 两卡一行；rate/counts 由宿主算好（示例 mock）——
function JudgeSummaryCardDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <style>{jcStyles}</style>
      <JudgeSummaryCard title="自查判定" rate={74} barColor="var(--j-pass,#19c355)" items={[
        { label: '待定', count: 5, color: 'var(--j-pending-dot,#b0bec5)' },
        { label: '通过', count: 34, color: 'var(--j-pass,#19c355)' },
        { label: '带条件通过', shortLabel: '带条件', count: 2, color: 'var(--j-cond,#ffb300)' },
        { label: '不通过', count: 1, color: 'var(--j-fail,#f44336)' },
        { label: '不适用', count: 5, color: 'var(--j-na,#9e9e9e)' },
      ]} />
      <JudgeSummaryCard title="复查判定" rate={40} barColor="var(--brand,#1677ff)" items={[
        { label: '待定', count: 28, color: 'var(--j-pending-dot,#b0bec5)' },
        { label: '通过', count: 19, color: 'var(--j-pass,#19c355)' },
      ]} />
    </div>
  );
}

export { JudgeSummaryCard };
export default JudgeSummaryCardDemo;
