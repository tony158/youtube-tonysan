import {InjectionToken} from '@angular/core'
import {saveAs} from 'file-saver';
import * as FileSaver from "file-saver";

export type Saver = (blob: Blob | null, filename?: string | undefined) => void

export const SAVER = new InjectionToken<Saver>('saver')

export function getSaver(): { (data: (Blob | string), filename?: string, options?: FileSaver.FileSaverOptions): void; (data: (Blob | string), filename?: string, disableAutoBOM?: boolean): void } {
  return saveAs;
}
