import Page from "./page";

export type BurgerMenuCategoryType = {
  category: 'unauth' | 'auth' | 'admin';
  pages: string[];
};

type Props = {
  onItemClick: () => void;
} & BurgerMenuCategoryType;

const Category: React.FC<Props> = ({ pages, category, onItemClick }) => {
  let Pages = pages.map((p) => <Page page={p} onClick={onItemClick} key={p} />);

  return (
    <div className="grid gap-y-1 w-full pb-2.5 border-b border-white/60">
      {Pages}
    </div>
  );
};

export default Category;
