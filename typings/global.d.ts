/** 字典类 */
type IDict = {
  label: string;
  value: number | string;
}[];

/** 字典集 */
interface IDicts {
  [k: string]: IDict;
}

/** 字典树 */
interface IDictTree {
  id: string;
  label: string;
  value: number | string;
  children: IDictTree[];
}

type IMenu = Record<string, any>;
