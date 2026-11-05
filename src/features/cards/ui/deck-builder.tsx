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
    <div className="grid h-[400px] grid-cols-4 gap-(--s2) rounded-control bg-bg p-(--s2) cushion-field">
      <div className="flex min-w-0 flex-col items-center gap-(--s2) overflow-y-auto">
        {cards.slice(0, 13).map(([id, src], index) => (
          <DraggableImage id={id} key={index} src={src} />
        ))}
      </div>
      <div className="flex min-w-0 flex-col items-center gap-(--s2) overflow-y-auto">
        {cards.slice(13, 26).map(([id, src], index) => (
          <DraggableImage key={index} id={id} src={src} />
        ))}
      </div>
      <div className="flex min-w-0 flex-col items-center gap-(--s2) overflow-y-auto">
        {cards.slice(26, 39).map(([id, src], index) => (
          <DraggableImage key={index} id={id} src={src} />
        ))}
      </div>
      <div className="flex min-w-0 flex-col items-center gap-(--s2) overflow-y-auto">
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
      className="pixelated deck-item aspect-[5/7] h-auto w-full rounded-[10px] bg-surface object-contain p-1 cushion-field"
    />
  );
};

export default DeckBuilder;
