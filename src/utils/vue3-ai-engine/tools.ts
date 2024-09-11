import { ElMessageBox } from 'element-plus';

/** 通用的确认对话框 */
export const ElConfirm = (text: string, title: string = '提示', options: any = {}) => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(text, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      ...options,
    })
      .then(() => {
        resolve(1);
      })
      .catch(() => {});
  });
};

export const ElAlert = (text: string, title: string = '提示', options: any = {}) => {
  return new Promise((resolve) => {
    ElMessageBox.alert(text, title, {
      confirmButtonText: '确定',
      type: '',
      ...options,
    })
      .then(() => {
        resolve(1);
      })
      .catch(() => {});
  });
};
