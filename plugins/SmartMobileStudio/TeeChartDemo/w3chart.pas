(******************************************************************
  TeeChart for Smart Mobile Studio.
  Copyright (c) 2012-2014 by Steema Software. All Rights Reserved.
*************f*****************************************************)
unit W3Chart;

interface

uses 
  W3System, W3Graphics, W3Components, W3Ctrls, W3Lists;

type
  THandleBase = class
  protected
    FHandle: THandle;
  public
    Control: TW3CustomControl;

    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);

    procedure Repaint;

    property Handle: THandle read FHandle;
  end;

  THandleVisible = class(THandleBase)
  private
    function getVisible: Boolean;
    procedure setVisible(Value: Boolean);
  published
    property Visible: Boolean read getVisible write setVisible;
  end;

  TGradientDirection = (gdLeftRight, gdTopBottom, gdRightLeft, gdBottomTop,
    gdRadial, gdDiagonalUp, gdDiagonalDown);

  TGradient = class(THandleVisible)
  private
    function getDirection: TGradientDirection;
    procedure setDirection(const Value: TGradientDirection);
  public
    Colors: array of TColor;
    procedure Refresh(AControl: TW3CustomControl);
  published
    property Direction: TGradientDirection read getDirection write setDirection;
  end;

  TShadow = class(THandleVisible)
  private
    function getBlur: Float;
    function getColor: TColor;
    function getHeight: Float;
    function getWidth: Float;
    procedure setBlur(const Value: Float);
    procedure setColor(const Value: TColor);
    procedure setHeight(const Value: Float);
    procedure setWidth(const Value: Float);
  published
    property Blur: Float read getBlur write setBlur;
    property Color: TColor read getColor write setColor;
    property Height: Float read getHeight write setHeight;
    property Width: Float read getWidth write setWidth;
  end;

  TStrokeDash=(sdSolid, sdDot, sdDash, sdDotDot, sdDashDot);
  TStrokeJoin=(sjRound, sjMiter, sjBevel);
  TStrokeCap=(scSquare, scRound, scButt);

  TStroke = class(THandleBase)
  private
    FGradient: TGradient;

    function getColor: TColor;
    function getSize: Float;
    function getDash: TStrokeDash;
    procedure setColor(const Value: TColor);
    procedure setSize(const Value: Float);
    procedure setDash(const Value: TStrokeDash);
    function getCap: TStrokeCap;
    function getJoin: TStrokeJoin;
    procedure setCap(const Value: TStrokeCap);
    procedure setJoin(const Value: TStrokeJoin);
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);

  published
    property Color: TColor read getColor write setColor;
    property Gradient: TGradient read FGradient;
    property Size: Float read getSize write setSize;
    property Dash: TStrokeDash read getDash write setDash;
    property Join: TStrokeJoin read getJoin write setJoin;
    property Cap: TStrokeCap read getCap write setCap;
  end;

  TFont = class(THandleBase)
  private
    FGradient: TGradient;
    FShadow: TShadow;

    function getColor: TColor;
    function getSize: Float;
    function getStyle: String;
    function getBold: Boolean;
    function getItalic: Boolean;
    procedure setBold(const Value: Boolean);
    procedure setItalic(const Value: Boolean);
    procedure setColor(const Value: TColor);
    procedure setSize(const Value: Float);
    procedure setStyle(const Value: String);
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);

  published
    property Bold: Boolean read getBold write setBold;
    property Color: TColor read getColor write setColor;
    property Gradient: TGradient read FGradient;
    property Italic: Boolean read getItalic write setItalic;
    property Shadow: TShadow read FShadow;
    property Size: Float read getSize write setSize;
    property Family: String read getStyle write setStyle;
  end;

  TFormat = class(THandleBase)
  private
    FFont: TFont;
    FGradient: TGradient;
    FShadow: TShadow;
    FStroke: TStroke;

    function getColor: TColor;
    function getRoundX: Float;
    function getRoundY: Float;
    function getTransparency: Float;
    procedure setColor(const Value: TColor);
    procedure setRoundX(const Value: Float);
    procedure setRoundY(const Value: Float);
    procedure setTransparency(const Value: Float);
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);

  published
    property Color: TColor read getColor write setColor;
    property Font: TFont read FFont;
    property Gradient: TGradient read FGradient;
    property RoundX: Float read getRoundX write setRoundX;
    property RoundY: Float read getRoundY write setRoundY;
    property Shadow: TShadow read FShadow;
    property Stroke: TStroke read FStroke;
    property Transparency: Float read getTransparency write setTransparency;
  end;

  TBase = class(THandleVisible)
  private
    FFormat: TFormat;
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);
  published
    property Format: TFormat read FFormat;
  end;

  TSeries = class; // abstract

  TMarksStyle=(msAuto, msValue, msPercent, msPercentLabel, msValueLabel, 
    msLabel, msIndex, msLabelValue, msLabelPercent);

  TMarks = class(TBase)
  private
    FArrow: TStroke;

    FSeries : TSeries;
    function getDrawEvery: Integer;
    function getTextStyle: TMarksStyle;
    procedure setDrawEvery(const Value: Integer);
    procedure setTextStyle(const Value: TMarksStyle);
  public
    constructor Create(ASeries: TSeries);
  published
    property Arrow: TStroke read FArrow;
    property DrawEvery: Integer read getDrawEvery write setDrawEvery;
    property TextStyle: TMarksStyle read getTextStyle write setTextStyle;
  end;

  TColorArray = array of TColor;

  TSeriesColorEach=(ceAuto, ceYes, ceNo);

  TSeriesData = class(THandleBase)
  private
    FColors: TColorArray;
    FLabels: TStrArray;
    FValues: TFloatArray;
    FX: TFloatArray;

    FSeries: TSeries;

    procedure Refresh;
    procedure SetColors(const Value: TColorArray);
    procedure SetLabels(const Value: TStrArray);
    procedure SetValues(const Value: TFloatArray);
    procedure SetX(const Value: TFloatArray);
  public
    constructor Create(ASeries: TSeries);

    procedure Clear;
    procedure Add(const Value: Float; Label: String = '');
    procedure Assign(const Value: TSeriesData);

    property Colors: TColorArray read FColors write SetColors;
    property Labels: TStrArray read FLabels write SetLabels;
    property Values: TFloatArray read FValues write SetValues;
    property X: TFloatArray read FX write SetX;
  end;

  THover = class(TFormat)
  private
    function getEnabled: Boolean;
    procedure setEnabled(const Value: Boolean);
  published
    property Enabled: Boolean read getEnabled write setEnabled;
  end;

  TW3Chart = class;

  TSeries = class(TBase) // abstract
  private
    FData: TSeriesData;
    FHover: THover;
    FMarks: TMarks;

    function getColorEach: TSeriesColorEach;
    procedure setColorEach(const Value: TSeriesColorEach);
    function getTitle: String;
    procedure setTitle(const Value: String);
    function getChart: TW3Chart;
    procedure PrepareColors;
  protected
    procedure InternalClear; virtual;
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);
    destructor Destroy; override;

    procedure Clear;
    function Count: Integer;
    procedure FillSampleValues(Count: Integer = 4);
    procedure RefreshData;

    property Chart: TW3Chart read getChart;
    property Data: TSeriesData read FData write FData;

  published
    property ColorEach: TSeriesColorEach read getColorEach write setColorEach;
    property Hover: THover read FHover;
    property Marks: TMarks read FMarks;
    property Title: String read getTitle write setTitle;
  end;

  TBarStacked = (bsNo, bsYes, bs100, bsSideAll, bsSelf);

  TBarStyle = (bsBar, bsEllipse, bsLine);
  
  TCustomBarSeries = class(TSeries)
  private
    function getStacked: TBarStacked;
    function getBarSize: Float;
    function getBarStyle: TBarStyle;
    function getOrigin: Float;
    function getSideMargins: Float;
    function getUseOrigin: Boolean;
    procedure setBarSize(const Value: Float);
    procedure setBarStyle(const Value: TBarStyle);
    procedure setOrigin(const Value: Float);
    procedure setSideMargins(const Value: Float);
    procedure setStacked(const Value: TBarStacked);
    procedure setUseOrigin(const Value: Boolean);
  published
    property BarSize: Float read getBarSize write setBarSize;
    property BarStyle: TBarStyle read getBarStyle write setBarStyle;
    property Origin: Float read getOrigin write setOrigin;
    property SideMargins: Float read getSideMargins write setSideMargins;
    property Stacked: TBarStacked read getStacked write setStacked;
    property UseOrigin: Boolean read getUseOrigin write setUseOrigin;
  end;

  TBarSeries = class(TCustomBarSeries)
  public
    constructor Create;
  end;

  TSeriesSort = (ssValues, ssLabels);

  TPieSeries = class(TSeries)
  private
    function getOrderAscending: Boolean;
    function getRotation: Float;
    function getSort: TSeriesSort;
    procedure setOrderAscending(const Value: Boolean);
    procedure setRotation(const Value: Float);
    procedure setSort(const Value: TSeriesSort);
  protected
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle); overload;
  public
    constructor Create; overload;

    // property Explode: array of Float;
  published
    property OrderAscending: Boolean read getOrderAscending write setOrderAscending;
    property Rotation: Float read getRotation write setRotation;
    property Sort: TSeriesSort read getSort write setSort;
  end;

  TPointerStyle = (psRectangle, psEllipse, psTriangle, psDiamond, 
    psDownTriangle, psCross, psX);

  TSeriesPointer = class(TBase)
  private
    function getColorEach: Boolean;
    function getHeight: Float;
    function getStyle: TPointerStyle;
    function getWidth: Float;
    procedure setColorEach(const Value: Boolean);
    procedure setHeight(const Value: Float);
    procedure setStyle(const Value: TPointerStyle);
    procedure setWidth(const Value: Float);
  published
    property ColorEach: Boolean read getColorEach write setColorEach;
    property Height: Float read getHeight write setHeight;
    property Style: TPointerStyle read getStyle write setStyle;
    property Width: Float read getWidth write setWidth;
  end;

  TCustomStacked=(csYes, cs100, csNo);

  TCustomSeries = class(TSeries)
  private
    FPointer: TSeriesPointer;
    function getSmooth: Float;
    procedure setSmooth(const Value: Float);
    function getCustomStacked: TCustomStacked;
    function getOrigin: Float;
    procedure setCustomStacked(const Value: TCustomStacked);
    procedure setOrigin(const Value: Float);
    function getStairs: Boolean;
    function getUseOrigin: Boolean;
    procedure setStairs(const Value: Boolean);
    procedure setUseOrigin(const Value: Boolean);
  protected
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);
  published
    property Origin: Float read getOrigin write setOrigin;
    property Pointer: TSeriesPointer read FPointer;
    property Smooth: Float read getSmooth write setSmooth;
    property Stacked: TCustomStacked read getCustomStacked write setCustomStacked;
    property Stairs: Boolean read getStairs write setStairs;
    property UseOrigin: Boolean read getUseOrigin write setUseOrigin;
  end;

  TLineSeries = class(TCustomSeries)
  public
    constructor Create;
  end;

  TPointXYSeries = class(TCustomSeries)
  public
    constructor Create;
  end;

  TAreaSeries = class(TCustomSeries)
  public
    constructor Create;
  end;

  THorizBarSeries = class(TCustomBarSeries)
  public
    constructor Create;
  end;

  THorizAreaSeries = class(TCustomSeries)
  public
    constructor Create;
  end;

  TDonutSeries = class(TPieSeries)
  private
    function getHole: Float;
    procedure setHole(const Value: Float);
  public
    constructor Create;
  published
    property Hole: Float read getHole write setHole;
  end;

  TBubbleSeries = class(TCustomSeries)
  public
    constructor Create;
  end;

  TCandleSeries = class(TSeries)
  public
    constructor Create;
  end;

  TSmoothLineSeries = class(TLineSeries)
  public
    constructor Create;
  end;

  TLegendSymbol = class(TBase)
  private
    function getHeight: Float;
    function getWidth: Float;
    procedure setHeight(const Value: Float);
    procedure setWidth(const Value: Float);
  published
    property Height: Float read getHeight write setHeight;
    property Width: Float read getWidth write setWidth;
  end;

  TLegendPosition = (lpTop, lpRight, lpLeft, lpBottom, lpCustom);
  TLegendStyle = (lsAuto, lsSeries, lsValues);
  TLegendTextStyle = (tsAuto, tsValueLabel, tsLabel, tsValue, tsPercent,
    tsIndex, tsLabelValue, tsPercentLabel);

  TLegend = class(TBase)
  private
    FDividing: TStroke;
    FSymbol: TLegendSymbol;

    function getInverted: Boolean;
    function getLegendStyle: TLegendStyle;
    function getPadding: Float;
    function getPosition: TLegendPosition;
    function getTextStyle: TLegendTextStyle;
    function getTitle: String;

    procedure setTitle(const Value: String);
    procedure setInverted(const Value: Boolean);
    procedure setLegendStyle(const Value: TLegendStyle);
    procedure setPadding(const Value: Float);
    procedure setPosition(const Value: TLegendPosition);
    procedure setTextStyle(const Value: TLegendTextStyle);
  public
    constructor Create(AChart: TW3Chart; const AHandle: THandle);
  published
    property Dividing: TStroke read FDividing;
    property Inverted: Boolean read getInverted write setInverted;
    property LegendStyle: TLegendStyle read getLegendStyle write setLegendStyle;
    property Padding: Float read getPadding write setPadding;
    property Position: TLegendPosition read getPosition write setPosition;
    property Symbol: TLegendSymbol read FSymbol;
    property TextStyle: TLegendTextStyle read getTextStyle write setTextStyle;
    property Title: String read getTitle write setTitle;
  end;

  TMargins = class(THandleBase)
  private
    function getBottom: Float;
    function getLeft: Float;
    function getRight: Float;
    function getTop: Float;
    procedure setBottom(const Value: Float);
    procedure setLeft(const Value: Float);
    procedure setRight(const Value: Float);
    procedure setTop(const Value: Float);
  published
    property Left: Float read getLeft write setLeft;
    property Top: Float read getTop write setTop;
    property Right: Float read getRight write setRight;
    property Bottom: Float read getBottom write setBottom;
  end;

  TTextFormat = class(TBase)
  private
    FMargins: TMargins;
    function getText: String;
    procedure setText(const Value: String);
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);
  published
    property Margins: TMargins read FMargins;
    property Text: String read getText write setText;
  end;

  TTitle = class(TTextFormat)
  end;

  TPanel = class(TBase)
  private
    FMargins: TMargins;

    function getTransparent: Boolean;
    procedure setTransparent(Value: Boolean);
  public
    constructor Create(AChart: TW3Chart; const AHandle: THandle);
  published
    property Margins: TMargins read FMargins;
    property Transparent: Boolean read getTransparent write setTransparent;
  end;

  TAxisGrid = class(TBase)
  end;

  TTicks = class(THandleVisible)
  private
    FStroke: TStroke;
    function getLength: Float;
    procedure setLength(const Value: Float);
  published
    property Length: Float read getLength write setLength;
    property Stroke: TStroke read FStroke;
  end;

  TAxisLabelStyle = (alAuto, alNone, alValue, alMark, alText, alX);

  TAxisLabels = class(TBase)
  private
    function getAlternate: Boolean;
    function getDateFormat: String;
    function getDecimals: Integer;
    function getLabelStyle: TAxisLabelStyle;
    function getPadding: Float;
    function getRotation: Float;
    function getSeparation: Float;
    procedure setAlternate(const Value: Boolean);
    procedure setDateFormat(const Value: String);
    procedure setDecimals(const Value: Integer);
    procedure setLabelStyle(const Value: TAxisLabelStyle);
    procedure setPadding(const Value: Float);
    procedure setRotation(const Value: Float);
    procedure setSeparation(const Value: Float);
  published
    property Alternate: Boolean read getAlternate write setAlternate;
    property DateFormat: String read getDateFormat write setDateFormat;
    property Decimals: Integer read getDecimals write setDecimals;
    property LabelStyle: TAxisLabelStyle read getLabelStyle write setLabelStyle;
    property Padding: Float read getPadding write setPadding;
    property Rotation: Float read getRotation write setRotation;
    property Separation: Float read getSeparation write setSeparation;
  end;

  TAxisTitle = class(TTextFormat)
  end;

  TAxis = class(THandleBase)
  private
    FGrid: TAxisGrid;
    FInnerTicks: TTicks;
    FTicks: TTicks;
    FMinorTicks: TTicks;
    FLabels: TAxisLabels;
    FTitle: TAxisTitle;

    function getAutomatic: Boolean;
    function getIncrement: Float;
    function getInverted: Boolean;
    function getMaximum: Float;
    function getMinimum: Float;
    function getPosition: Float;

    procedure setAutomatic(const Value: Boolean);
    procedure setIncrement(const Value: Float);
    procedure setInverted(const Value: Boolean);
    procedure setMaximum(const Value: Float);
    procedure setMinimum(const Value: Float);
    procedure setPosition(const Value: Float);
  public
    constructor Create(AControl: TW3CustomControl; const AHandle: THandle);

  published
    property Automatic: Boolean read getAutomatic write setAutomatic;
    property Grid: TAxisGrid read FGrid;
    property Increment: Float read getIncrement write setIncrement;
    property InnerTicks: TTicks read FInnerTicks;
    property Inverted: Boolean read getInverted write setInverted;
    property Labels: TAxisLabels read FLabels;
    property Maximum: Float read getMaximum write setMaximum;
    property Minimum: Float read getMinimum write setMinimum;
    property MinorTicks: TTicks read FMinorTicks;
    property Position: Float read getPosition write setPosition;
    property Ticks: TTicks read FTicks;
    property Title: TAxisTitle read FTitle;
  end;

  TAxes = class(THandleVisible)
  private
    FTop: TAxis;
    FLeft: TAxis;
    FRight: TAxis;
    FBottom: TAxis;
  public
    constructor Create(AChart: TW3Chart; const AHandle: THandle);
  published
    property Left: TAxis read FLeft;
    property Top: TAxis read FTop;
    property Right: TAxis read FRight;
    property Bottom: TAxis read FBottom;
  end;

  TTool = class(THandleBase)
  end;

  TPoint = class(THandleBase)
  private
    function getX: Float;
    function getY: Float;
    procedure setX(const Value: Float);
    procedure setY(const Value: Float);
  published
    property X: Float read getX write setX;
    property Y: Float read getY write setY;
  end;

  TAnnotation = class(TTool)
  private
    function getMargins: TMargins;
    function getPosition: TPoint;
    procedure setMargins(Value: TMargins);
    procedure setPosition(Value: TPoint);
  public
    constructor Create;
  published
    property Margins: TMargins read getMargins write setMargins;
    property Position: TPoint read getPosition write setPosition;
  end;

  TDragTool = class(TTool)
  public
    constructor Create;
  end;

  TCursorTool = class(TTool)
  public
    constructor Create;
  end;

  TToolTip = class(TTool)
  public
    constructor Create;
  end;

  TAnimation = class(TTool)
  public
    constructor Create;
  end;

  TChartList = class
  protected
    FList : TObjectList;
    FChart : TW3Chart;
  public
    constructor Create(AChart: TW3Chart);
    Destructor Destroy; override;

    function Count: Integer;
  end;

  TToolsList = class(TChartList)
  private
    function getItem(Index: Integer): TTool;
    procedure setItem(Index: Integer; Value: TTool);
  public
    procedure Clear;
    procedure Remove(const Index: Integer); overload;
    procedure Remove(ATool: TTool); overload;

    property Item[Index: Integer]: TTool read getItem write setItem; default;
  end;

  TSeriesList = class(TChartList)
  private
    function getItem(Index: Integer): TSeries;
    procedure setItem(Index: Integer; Value: TSeries);
  public
    procedure Clear;
    procedure Remove(const Index: Integer); overload;
    procedure Remove(ASeries: TSeries); overload;

    property Item[Index: Integer]: TSeries read getItem write setItem; default;
  end;

  TWall = class(TBase)
  end;

  TWalls = class(THandleBase)
  private
    FBack: TWall;
    FLeft: TWall;
    FRight: TWall;
    FBottom: TWall;
  public
    constructor Create(AChart: TW3Chart; const AHandle: THandle);
  published
    property Left: TWall read FLeft;
    property Back: TWall read FBack;
    property Bottom: TWall read FBottom;
    property Right: TWall read FRight;
  end;

  TZoomScroll = class(THandleBase)
  private
    function getActive: Boolean;
    function getEnabled: Boolean;
    function getMouseButton: TMouseButton;
    procedure setEnabled(const Value: Boolean);
    procedure setMouseButton(const Value: TMouseButton);
  public
    property Active: Boolean read getActive;  // read only
  published
    property Enabled: Boolean read getEnabled write setEnabled;
    property MouseButton: TMouseButton read getMouseButton write setMouseButton;
  end;

  TScrollDirection = (sdHorizontal, sdVertical, sdBoth);

  TScroll = class(TZoomScroll)
  private
    function getDirection: TScrollDirection;
    procedure setDirection(const Value: TScrollDirection);
  published
    property Direction: TScrollDirection read getDirection write setDirection;
  end;

  TZoom = class(TZoomScroll)
  end;

  TW3Chart = class(TW3GraphicControl)
  protected
   FChart: THandle;

   FAxes   : TAxes;
   FLegend : TLegend;
   FSeries : TSeriesList;
   FTitle  : TTitle;
   FFooter : TTitle;
   FPanel  : TPanel;
   FTools  : TToolsList;
   FScroll : TScroll;
   FWalls  : TWalls;
   FZoom   : TZoom;

   procedure InitializeObject; override;
   procedure FinalizeObject; override;
   procedure Paint; override;

   function getSeries(Index: Integer): TSeries;
  public
   function AddSeries(ASeries: TSeries): TSeries;
   function AddTool(ATool: TTool): TTool;
   procedure RemoveSeries(ASeries: TSeries);
   procedure RemoveTool(ATool: TTool);

   property Item[Index: Integer]: TSeries read getSeries; default;

  //published
   property Axes   : TAxes read FAxes;

   // Note: "Zoom" name cannot be used. It is already an inherited property.
   property AxesZoom : TZoom read FZoom; 

   property Footer : TTitle read FFooter;
   property Legend : TLegend read FLegend;
   // property Palette:
   property Panel  : TPanel read FPanel;
   property Scroll : TScroll read FScroll;
   property Series : TSeriesList read FSeries;
   property Title  : TTitle read FTitle;
   property Tools  : TToolsList read FTools;
   property Walls  : TWalls read FWalls;
  end;

implementation

  {$R 'file:teechart-min.js'}
  {$R 'file:teechart-extras-min.js'}

{ THandleBase }

procedure THandleBase.Repaint;
begin
  if Assigned(Control) then
     Control.Invalidate;
end;

{ TStroke }

constructor TStroke.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).gradient; end;
  FGradient := TGradient.Create(AControl,h);
end;

function TStroke.getColor: TColor;
var s : String;
begin
  asm (@s)=(@self).FHandle.fill; end;
  Result := StrToColor(s);
end;

function TStroke.getSize: Float;
begin
  asm @Result=(@self).FHandle.size; end;
end;

function TStroke.getDash: TStrokeDash;
begin
  asm @Result=(@self).FHandle.dash; end;
end;

procedure TStroke.setColor(const Value: TColor);
var s : String;
begin
  s := ColorToWebStr(Value);
  asm (@FHandle).fill=(@s); end;
end;

procedure TStroke.setSize(const Value: Float);
begin
  asm (@FHandle).size=@Value; end;
end;

procedure TStroke.setDash(const Value: TStrokeDash);
begin
  asm (@FHandle).dash=@Value; end;
end;

{ TMarks }

constructor TMarks.Create(ASeries: TSeries);
var m : THandle;
begin
  asm  @m=(@ASeries.FHandle).marks; end;
  inherited Create(ASeries.Chart, m);
  FSeries := ASeries;
end;

{ TSeriesData }

constructor TSeriesData.Create(ASeries: TSeries);
var m : THandle;
begin
  asm  @m=(@ASeries.FHandle).data; end;
  inherited Create(ASeries.Chart, m);
  FSeries := ASeries;
end;

procedure TSeriesData.Clear;
begin
  FSeries.Clear;
end;

procedure TSeriesData.Add(const Value: Float; Label: String = '');
begin
  FValues.Add(Value);
  FLabels.Add(Label);
  FSeries.Repaint;
end;

procedure TSeriesData.Assign(const Value: TSeriesData);
begin
  FValues:=Value.FValues;
  FLabels:=Value.FLabels;
  FColors:=Value.FColors;
  FX:=Value.FX;
end;

procedure TSeriesData.SetColors(const Value: TColorArray);
begin
  FColors := Value;
  FSeries.PrepareColors;
end;

procedure TSeriesData.SetLabels(const Value: TStrArray);
begin
  FLabels := Value;

  asm (@Self.FHandle).labels=((@FLabels)); end;
end;

procedure TSeriesData.SetValues(const Value: TFloatArray);
begin
  FValues := Value;

  asm (@Self.FHandle).values=((@FValues)); end;
end;

procedure TSeriesData.Refresh;
begin
  asm (@Self.FHandle).values=((@FValues)); end;
  //asm (@Self.FHandle).x=((@FX)); end;
  asm (@Self.FHandle).labels=((@FLabels)); end;

  FSeries.PrepareColors;
end;

procedure TSeriesData.SetX(const Value: TFloatArray);
begin
  FX := Value;

  asm (@Self.FHandle).x=((@FX)); end;
end;

{ TSeries }

constructor TSeries.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  FMarks := TMarks.Create(Self);
  FData := TSeriesData.Create(Self);

  asm @h = (@Self.FHandle).hover; end;
  FHover := THover.Create(AControl,h);
end;

destructor TSeries.Destroy;
var tmp : TW3Chart;
begin
  tmp:=Chart;

  if Assigned(tmp) then
     tmp.RemoveSeries(Self);
     
  inherited;
end;

procedure TSeries.InternalClear;
begin
  asm
    (@Self.FHandle).data.values=[];
    (@Self.FHandle).data.labels=[];
    (@Self.FHandle).data.colors=null;
    (@Self.FHandle).data.x=null;
  end;
end;

procedure TSeries.RefreshData;
begin
  InternalClear;
  FData.Refresh;
  Repaint;
end;

function TSeries.Count: Integer;
begin
  asm @Result = (@Self.FHandle).count(); end;
end;

procedure TSeries.Clear;
begin
  InternalClear;
  Repaint;
end;

function TSeries.getChart: TW3Chart;
begin
  Result := TW3Chart(Control);
end;

function TSeries.getColorEach: TSeriesColorEach;
var 
  s: String;
begin
  asm @s = (@self.FHandle).colorEach; end;

  if s='auto' then Result := ceAuto else
  if s='yes' then Result := ceYes else Result := ceNo;
end;

procedure TSeries.setColorEach(const Value: TSeriesColorEach);
var 
  s: String;
begin
  if ColorEach<>Value then
  begin
    if Value=ceAuto then s := 'auto' else
    if Value=ceYes then s := 'yes' else
       s := 'no';

    asm (@self.FHandle).colorEach=@s; end;

    Repaint;
  end;
end;

procedure TSeries.fillSampleValues(Count: Integer);
begin
  asm (@self.FHandle).addRandom((@Count)); end;
end;

procedure TSeries.PrepareColors;
var tmp : Array of String;
    t,l : Integer;
begin
  l:=FData.FColors.Length;

  if l>0 then
  begin
    tmp.SetLength(l);

    for t:=0 to l-1 do
        tmp[t]:=ColorToWebStr(FData.FColors[t]);

    asm (@Self.FHandle).palette.colors=((@tmp)); end;
  end;
end;

{ TChartList }

constructor TChartList.Create(AChart: TW3Chart);
begin
  inherited Create;
  FChart := AChart;
  FList := TObjectList.Create;
end;

Destructor TChartList.Destroy;
begin
  FList.Free;
  inherited;
end;

function TChartList.Count: Integer;
begin
  Result := FList.Count;
end;

{ TToolsList }

function TToolsList.getItem(Index: Integer): TTool;
begin
  Result := TTool(FList.Items[Index]);
end;

procedure TToolsList.setItem(Index: Integer; Value: TTool);
begin
  FList[Index] := Value;
end;

procedure TToolsList.Clear;
var C : THandle;
begin
  FList.Clear;

  C := FChart.FChart;
  asm (@C).tools.items = []; end;

  FChart.Invalidate;
end;

procedure TToolsList.Remove(const Index: Integer); 
begin
  Remove(Item[Index]);
end;

procedure TToolsList.Remove(ATool: TTool);
begin
  FChart.RemoveTool(ATool);
end;

{ TSeriesList }

procedure TSeriesList.Clear;
var C : THandle;
begin
  FList.Clear;

  C := FChart.FChart;
  asm (@C).series.items = []; end;

  FChart.Invalidate;
end;

function TSeriesList.getItem(Index: Integer): TSeries;
begin
  Result := TSeries(FList.Items[Index]);
end;

procedure TSeriesList.setItem(Index: Integer; Value: TSeries);
begin
  FList[Index] := Value;
end;

procedure TSeriesList.Remove(const Index: Integer);
begin
  Remove(Item[Index]);
end;

procedure TSeriesList.Remove(ASeries: TSeries);
begin
  FChart.RemoveSeries(ASeries);
end;

{ TCustomBarSeries }

function TCustomBarSeries.getBarSize: Float;
begin
  asm @Result = (@FHandle).barSize; end;
end;

function TCustomBarSeries.getBarStyle: TBarStyle;
var s : String;
begin
  asm @s = (@FHandle).barStyle; end;

  if s='bar' then Result := bsBar else
  if s='ellipse' then Result := bsEllipse else
     Result := bsLine;
end;

function TCustomBarSeries.getOrigin: Float;
begin
  asm @Result = (@FHandle).origin; end;
end;

function TCustomBarSeries.getSideMargins: Float;
begin
  asm @Result = (@FHandle).sideMargins; end;
end;

function TCustomBarSeries.getStacked: TBarStacked;
var s:String;
begin
  asm @s = (@Self.FHandle).stacked; end;

  if s='no' then Result := bsNo else
  if s='yes' then Result := bsYes else
  if s='100' then Result := bs100 else
  if s='sideAll' then Result := bsSideAll else
     Result := bsSelf;
end;

function TCustomBarSeries.getUseOrigin: Boolean;
begin
  asm @Result = (@FHandle).useOrigin; end;
end;

procedure TCustomBarSeries.setBarSize(const Value: Float);
begin
  asm (@FHandle).barSize=@Value; end;
end;

procedure TCustomBarSeries.setBarStyle(const Value: TBarStyle);
begin
  case Value of
    bsBar:  asm (@FHandle).barStyle='bar'; end;
    bsEllipse: asm (@FHandle).barStyle='ellipse'; end;
  else
    asm (@FHandle).barStyle='line'; end;
  end;
end;

procedure TCustomBarSeries.setOrigin(const Value: Float);
begin
  asm (@FHandle).origin=@Value; end;
end;

procedure TCustomBarSeries.setSideMargins(const Value: Float);
begin
  asm (@FHandle).sideMargins=@Value; end;
end;

procedure TCustomBarSeries.setStacked(const Value: TBarStacked);
begin
  if Value<>getStacked then
  begin
    if Value=bsNo then
       asm (@Self.FHandle).stacked="no"; end
    else
    if Value=bsYes then
       asm (@Self.FHandle).stacked="yes"; end
    else
    if Value=bs100 then
       asm (@Self.FHandle).stacked="100"; end
    else
    if Value=bsSideAll then
       asm (@Self.FHandle).stacked="sideAll"; end
    else
       asm (@Self.FHandle).stacked="self"; end;

    Repaint;
  end;
end;

{ TBarSeries }

constructor TBarSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.Bar(); end;
  inherited Create(nil,h);
end;

{ TLineSeries }

constructor TLineSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.Line(); end;
  inherited Create(nil,h);
end;

{ TAreaSeries }

constructor TAreaSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.Area(); end;
  inherited Create(nil,h);
end;

{ TPointXYSeries }

constructor TPointXYSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.PointXY(); end;
  inherited Create(nil,h);
end;

{ THorizBarSeries }

constructor THorizBarSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.HorizBar(); end;
  inherited Create(nil,h);
end;

{ THorizAreaSeries }

constructor THorizAreaSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.HorizArea(); end;
  inherited Create(nil,h);
end;

{ TDonutSeries }

constructor TDonutSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.Donut(); end;
  inherited Create(nil,h);
end;

function TDonutSeries.getHole: Float;
begin
  asm @Result = (@FHandle).donut; end;
end;

procedure TDonutSeries.setHole(const Value: Float);
begin
  if Hole <> Value then
  begin
    asm (@Self.FHandle).donut=@Value; end;
    Repaint;
  end;
end;

{ TBubbleSeries }

constructor TBubbleSeries.Create;
var 
  h: THandle;
begin
  asm @h = new Tee.Bubble(); end;
  inherited Create(nil, h);
end;

{ TCandleSeries }

constructor TCandleSeries.Create;
var h : THandle;
begin
  asm @h = new Tee.Candle(); end;
  inherited Create(nil,h);
end;

{ TSmoothLineSeries }

constructor TSmoothLineSeries.Create;
begin
  inherited Create;
  asm (@FHandle).smooth=0.5; end;
end;

{ TBase }

constructor TBase.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).format; end;
  FFormat := TFormat.Create(AControl,h);
end;

{ THandleVisible }

function THandleVisible.getVisible: Boolean;
begin
  asm @Result = (@Self.FHandle).visible; end;
end;

procedure THandleVisible.setVisible(Value: Boolean);
begin
  if getVisible <> Value then
  begin
    asm (@Self.FHandle).visible=@Value; end;
    Repaint;
  end;
end;

{ TPanel }

constructor TPanel.Create(AChart: TW3Chart; const AHandle: THandle);
var p : THandle;
begin
  inherited Create(AChart, AHandle);

  asm @p=(@FHandle).margins; end;
  FMargins := TMargins.Create(AChart,p);
end;

function TPanel.getTransparent: Boolean;
begin
  asm @Result = (@FHandle).transparent; end;
end;

procedure TPanel.setTransparent(Value: Boolean);
begin
  if getTransparent<>Value then
  begin
    asm (@FHandle).transparent=@Value; end;
    Repaint;
  end;
end;

{ TAxes }

constructor TAxes.Create(AChart: TW3Chart; const AHandle: THandle);
var a : THandle;
begin
  inherited Create(AChart, AHandle);

  asm @a=(@FHandle).left; end;
  FLeft := TAxis.Create(AChart, a);

  asm @a=(@FHandle).top; end;
  FTop := TAxis.Create(AChart, a);

  asm @a=(@FHandle).right; end;
  FRight := TAxis.Create(AChart, a);

  asm @a=(@FHandle).bottom; end;
  FBottom := TAxis.Create(AChart, a);
end;

procedure TW3Chart.InitializeObject;
var 
  C, mRef, h : THandle;
begin
  inherited;

  Transparent := True;

  mRef := Handle;
  asm
    (@self.FChart) = new Tee.Chart(@mRef);
  end;

  FSeries := TSeriesList.Create(Self);
  FTools := TToolsList.Create(Self);

  asm @C=(@self.FChart); end;

  asm @h=(@C).legend; end;
  FLegend := TLegend.Create(Self,h);

  asm @h=(@C).title; end;
  FTitle := TTitle.Create(Self,h);

  asm @h=(@C).footer; end;
  FFooter := TTitle.Create(Self,h);

  asm @h=(@C).panel; end;
  FPanel := TPanel.Create(Self,h);

  asm @h=(@C).axes; end;
  FAxes := TAxes.Create(Self,h);

  asm @h=(@C).scroll; end;
  FScroll := TScroll.Create(Self,h);

  asm @h=(@C).zoom; end;
  FZoom := TZoom.Create(Self,h);

  asm @h=(@C).walls; end;
  FWalls := TWalls.Create(Self,h);
end;

function TW3Chart.getSeries(Index: Integer): TSeries;
begin
  Result := FSeries.Item[Index];
end;

function TW3Chart.AddSeries(ASeries: TSeries): TSeries;
begin
  if FSeries.FList.IndexOf(ASeries)=-1 then
  begin
    FSeries.FList.Add(ASeries);

    ASeries.Control := Self;
    ASeries.Marks.Control := Self;

    asm (@self.FChart).addSeries((@ASeries.FHandle)); end;
  end;

  Result := ASeries;
end;

procedure TW3Chart.RemoveSeries(ASeries: TSeries);
begin
  FSeries.FList.Remove(FSeries.FList.IndexOf(ASeries));

  asm (@self.FChart).removeSeries((@ASeries.FHandle)); end;

  Invalidate;
end;

function TW3Chart.AddTool(ATool: TTool): TTool;
begin
  if FTools.FList.IndexOf(ATool)=-1 then
  begin
    FTools.FList.Add(ATool);

    ATool.Control := Self;

    asm
      (@ATool.FHandle).setChart((@self.FChart));
      (@self.FChart).tools.add((@ATool.FHandle));
    end;
  end;

  Result := ATool;
end;

procedure TW3Chart.RemoveTool(ATool: TTool);
var tmp : Integer;
begin
  tmp := FTools.FList.IndexOf(ATool);
  FTools.FList.Remove(tmp);

  asm (@self.FChart).tools.items.splice((@tmp),1); end;

  Invalidate;
end;

procedure TW3Chart.Paint;
var h,w: Integer;
    C : THandle;
begin
  inherited Paint;

  h := Height;
  w := Width;

  if (h>0) and (w>0) then
  begin
    C := FChart;
    asm (@C).bounds.set(0,0,(@w),(@h)); end;

    FChart.draw();
  end;
end;

{ TGradient }

procedure TGradient.Refresh(AControl: TW3CustomControl);
var t : Integer;
    s : String;
begin
  asm (@Self.FHandle).colors = []; end;

  for t := 0 to Length(Colors)-1 do
  begin
    s := ColorToWebStr(Colors[t]);
    asm (@Self.FHandle).colors.push((@s)); end;
  end;

  AControl.Invalidate;
end;

function TGradient.getDirection: TGradientDirection;
var d : String;
begin
  asm @d=(@FHandle).direction; end;

  if d='topbottom' then Result := gdTopBottom else
  if d='bottomtop' then Result := gdBottomTop else
  if d='leftright' then Result := gdLeftRight else
  if d='rightleft' then Result := gdRightLeft else
  if d='radial' then Result := gdRadial else
  if d='diagonalup' then Result := gdDiagonalUp else
     Result := gdDiagonalDown;
end;

procedure TGradient.setDirection(const Value: TGradientDirection);
begin
  case Value of
   gdLeftRight : asm (@FHandle).direction="leftright"; end;
   gdTopBottom : asm (@FHandle).direction="topbottom"; end;
   gdRightLeft : asm (@FHandle).direction="rightleft"; end;
   gdBottomTop : asm (@FHandle).direction="bottomtop"; end;
   gdRadial    : asm (@FHandle).direction="radial"; end;
   gdDiagonalUp : asm (@FHandle).direction="diagonalup"; end;
  else
   // gdDiagonalDown
   asm (@FHandle).direction="diagonaldown"; end;
  end;
end;

{ TShadow }

function TShadow.getBlur: Float;
begin
  asm @Result=(@FHandle).blur; end;
end;

function TShadow.getColor: TColor;
var s : String;
begin
  asm (@s)=(@FHandle).color; end;
  Result := StrToColor(s);
end;

function TShadow.getHeight: Float;
begin
  asm @Result=(@FHandle).height; end;
end;

function TShadow.getWidth: Float;
begin
  asm @Result=(@FHandle).width; end;
end;

procedure TShadow.setBlur(const Value: Float);
begin
  if getBlur<>Value then
  begin
    asm (@FHandle).blur=@Value; end;
    Repaint;
  end;
end;

procedure TShadow.setColor(const Value: TColor);
var s : String;
begin
  if getColor<>Value then
  begin
    s := ColorToWebStr(Value);
    asm (@FHandle).color=(@s); end;
    Repaint;
  end;
end;

procedure TShadow.setHeight(const Value: Float);
begin
  if getHeight<>Value then
  begin
    asm (@FHandle).height=@Value; end;
    Repaint;
  end;
end;

procedure TShadow.setWidth(const Value: Float);
begin
  if getWidth<>Value then
  begin
    asm (@FHandle).width=@Value; end;
    Repaint;
  end;
end;

{ TPoint }

function TPoint.getX: Float;
begin
  asm @Result=(@FHandle).x; end;
end;

function TPoint.getY: Float;
begin
  asm @Result=(@FHandle).y; end;
end;

procedure TPoint.setX(const Value: Float);
begin
  asm (@FHandle).x=@Value; end;
end;

procedure TPoint.setY(const Value: Float);
begin
  asm (@FHandle).y=@Value; end;
end;

{ TAnnotation }

constructor TAnnotation.Create;
var 
  h : THandle;
begin
  asm @h = new Tee.Annotation(); end;
  inherited Create(nil,h);
end;

function TAnnotation.getMargins: TMargins;
begin
  asm @Result=(@FHandle).margins; end;
end;

function TAnnotation.getPosition: TPoint;
begin
  asm @Result=(@FHandle).position; end;
end;

procedure TAnnotation.setMargins(Value: TMargins);
begin
  asm
    (@FHandle).margins.left=@Value.getLeft;
    (@FHandle).margins.top=@Value.getTop;
    (@FHandle).margins.right=@Value.getRight;
    (@FHandle).margins.bottom=@Value.getBottom;
  end;

  Repaint;
end;

procedure TAnnotation.setPosition(Value: TPoint);
begin
  asm
    (@FHandle).position.x=@Value.x;
    (@FHandle).position.y=@Value.y;
  end;

  Repaint;
end;

{ TDragTool }

constructor TDragTool.Create;
var h : THandle;
begin
  asm @h = new Tee.DragTool(); end;
  inherited Create(nil,h);
end;

{ TCursorTool }

constructor TCursorTool.Create;
var h : THandle;
begin
  asm @h = new Tee.CursorTool(); end;
  inherited Create(nil,h);
end;

{ TToolTip }

constructor TToolTip.Create;
var h : THandle;
begin
  asm @h = new Tee.ToolTip(); end;
  inherited Create(nil,h);
end;

{ TAnimation }

constructor TAnimation.Create;
var h : THandle;
begin
  asm @h = new Tee.Animation(); end;
  inherited Create(nil,h);
end;


{ TFont }

constructor TFont.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).gradient; end;
  FGradient := TGradient.Create(AControl,h);

  asm @h=(@FHandle).shadow; end;
  FShadow := TShadow.Create(AControl,h);
end;

function TFont.getBold: Boolean;
begin
  Result := Pos('bold',LowerCase(getStyle))>0;
end;

function TFont.getColor: TColor;
var s : String;
begin
  asm (@s)=(@FHandle).fill; end;
  Result := StrToColor(s);
end;

function TFont.getItalic: Boolean;
begin
  Result := Pos('italic',LowerCase(getStyle))>0;
end;

function TFont.getSize: Float;
begin
  asm @Result=(@FHandle).getSize(); end;
end;

function TFont.getStyle: String;
begin
  asm @Result=(@FHandle).style; end;
end;

procedure TFont.setBold(const Value: Boolean);
begin
  if getBold<>Value then
  begin
     asm (@FHandle).style+=' bold'; end;
     Repaint;
  end;
end;

procedure TFont.setColor(const Value: TColor);
var s : String;
begin
  if getColor<>Value then
  begin
    s := ColorToWebStr(Value);
    asm (@FHandle).fill=(@s); end;
    Repaint;
  end;
end;

procedure TFont.setItalic(const Value: Boolean);
begin
  if getItalic<>Value then
  begin
     asm (@FHandle).style+=' italic'; end;
     Repaint;
  end;
end;

procedure TFont.setSize(const Value: Float);
begin
  if getSize<>Value then
  begin
    asm (@FHandle).setSize(@Value); end;
    Repaint;
  end;
end;

procedure TFont.setStyle(const Value: String);
begin
  if getStyle<>Value then
  begin
    asm (@FHandle).style=@Value; end;
    Repaint;
  end;
end;

{ TFormat }

constructor TFormat.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).font; end;
  FFont := TFont.Create(AControl,h);

  asm @h=(@FHandle).gradient; end;
  FGradient := TGradient.Create(AControl,h);

  asm @h=(@FHandle).shadow; end;
  FShadow := TShadow.Create(AControl,h);

  asm @h=(@FHandle).stroke; end;
  FStroke := TStroke.Create(AControl,h);
end;

function TFormat.getColor: TColor;
var s : String;
begin
  asm (@s)=(@FHandle).fill; end;
  Result := StrToColor(s);
end;

function TFormat.getRoundX: Float;
begin
  asm @Result=(@FHandle).round.x; end;
end;

function TFormat.getRoundY: Float;
begin
  asm @Result=(@FHandle).round.y; end;
end;

function TFormat.getTransparency: Float;
begin
  asm @Result=(@FHandle).transparency; end;
end;

{ TSeries }

function TSeries.getTitle: String;
begin
  asm @Result=(@FHandle).title; end;
end;

procedure TSeries.setTitle(const Value: String);
begin
  if getTitle<>Value then
  begin
    asm (@FHandle).title=@Value; end;
    Repaint;
  end;
end;

procedure TFormat.setColor(const Value: TColor);
var s : String;
begin
  if getColor<>Value then
  begin
    s := ColorToWebStr(Value);
    asm (@FHandle).fill=(@s); end;
    Repaint;
  end;
end;

procedure TFormat.setRoundX(const Value: Float);
begin
  if getRoundX<>Value then
  begin
    asm (@FHandle).round.x=@Value; end;
    Repaint;
  end;
end;

procedure TFormat.setRoundY(const Value: Float);
begin
  if getRoundY<>Value then
  begin
    asm (@FHandle).round.y=@Value; end;
    Repaint;
  end;
end;

procedure TFormat.setTransparency(const Value: Float);
begin
  if getTransparency<>Value then
  begin
    asm (@FHandle).transparency=@Value; end;
    Repaint;
  end;
end;

{ TLegendSymbol }

function TLegendSymbol.getHeight: Float;
begin
  asm @Result=(@FHandle).height; end;
end;

function TLegendSymbol.getWidth: Float;
begin
  asm @Result=(@FHandle).width; end;
end;

procedure TLegendSymbol.setHeight(const Value: Float);
begin
  asm (@FHandle).height=@Value; end;
end;

procedure TLegendSymbol.setWidth(const Value: Float);
begin
  asm (@FHandle).width=@Value; end;
end;

{ TLegend }

constructor TLegend.Create(AChart: TW3Chart; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AChart, AHandle);

  asm @h=(@FHandle).dividing; end;
  FDividing := TStroke.Create(AChart,h);

  asm @h=(@FHandle).symbol; end;
  FSymbol := TLegendSymbol.Create(AChart,h);
end;

function TLegend.getInverted: Boolean;
begin
  asm @Result=(@FHandle).inverted; end;
end;

function TLegend.getLegendStyle: TLegendStyle;
var s : String;
begin
  asm @s=(@FHandle).legendStyle; end;

  if s='auto' then Result := lsAuto else
  if s='series' then Result := lsSeries else
     Result := lsValues;
end;

function TLegend.getPadding: Float;
begin
  asm @Result=(@FHandle).padding; end;
end;

function TLegend.getPosition: TLegendPosition;
var s : String;
begin
  asm @s=(@FHandle).position; end;

  if s='top' then Result := lpTop else
  if s='right' then Result := lpRight else
  if s='left' then Result := lpLeft else
  if s='bottom' then Result := lpBottom else
     Result := lpCustom;
end;

function TLegend.getTextStyle: TLegendTextStyle;
var s : String;
begin
  asm @s=(@FHandle).textStyle; end;

  if s='auto' then Result := tsAuto else
  if s='valuelabel' then Result := tsValueLabel else
  if s='label' then Result := tsLabel else
  if s='value' then Result := tsValue else
  if s='percent' then Result := tsPercent else
  if s='index' then Result := tsIndex else
  if s='labelvalue' then Result := tsLabelValue else
     Result := tsPercentLabel
end;

function TLegend.getTitle: String;
begin
  asm @Result=(@FHandle).title; end;
end;

procedure TLegend.setInverted(const Value: Boolean);
begin
  asm (@FHandle).inverted=@Value; end;
end;

procedure TLegend.setLegendStyle(const Value: TLegendStyle);
begin
  case Value of
    lsAuto: asm (@FHandle).legendStyle="auto"; end;
    lsSeries: asm (@FHandle).legendStyle="series"; end;
  else
    asm (@FHandle).legendStyle="values"; end;
  end;
end;

procedure TLegend.setPadding(const Value: Float);
begin
  asm (@FHandle).padding=@Value; end;
end;

procedure TLegend.setPosition(const Value: TLegendPosition);
begin
  case Value of
    lpLeft: asm (@FHandle).position="left"; end;
    lpTop: asm (@FHandle).position="top"; end;
    lpRight: asm (@FHandle).position="right"; end;
    lpBottom: asm (@FHandle).position="bottom"; end;
  else
    asm (@FHandle).position="custom"; end;
  end;
end;

procedure TLegend.setTextStyle(const Value: TLegendTextStyle);
begin
  case Value of
    tsAuto: asm (@FHandle).textStyle="auto"; end;
    tsIndex: asm (@FHandle).textStyle="index"; end;
    tsLabel: asm (@FHandle).textStyle="label"; end;
    tsLabelValue: asm (@FHandle).textStyle="labelvalue"; end;
    tsPercent: asm (@FHandle).textStyle="percent"; end;
    tsPercentLabel: asm (@FHandle).textStyle="percentlabel"; end;
    tsValue: asm (@FHandle).textStyle="value"; end;
  else
    asm (@FHandle).textStyle="valuelabel"; end;
  end;
end;

procedure TLegend.setTitle(const Value: String);
begin
  asm (@FHandle).title=@Value; end;
end;

{ TAxis }

constructor TAxis.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).grid; end;
  FGrid := TAxisGrid.Create(AControl,h);

  asm @h=(@FHandle).ticks; end;
  FTicks := TTicks.Create(AControl,h);

  asm @h=(@FHandle).labels; end;
  FLabels := TAxisLabels.Create(AControl,h);

  asm @h=(@FHandle).title; end;
  FTitle := TAxisTitle.Create(AControl,h);

  asm @h=(@FHandle).innerTicks; end;
  FInnerTicks := TTicks.Create(AControl,h);

  asm @h=(@FHandle).minorTicks; end;
  FMinorTicks := TTicks.Create(AControl,h);
end;

function TAxis.getAutomatic: Boolean;
begin
  asm @Result=(@FHandle).automatic; end;
end;

function TAxis.getIncrement: Float;
begin
  asm @Result=(@FHandle).increment; end;
end;

function TAxis.getInverted: Boolean;
begin
  asm @Result=(@FHandle).inverted; end;
end;

function TAxis.getMaximum: Float;
begin
  asm @Result=(@FHandle).maximum; end;
end;

function TAxis.getMinimum: Float;
begin
  asm @Result=(@FHandle).minimum; end;
end;

function TAxis.getPosition: Float;
begin
  asm @Result=(@FHandle).position; end;
end;

procedure TAxis.setAutomatic(const Value: Boolean);
begin
  asm (@FHandle).automatic=@Value; end;
end;

procedure TAxis.setIncrement(const Value: Float);
begin
  asm (@FHandle).increment=@Value; end;
end;

procedure TAxis.setInverted(const Value: Boolean);
begin
  asm (@FHandle).inverted=@Value; end;
end;

procedure TAxis.setMaximum(const Value: Float);
begin
  asm (@FHandle).maximum=@Value; end;
end;

procedure TAxis.setMinimum(const Value: Float);
begin
  asm (@FHandle).minimum=@Value; end;
end;

procedure TAxis.setPosition(const Value: Float);
begin
  asm (@FHandle).position=@Value; end;
end;

{ TTicks }

function TTicks.getLength: Float;
begin
  asm @Result=(@FHandle).length; end;
end;

procedure TTicks.setLength(const Value: Float);
begin
  asm (@FHandle).length=@Value; end;
end;

{ TMargins }

function TMargins.getBottom: Float;
begin
  asm @Result=(@FHandle).bottom; end;
end;

function TMargins.getLeft: Float;
begin
  asm @Result=(@FHandle).left; end;
end;

function TMargins.getRight: Float;
begin
  asm @Result=(@FHandle).right; end;
end;

function TMargins.getTop: Float;
begin
  asm @Result=(@FHandle).top; end;
end;

procedure TMargins.setBottom(const Value: Float);
begin
  asm (@FHandle).bottom=@Value; end;
end;

procedure TMargins.setLeft(const Value: Float);
begin
  asm (@FHandle).left=@Value; end;
end;

procedure TMargins.setRight(const Value: Float);
begin
  asm (@FHandle).right=@Value; end;
end;

procedure TMargins.setTop(const Value: Float);
begin
  asm (@FHandle).top=@Value; end;
end;

{ TAxisLabels }

function TAxisLabels.getAlternate: Boolean;
begin
  asm @Result=(@FHandle).alternate; end;
end;

function TAxisLabels.getDateFormat: String;
begin
  asm @Result=(@FHandle).dateFormat; end;
end;

function TAxisLabels.getDecimals: Integer;
begin
  asm @Result=(@FHandle).decimals; end;
end;

function TAxisLabels.getLabelStyle: TAxisLabelStyle;
var s : String;
begin
  asm @s=(@FHandle).labelStyle; end;

  if s='auto' then Result := alAuto else
  if s='none' then Result := alNone else
  if s='value' then Result := alValue else
  if s='mark' then Result := alMark else
  if s='text' then Result := alText else
     Result := alX; // "x"
end;

function TAxisLabels.getPadding: Float;
begin
  asm @Result=(@FHandle).padding; end;
end;

function TAxisLabels.getRotation: Float;
begin
  asm @Result=(@FHandle).rotation; end;
end;

function TAxisLabels.getSeparation: Float;
begin
  asm @Result=(@FHandle).separation; end;
end;

procedure TAxisLabels.setAlternate(const Value: Boolean);
begin
  asm (@FHandle).alternate=@Value; end;
end;

procedure TAxisLabels.setDateFormat(const Value: String);
begin
  asm (@FHandle).dateFormat=@Value; end;
end;

procedure TAxisLabels.setDecimals(const Value: Integer);
begin
  asm (@FHandle).decimals=@Value; end;
end;

procedure TAxisLabels.setLabelStyle(const Value: TAxisLabelStyle);
begin
  case Value of
    alAuto: asm (@FHandle).labelStyle="auto"; end;
    alMark: asm (@FHandle).labelStyle="mark"; end;
    alNone: asm (@FHandle).labelStyle="none"; end;
    alText: asm (@FHandle).labelStyle="text"; end;
    alValue: asm (@FHandle).labelStyle="value"; end;
  else
    asm (@FHandle).labelStyle="x"; end;
  end;
end;

procedure TAxisLabels.setPadding(const Value: Float);
begin
  asm (@FHandle).padding=@Value; end;
end;

procedure TAxisLabels.setRotation(const Value: Float);
begin
  asm (@FHandle).rotation=@Value; end;
end;

procedure TAxisLabels.setSeparation(const Value: Float);
begin
  asm (@FHandle).separation=@Value; end;
end;

{ TTextFormat }

constructor TTextFormat.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h=(@FHandle).margins; end;
  FMargins := TMargins.Create(AControl,h);
end;

function TTextFormat.getText: String;
begin
  asm @Result=(@FHandle).text; end;
end;

procedure TTextFormat.setText(const Value: String);
begin
  if getText <> Value then
  begin
    asm (@FHandle).text=@Value; end;
    Repaint;
  end;
end;

{ TScroll }

function TScroll.getDirection: TScrollDirection;
var s : String;
begin
  asm @s=(@FHandle).direction; end;

  if s='both' then Result := sdBoth else
  if s='horizontal' then Result := sdHorizontal else
     Result := sdVertical;
end;

procedure TScroll.setDirection(const Value: TScrollDirection);
begin

end;

{ TZoomScroll }

function TZoomScroll.getActive: Boolean;
begin
  asm @Result=(@FHandle).active; end;
end;

function TZoomScroll.getEnabled: Boolean;
begin
  asm @Result=(@FHandle).enabled; end;
end;

function TZoomScroll.getMouseButton: TMouseButton;
var m : Integer;
begin
  asm @m=(@FHandle).mouseButton; end;

  case m of
    0: Result := mbLeft;
    1: Result := mbMiddle;
  else
    Result := mbRight;
  end;
end;

procedure TZoomScroll.setEnabled(const Value: Boolean);
begin
  asm (@FHandle).enabled=@Value; end;
end;

procedure TZoomScroll.setMouseButton(const Value: TMouseButton);
begin
  case Value of
    mbLeft: asm (@FHandle).mouseButton=0; end;
    mbMiddle: asm (@FHandle).mouseButton=1; end;
  else
   asm (@FHandle).mouseButton=2; end;
  end;
end;

function TMarks.getDrawEvery: Integer;
begin
  asm @Result=(@FHandle).drawEvery; end;
end;

function TMarks.getTextStyle: TMarksStyle;
var s : String;
begin
  asm @s=(@FHandle).style; end;
  
  if s='auto' then Result := msAuto else
  if s='value' then Result := msValue else
  if s='percent' then Result := msPercent else
  if s='label' then Result := msLabel else
  if s='valuelabel' then Result := msValueLabel else
  if s='percentlabel' then Result := msPercentLabel else
  if s='index' then Result := msIndex else
  if s='labelvalue' then Result := msLabelValue else
     Result := msLabelPercent;
end;

procedure TMarks.setDrawEvery(const Value: Integer);
begin
  asm (@FHandle).drawEvery=@Value; end;
end;

procedure TMarks.setTextStyle(const Value: TMarksStyle);
begin
  case Value of
    msAuto: asm (@FHandle).style="auto"; end;
    msIndex: asm (@FHandle).style="index"; end;
    msLabel: asm (@FHandle).style="label"; end;
    msLabelPercent: asm (@FHandle).style="labelpercent"; end;
    msLabelValue: asm (@FHandle).style="labelvalue"; end;
    msPercent: asm (@FHandle).style="percent"; end;
    msPercentLabel: asm (@FHandle).style="percentlabel"; end;
    msValue: asm (@FHandle).style="value"; end;
  else
    asm (@FHandle).style="valuelabel"; end;
  end;
end;

function TStroke.getCap: TStrokeCap;
begin
  asm @Result=(@self).FHandle.cap; end;
end;

function TStroke.getJoin: TStrokeJoin;
begin
  asm @Result=(@self).FHandle.join; end;
end;

procedure TStroke.setCap(const Value: TStrokeCap);
begin
  case Value of
    scButt: asm (@FHandle).cap="butt"; end;
    scRound: asm (@FHandle).cap="round"; end;
  else
    asm (@FHandle).cap="square"; end;
  end;
end;

procedure TStroke.setJoin(const Value: TStrokeJoin);
begin
  case Value of
    sjBevel: asm (@FHandle).join="bevel"; end;
    sjMiter: asm (@FHandle).join="miter"; end;
  else
    asm (@FHandle).join="round"; end;
  end;
end;

{ THandleBase }

constructor THandleBase.Create(AControl: TW3CustomControl; const AHandle: THandle);
begin
  inherited Create;
  Control := AControl;
  FHandle := AHandle;
end;

{ TWalls }

constructor TWalls.Create(AChart: TW3Chart; const AHandle: THandle);
var w : THandle;
begin
  inherited Create(AChart, AHandle);

  asm @w=(@FHandle).left; end;
  FLeft := TWall.Create(AChart,w);

  asm @w=(@FHandle).back; end;
  FBack := TWall.Create(AChart,w);

  asm @w=(@FHandle).right; end;
  FRight := TWall.Create(AChart,w);

  asm @w=(@FHandle).bottom; end;
  FBottom := TWall.Create(AChart,w);
end;

procedure TW3Chart.FinalizeObject;
begin
  FTitle.Free;
  FFooter.Free;
  FPanel.Free;
  FTools.Free;
  FScroll.Free;
  FWalls.Free;
  FZoom.Free;
  FAxes.Free;
  FLegend.Free;
  FSeries.Free;

  inherited;
end;

procedure TCustomBarSeries.setUseOrigin(const Value: Boolean);
begin
  asm (@FHandle).useOrigin=@Value; end;
end;

{ THover }

function THover.getEnabled: Boolean;
begin
  asm @Result = (@FHandle).enabled; end;
end;

procedure THover.setEnabled(const Value: Boolean);
begin
  asm (@FHandle).enabled = @Value; end;
end;

{ TPieSeries }

constructor TPieSeries.Create(AControl: TW3CustomControl; const AHandle: THandle);
begin
  inherited Create(AControl, AHandle);
end;

constructor TPieSeries.Create;
var h : THandle;
begin
  asm
    @h = new Tee.Pie();
    (@h).marks.visible=false;
  end;

  inherited Create(nil,h);
end;

function TPieSeries.getOrderAscending: Boolean;
begin
  asm @Result = (@FHandle).orderAscending; end;
end;

function TPieSeries.getRotation: Float;
begin
  asm @Result = (@FHandle).rotation; end;
end;

function TPieSeries.getSort: TSeriesSort;
var s : String;
begin
  asm @s = (@FHandle).sort; end;

  if s='values' then Result := ssValues else
     Result := ssLabels;
end;

procedure TPieSeries.setOrderAscending(const Value: Boolean);
begin
  asm (@FHandle).orderAscending=@Value; end;
end;

procedure TPieSeries.setRotation(const Value: Float);
begin
  asm (@FHandle).rotation=@Value; end;
end;

procedure TPieSeries.setSort(const Value: TSeriesSort);
begin
  case Value of
    ssLabels: asm (@FHandle).sort='values'; end;
  else
    asm (@FHandle).sort='labels'; end;
  end;
end;

{ TSeriesPointer }

function TSeriesPointer.getColorEach: Boolean;
begin
  asm @Result = (@FHandle).colorEach; end;
end;

function TSeriesPointer.getHeight: Float;
begin
  asm @Result = (@FHandle).height; end;
end;

function TSeriesPointer.getStyle: TPointerStyle;
var s : String;
begin
  asm @s = (@FHandle).style; end;

  if s='rectangle' then Result := psRectangle else
  if s='ellipse' then Result := psEllipse else
  if s='triangle' then Result := psTriangle else
  if s='diamond' then Result := psDiamond else
  if s='downtriangle' then Result := psDownTriangle else
  if s='cross' then Result := psCross else
  if s='x' then Result := psX;
end;

function TSeriesPointer.getWidth: Float;
begin
  asm @Result = (@FHandle).width; end;
end;

procedure TSeriesPointer.setColorEach(const Value: Boolean);
begin
  asm (@FHandle).colorEach=@Value; end;
end;

procedure TSeriesPointer.setHeight(const Value: Float);
begin
  asm (@FHandle).height=@Value; end;
end;

procedure TSeriesPointer.setStyle(const Value: TPointerStyle);
begin
  case Value of
    psCross: asm (@FHandle).style="cross"; end;
    psDiamond: asm (@FHandle).style="diamond"; end;
    psDownTriangle: asm (@FHandle).style="downtriangle"; end;
    psEllipse: asm (@FHandle).style="ellipse"; end;
    psRectangle: asm (@FHandle).style="rectangle"; end;
    psTriangle: asm (@FHandle).style="triangle"; end;
  else
    asm (@FHandle).style="x"; end;
  end;
end;

procedure TSeriesPointer.setWidth(const Value: Float);
begin
  asm (@FHandle).width=@Value; end;
end;

{ TCustomSeries }

constructor TCustomSeries.Create(AControl: TW3CustomControl; const AHandle: THandle);
var h : THandle;
begin
  inherited Create(AControl, AHandle);

  asm @h = (@FHandle).pointer; end;
  FPointer := TSeriesPointer.Create(AControl, h);
end;

function TCustomSeries.getCustomStacked: TCustomStacked;
var s : String;
begin
  asm @s = (@FHandle).stacked; end;

  if s='yes' then Result := csYes else
  if s='no' then Result := csNo else Result := cs100;
end;

function TCustomSeries.getOrigin: Float;
begin
  asm @Result = (@FHandle).origin; end;
end;

function TCustomSeries.getSmooth: Float;
begin
  asm @Result = (@FHandle).smooth; end;
end;

function TCustomSeries.getStairs: Boolean;
begin
  asm @Result = (@FHandle).stairs; end;
end;

function TCustomSeries.getUseOrigin: Boolean;
begin
  asm @Result = (@FHandle).useOrigin; end;
end;

procedure TCustomSeries.setCustomStacked(const Value: TCustomStacked);
begin
  case Value of
    cs100: asm (@FHandle).stacked="100"; end;
    csNo: asm (@FHandle).stacked="no"; end;
  else
    asm (@FHandle).stacked="yes"; end;
  end;
end;

procedure TCustomSeries.setOrigin(const Value: Float);
begin
  asm (@FHandle).origin=@Value; end;
end;

procedure TCustomSeries.setSmooth(const Value: Float);
begin
  asm (@FHandle).smooth=@Value; end;
end;

procedure TCustomSeries.setStairs(const Value: Boolean);
begin
  asm (@FHandle).stairs=@Value; end;
end;

procedure TCustomSeries.setUseOrigin(const Value: Boolean);
begin
  asm (@FHandle).useOrigin=@Value; end;
end;

end.
