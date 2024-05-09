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
    symbol:string,
    rootSymbol:string ,
    state:string,
    typ:string,
    listing:string,
    front:string,
    expiry:string,
    settle:string,
    listedSettle:string,
    underlying:string,
    quoteCurrency:string,
    underlyingSymbol:string,
    reference:string,
    referenceSymbol:string,
    maxOrderQty: number,
    maxPrice:number,
    lotSize:number,
    tickSize:number,
    multiplier:number
    settlCurrency:string,
    underlyingToSettleMultiplier:number,
    isQuanto: boolean,
    isInverse: boolean,
    initMargin:number,
    maintMargin:number,
    riskLimit:number,
    riskStep:number,
    limit:number,
    taxed: boolean,
    deleverage: boolean,
    makerFee:number,
    takerFee:number,
    settlementFee:number,
    prevClosePrice:number,
    limitDownPrice:number,
    limitUpPrice:number,
    prevTotalVolume:number,
    totalVolume:number,
    volume:number,
    volume24h:number,
    prevTotalTurnover:number,
    totalTurnover:number,
    turnover:number,
    turnover24h:number,
    homeNotional24h:number,
    foreignNotional24h:number,
    prevPrice24h:number
    lastPrice:number,
    lastPriceProtected:number,
    lastTickDirection:string,
    lastChangePcnt:number,
    hasLiquidity: boolean,
    openInterest:number,
    openValue:number,
    fairBasis:number,
    fairPrice:number,
    markMethod:string,
    markPrice:number,
    indicativeSettlePrice:number,
    settledPrice:number,
    instantPnl: boolean,
    timestamp:string,
    capped: boolean,
  };

export type TupdatedTradeData = [string, number, number, number, number];
