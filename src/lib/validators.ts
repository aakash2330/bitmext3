export type TsymbolTradeData = {
  timestamp: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  trades: number;
  volume: number;
  vwap: number;
  lastSize: number;
  turnover: number;
  homeNotional: number;
  foreignNotional: number;
};

export type TsymbolData = {
  symbol: string;
  taxed: boolean;
  deleverage: boolean;
  hasLiquidity: boolean;
  instantPnl: boolean;
  timestamp: string;
  capped: boolean;
};

export type TupdatedTradeData = [string, number, number, number, number];
