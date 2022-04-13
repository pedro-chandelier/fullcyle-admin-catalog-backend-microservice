export type SearchProps<Filter = string> = {
  page?: number
  items_per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: Filter | null
}

export type SortDirection = 'asc' | 'desc'

export class SearchParams {
  protected _page: number
  protected _items_per_page: number = 15
  protected _sort: string | null
  protected _sort_dir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page
    this.items_per_page = props.items_per_page
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

  get items_per_page() {
    return this._items_per_page
  }

  private set items_per_page(value: number) {
    let _items_per_page = value === (true as any) ? this.items_per_page : +value

    if (isNaN(_items_per_page) || _items_per_page <= 0) {
      _items_per_page = 15
    }

    this._items_per_page = parseInt(`${_items_per_page}`)
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
