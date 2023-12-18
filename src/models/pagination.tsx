export interface PaginationParams {
    current_page?:number;
    per_page?:number;
    total_items?:number;
    total_pages?:number;
}

export interface PaginationComponentProps {
    params: any;
    itemsCountPerPage: number | undefined;
    totalItemsCount: number | undefined;
    pageRangeDisplayed: number | undefined;
    activePage: number | undefined;
    totalPages: number | undefined;
    hideDisabled?: boolean;
    hideNavigation?: boolean;
    onChange: (page: number) => void;
  }