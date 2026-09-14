// InlineJumpPagination — 宜搭兼容参考实现（YidaCodeCanvas / .canvas.jsx）
// 规避 antd 无中文 locale：自绘"共 N 项 / 跳至 __ 页"。宿主把返回对象展开进 Table pagination。
import React, { useState } from 'react';
import { Input } from 'antd';

// 挂在宿主页给表格包的外层类 .ijp-wrap 下，避免全局污染。
export function JumpPaginationStyles() {
  return (
    <style>{`
      .ijp-wrap .ant-pagination{margin:12px 0 0;position:relative;padding-right:150px;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;}
      .ijp-wrap .ant-pagination-item,.ijp-wrap .ant-pagination-prev .ant-pagination-item-link,.ijp-wrap .ant-pagination-next .ant-pagination-item-link{height:28px;line-height:26px;border-radius:6px;}
      .ijp-wrap .ant-pagination-item a{line-height:26px;}
      .ijp-wrap .ant-pagination button,.ijp-wrap .ant-pagination input{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;}
      .ijp-jump{position:absolute;right:0;top:0;display:inline-flex;align-items:center;gap:6px;height:28px;line-height:28px;font-size:14px;font-weight:400;color:rgba(0,0,0,0.65);}
      .ijp-jump .ijp-input{width:48px;height:28px;padding:0 6px;text-align:center;font-variant-numeric:tabular-nums;}
    `}</style>
  );
}

export function useJumpPagination(cfg) {
  var current = cfg.current || 1;
  var pageSize = cfg.pageSize || 10;
  var total = Number(cfg.total) || 0;
  var maxPage = Math.max(1, Math.ceil(total / pageSize));
  var cur = Math.min(Math.max(1, current), maxPage);
  var jumpState = useState('');
  var jumpVal = jumpState[0], setJumpVal = jumpState[1];
  var hideJumpWhenEmpty = cfg.hideJumpWhenEmpty !== false;

  function goJump() {
    var n = parseInt(jumpVal, 10);
    if (!n || n < 1) { n = 1; }
    if (n > maxPage) { n = maxPage; }
    if (cfg.onChange) { cfg.onChange(n); }
    setJumpVal('');
  }

  var showJump = !(hideJumpWhenEmpty && total === 0);
  return {
    current: cur,
    pageSize: pageSize,
    showSizeChanger: false,
    showQuickJumper: false,
    onChange: cfg.onChange,
    showTotal: function () {
      return (
        <span>
          <span>{cfg.totalLabel ? cfg.totalLabel(total) : ('共 ' + total + ' 项')}</span>
          {showJump ? (
            <span className="ijp-jump">
              {'跳至'}
              <Input
                className="ijp-input"
                size="small"
                value={jumpVal}
                onChange={function (e) { setJumpVal(String(e.target.value || '').replace(/[^0-9]/g, '')); }}
                onPressEnter={goJump}
                onBlur={function () { setJumpVal(''); }}
              />
              {'页'}
            </span>
          ) : null}
        </span>
      );
    },
  };
}

// —— Demo ——
function JumpPaginationDemo() {
  var st = useState(1);
  var page = st[0], setPage = st[1];
  var pagination = useJumpPagination({ current: page, total: 47, pageSize: 10, onChange: setPage });
  return (
    <div className="ijp-wrap" style={{ maxWidth: 720, background: '#fff', padding: 16, borderRadius: 8 }}>
      <JumpPaginationStyles />
      <div style={{ padding: '8px 0' }}>第 {pagination.current} 页 / 共 5 页（示例行区）</div>
      {/* 真实用法：<Table pagination={pagination} .../>；此处示意 pagination 已就绪 */}
      <div>{pagination.showTotal(47)}</div>
    </div>
  );
}

export default JumpPaginationDemo;
