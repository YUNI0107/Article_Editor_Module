import { IDropDownListItem } from '../types/layout'

export const filterControlList: Array<{ label: string; filterStyle: string }> = [
  { label: '無', filterStyle: '' },
  { label: '加亮', filterStyle: 'brightness-125' },
  { label: '加深', filterStyle: 'brightness-75' },
  { label: '黑白', filterStyle: 'grayscale' },
  { label: '模糊', filterStyle: 'blur-[2px]' },
  { label: '刷淡', filterStyle: 'opacity-70' },
]

export const fontSizeList: Array<IDropDownListItem> = [
  { value: 0, info: <p className="text-[24px] font-bold">大標題 - 24px</p> },
  { value: 1, info: <p className="text-[16px] font-bold">小標題 - 16px</p> },
  { value: 2, info: <p className="text-[12px]">內文 - 12px</p> },
  { value: 3, info: <p className="text-[10px]">附註 - 10px</p> },
]
