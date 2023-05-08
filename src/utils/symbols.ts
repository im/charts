import { InjectionKey, Ref } from 'vue'
import { ChartObject } from '@/typings/chart'
export const ChartKey: InjectionKey<Ref<ChartObject>> = Symbol('CHART')