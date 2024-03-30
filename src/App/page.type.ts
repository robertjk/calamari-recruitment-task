type Page = "all" | "favorites";

const PAGE_TITLES: { [page in Page]: string } = {
  all: "All specialists",
  favorites: "My specialists",
};

export { type Page, PAGE_TITLES };
