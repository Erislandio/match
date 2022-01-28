export interface BannerProps {
  url: string;
  id: string;
  alt: string;
}

export default function Banner(props: BannerProps) {
  return (
    <div className="relative">
      <div className="absolute object-center z-50 right-1/2 bottom-4 translate-x-2/4">
        <h3 style={{fontFamily: "'Cookie', cursive"}}
          className="text-white text-5xl font-bold text-center w-full whitespace-nowrap">
          {props.alt}
        </h3>
      </div>
      <div className="w-100 opacity-90">
        <img
          id={props.id}
          src={props.url}
          alt={props.alt}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
