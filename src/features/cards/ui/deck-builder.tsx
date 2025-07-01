import NextImage, { StaticImageData } from "next/image";
import { cardImages, smallCardImages } from "../utils/images";

const faceCardKeys = [
  "dj",
  "dq",
  "dk",
  "cj",
  "cq",
  "ck",
  "hj",
  "hq",
  "hk",
  "sj",
  "sq",
  "sk",
];

const cards = Object.entries(smallCardImages);

const faceCards = Object.entries(cardImages).filter((k, v) => {
  return faceCardKeys.includes(k[0]);
});

const DeckBuilder = () => {
  return (
    <div className="flex h-[400px] flex-row gap-2">
      <div className="flex w-full flex-col items-center gap-2 overflow-y-scroll">
        {cards.slice(0, 13).map(([id, src], index) => (
          <DraggableImage id={id} key={index} src={src} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-2 overflow-y-scroll">
        {cards.slice(13, 26).map(([id, src], index) => (
          <DraggableImage key={index} id={id} src={src} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-2 overflow-y-scroll">
        {cards.slice(26, 39).map(([id, src], index) => (
          <DraggableImage key={index} id={id} src={src} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-2 overflow-y-scroll">
        {cards.slice(39, 52).map(([id, src], index) => (
          <DraggableImage id={id} key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

// TODO: Check out animejs.createDraggable
const DraggableImage = ({ id, src }: { id: string; src: StaticImageData }) => {
  return (
    <NextImage
      id={id}
      src={src}
      alt={`Card ${id}`}
      width={100}
      height={100}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
      }}
      className="pixelated deck-item aspect-square h-auto w-full object-contain p-1"
    />
  );
};

export default DeckBuilder;
