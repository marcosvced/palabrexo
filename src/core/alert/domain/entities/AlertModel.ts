import { Serialize } from '~/src/core/common/domain/decorators/Serialize'
import type { AlertKind } from '~/src/core/alert/domain/entities/AlertKind'

export interface AlertModel {
  title: string
  body: string[]
  icon?: string
  kind: AlertKind
  elapsed?: number
}

type Listener = (alert: Alert) => void

@Serialize()
export class Alert implements AlertModel {
  body: string[]
  icon?: string
  kind: AlertKind
  title: string
  elapsed: number
  id?: string

  private _listener: Listener<any>

  constructor({
    body,
                    icon,
                    kind,
                    title,
                    elapsed,
  }: AlertModel) {
    this.body = body
    this.icon = icon
    this.kind = kind
    this.title = title
    this.elapsed = elapsed ?? 5000
    this.id = crypto?.randomUUID()
  }

  destroy() {
    setTimeout(() => {
      this._listener(this)
    }, this.elapsed)
  }

  subscribe(listener: Listener) {
    this._listener = listener
  }
}
