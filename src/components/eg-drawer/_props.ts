import { IDrawerFootButton } from '../ex-drawer/_props';

/**
 * 打开抽屉
 * @description 四个参数, 后二个可选
 * @param componentName 组件名
 * @param title 抽屉标题
 * @param componentOptions 自定义组件onOpen接收的参数
 * @param props el-drawer的原生组件属性
 *
 */
export type IOpenDrawer = (
  componentName: string,
  title: string,
  componentOptions?: Record<string, any>,
  props?: {
    drawerProps?: Record<string, any>;
    btns?: IDrawerFootButton[];
    width?: number;
  },
) => void;

export type IEgDrawer = {
  /** 打开抽屉, 四个参数 {@link IOpenDrawer} */
  openDrawer: IOpenDrawer;
  /** 关闭抽屉 */
  close: () => void;
  /** 更新底部按钮 */
  updateFooterBtns: (btns: any[]) => void;
  /** 获取底部按钮 */
  getFooterBtns: () => IDrawerFootButton[];
  /** 更新底部按钮状态, 即是否disabled, 通过事件名来搜索目标 */
  updateFootBtnStatus: (eventName: string, disabled: boolean) => void;
};
