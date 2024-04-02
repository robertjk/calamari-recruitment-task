import { type Page } from "%store/specialistsSlice";

const PAGE_TITLES: { [page in Page]: string } = {
  all: "All specialists",
  favorites: "My specialists",
};

export { PAGE_TITLES };
