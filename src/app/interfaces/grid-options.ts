/**
 * Grid 屬性
 *
 * @export
 * @interface GridOptions
 */
export interface GridOptions {
  /**
   * 表頭
   *
   * @type {GridHeader[]}
   * @memberof GridOptions
   */
  headers: GridHeader[];

  /**
   * 資料 (與表頭對應)
   *
   * @type {any[]}
   * @memberof GridOptions
   */
  data: any[];

  /**
   * 排序欄位
   *
   * @type {string[]}
   * @memberof GridOptions
   */
  sortColumns?: string[];
}

/**
 * Grid 表頭
 *
 * @export
 * @interface GridHeader
 */
export interface GridHeader {
  /**
   * 欄位名稱
   *
   * @type {string}
   * @memberof GridHeader
   */
  fieldId: string;

  /**
   * 顯示文字
   *
   * @type {string}
   * @memberof GridHeader
   */
  displayText: string;
}
