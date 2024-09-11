import { IScheme, ISchemeItem } from '@/components/eg-form/_props';
import { ITableColumn } from '@/components/eg-table/_props';
// import { IScheme, ISchemeItem } from 'vue3-semi-ai-engine/components/eg-form/_props';
// import { ITableColumn } from 'vue3-semi-ai-engine/components/eg-table/_props';

/** 查询模块的配置 */
export const QueryScheme: IScheme[] = [
  {
    items: [],
  },
];

/** 列表模块的配置 */
export const TableScheme: ITableColumn[] = [];

/** 表单配置1 */
export const _formBlock1: ISchemeItem[] = [];
/** 表单模块的配置, 支持数组, 因为表单可分块显示但注意仍是在一个el-form内 */
export const FormScheme: IScheme[] = [
  {
    items: _formBlock1,
  },
];

/** 表单的验证规则, 也可在表单的配置中定义 */
export const FormRules: Record<string, any[]> = {};
