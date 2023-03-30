import { useContext, useMemo } from "react";
import GameContext from "../context/GameContext";
import { NullableNumberType } from "../interfaces/interfaces";
import { getColumn, getIsSelectable } from "../utils";

interface CardComponentProps {
  value: NullableNumberType;
  index: number;
}

const CardComponent = ({ value, index }: CardComponentProps) => {

  const { gameState, setIndexValue } = useContext(GameContext);

  const isSelectable = useMemo(() => !value && getIsSelectable(index, gameState.selectableIndex), [gameState.selectableIndex]);

  const column = useMemo(() => getColumn(index, gameState.numbersList.length), [gameState.numbersList.length]);
  
  const handleSelect = () => {
    if (!isSelectable) return;
    setIndexValue(index);
  }

  return (
    <div 
      className={`card ${isSelectable ? 'card-selectable' : value ? 'card-value' : 'card-disabled'} ${column}`}
      onClick={handleSelect}
    >
      <span>{index + 1}</span>
      <p>{value || ''}</p>
    </div>
  );
}

export default CardComponent;
