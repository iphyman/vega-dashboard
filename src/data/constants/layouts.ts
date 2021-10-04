const TRADE_LG_LAYOUT = [
  { i: "orderBook", x: 0, y: 0, w: 4, h: 2 },
  { i: "recentTrade", x: 4, y: 0, w: 3, h: 2 },
  { i: "chart", x: 7, y: 0, w: 5, h: 2 },
  { i: "openOrders", x: 0, y: 5, w: 10, h: 2 },
  { i: "depthChart", x: 10, y: 5, w: 10, h: 2 },
  { i: "positions", x: 0, y: 10, w: 10, h: 2 },
];

const TRADE_MD_LAYOUT = [
  { i: "orderBook", x: 0, y: 0, w: 5, h: 2 },
  { i: "recentTrade", x: 5, y: 0, w: 5, h: 2 },
  { i: "chart", x: 0, y: 10, w: 10, h: 2 },
  { i: "openOrders", x: 0, y: 0, w: 10, h: 2 },
  { i: "depthChart", x: 0, y: 5, w: 10, h: 2 },
  { i: "positions", x: 0, y: 0, w: 10, h: 2 },
];

const TRADE_SM_LAYOUT = [
  { i: "orderBook", x: 0, y: 0, w: 3, h: 2 },
  { i: "recentTrade", x: 3, y: 0, w: 3, h: 2 },
  { i: "chart", x: 0, y: 12, w: 6, h: 2 },
  { i: "openOrders", x: 0, y: 4, w: 6, h: 2 },
  { i: "depthChart", x: 2, y: 16, w: 6, h: 2 },
  { i: "positions", x: 0, y: 8, w: 6, h: 2 },
];

const TRADE_XS_LAYOUT = [
  { i: "orderBook", x: 0, y: 0, w: 2, h: 2 },
  { i: "recentTrade", x: 3, y: 0, w: 2, h: 2 },
  { i: "chart", x: 0, y: 12, w: 4, h: 2 },
  { i: "openOrders", x: 0, y: 4, w: 4, h: 2 },
  { i: "depthChart", x: 1, y: 10, w: 4, h: 2 },
  { i: "positions", x: 0, y: 14, w: 4, h: 2 },
];

export const TRADE_lAYOUT_BREAKPOINTS = {
  lg: 1090,
  md: 996,
  sm: 768,
  xs: 576,
  xss: 0,
};

export const TRADE_lAYOUT_COLUMNS = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xss: 2,
};

export const TRADE_GRID_LAYOUTS = {
  lg: TRADE_LG_LAYOUT,
  md: TRADE_MD_LAYOUT,
  sm: TRADE_SM_LAYOUT,
  xs: TRADE_XS_LAYOUT,
};
