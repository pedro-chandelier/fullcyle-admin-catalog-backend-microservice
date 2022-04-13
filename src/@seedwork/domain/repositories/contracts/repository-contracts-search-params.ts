export type SearchProps<Filter = string> = {
  page?: number
  page_size?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: Filter | null
}

export type SortDirection = 'asc' | 'desc'

export class SearchParams {
  protected _page: number
  protected _page_size: number = 15
  protected _sort: string | null
  protected _sort_dir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page
    this.page_size = props.page_size
    this.sort = props.sort
    this.sort_dir = props.sort_dir
    this.filter = props.filter
  }

  get page() {
    return this._page
  }

  private set page(value: number) {
    let _page = +value

    if (isNaN(_page) || _page <= 0) {
      _page = 1
    }

    this._page = parseInt(`${_page}`)
  }

  get page_size() {
    return this._page_size
  }

  private set page_size(value: number) {
    let _page_size = value === (true as any) ? this.page_size : +value

    if (isNaN(_page_size) || _page_size <= 0) {
      _page_size = 15
    }

    this._page_size = parseInt(`${_page_size}`)
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort = value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir
  }

  private set sort_dir(value: SortDirection | null) {
    if (!this._sort) {
      this._sort_dir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(value: string | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${value}`
  }
}
