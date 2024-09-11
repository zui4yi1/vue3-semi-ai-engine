import { IDialogFootButton } from '../ex-dialog/_props';

export const defaultBtns: IDialogFootButton[] = [
  {
    name: '提交',
    event: 'submit',
    type: 'primary',
  },
  {
    name: '取消',
    event: 'cancel',
  },
];
