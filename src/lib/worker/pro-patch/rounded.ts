import type { Cuttleform } from '../config'
import type { Curve, Line, WallCriticalPoints } from '../geometry'
import type { Vector } from '../modeling/transformation'
import type Trsf from '../modeling/transformation'

export function wallBezier(_conf: Cuttleform, _a: Trsf, _b: Trsf, _c: Trsf, _d: Trsf, _wb: WallCriticalPoints, _wc: WallCriticalPoints, _worldZ: Vector, _bottomZ: number): [Trsf, Trsf, Trsf, Trsf] {
  throw new Error('Not implemented')
}

export function wallCurveRounded(_conf: Cuttleform, _a: Trsf, _b: Trsf, _c: Trsf, _d: Trsf, _wb: WallCriticalPoints, _wc: WallCriticalPoints, _worldZ: Vector, _bottomZ: number): Curve {
  throw new Error('Not implemented')
}

export function wallSurfacesOuterRoundedTop(_c: Cuttleform, _wall: WallCriticalPoints): Line[] {
  throw new Error('Not implemented')
}

export function wallSurfacesInnerRoundedTop(_c: Cuttleform, _wall: WallCriticalPoints): Line[] {
  throw new Error('Not implemented')
}
