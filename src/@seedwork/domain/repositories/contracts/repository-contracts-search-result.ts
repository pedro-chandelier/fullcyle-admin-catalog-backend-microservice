import { Entity } from '../../entities/entity'

type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  current_page: number
  page_size: number
  sort: string | null
  sort_dir: string | null
  filter: Filter | null
}

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly current_page: number
  readonly page_size: number
  readonly last_page: number
  readonly sort: string | null
  readonly sort_dir: string | null
  readonly filter: Filter

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.current_page = props.current_page
    this.page_size = props.page_size
    this.last_page = Math.ceil(this.total / this.page_size)
    this.sort = props.sort
    this.sort_dir = props.sort_dir
    this.filter = props.filter
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      page_size: this.page_size,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter
    }
  }
}
