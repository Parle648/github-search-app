import { FC } from "react";
import RepoCard, { Repo } from "../../RepoCard";

interface Props extends Repo {
  id: number;
}

const CardsList: FC<{ cards: Props[] }> = ({ cards }) => {
  return (
    <div className="w-9/10 mx-auto flex items-center justify-between flex-wrap">
      {cards.length > 0
        ? cards.map((card) => <RepoCard key={card.id} repo={card} />)
        : "There is nothing for this request"}
    </div>
  );
};

export default CardsList;
