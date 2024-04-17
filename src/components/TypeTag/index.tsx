export type PokemonType =
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "psychic"
  | "normal"
  | "dragon"
  | "ghost"
  | "dark"
  | "fairy"
  | "rock"
  | "ground"
  | "poison";

export const typeColorMap: Record<PokemonType, string> = {
  fire: "text-red-500 bg-red-100",
  water: "text-blue-500 bg-blue-100",
  electric: "text-yellow-500 bg-yellow-100",
  grass: "text-green-500 bg-green-100",
  psychic: "text-purple-500 bg-purple-100",
  normal: "text-gray-500 bg-gray-100",
  dragon: "text-indigo-500 bg-indigo-100",
  ghost: "text-purple-700 bg-purple-200",
  dark: "text-gray-800 bg-gray-200",
  fairy: "text-pink-500 bg-pink-100",
  poison: "text-purple-700 bg-purple-200",
  rock: "text-gray-500 bg-gray-100",
  ground: "text-yellow-500 bg-yellow-100",
};

interface TypeTagProps {
  type: PokemonType;
  className?: string;
}

export const isPokemonType = (
  type: string | PokemonType,
): type is PokemonType => {
  return Object.keys(typeColorMap).includes(type);
};

const TypeTag: React.FC<TypeTagProps> = ({ type, className }) => {
  const colorClasses = typeColorMap[type];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses} ${className}`}
    >
      {type}
    </span>
  );
};

export default TypeTag;
