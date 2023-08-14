import Page from "./page";

export type PageRoute = {
  name: string,
  route: string,
}

export type BurgerMenuCategoryType = {
  group: 'unauth' | 'auth' | 'admin';
  pages: PageRoute[];
};

type Props = {
  onItemClick: () => void;
} & BurgerMenuCategoryType;

const Category: React.FC<Props> = ({ pages, onItemClick }) => {
  let Pages = pages.map((p) => <Page page={p} onClick={onItemClick} key={p.name} />);

  return (
    <div className="leading-6 grid gap-y-1 w-full pb-2.5 border-b border-gray-700">
      {Pages}
    </div>
  );
};

export default Category;
