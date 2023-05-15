export interface ReserveType {
  months: number
  reserve: number
  axis: Axis
  labelHowMuchYouCanSurvive: string
}

export interface Label {
  start: number
  end: number
  label: string
  backgroundColor: string
  color: string
}

export interface Axis {
  recommendationReserve: Label
  excessCashReserve: Label
}
