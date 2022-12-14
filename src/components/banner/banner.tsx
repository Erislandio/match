import ReactCountDown, {
  CountdownRendererFn,
  CountdownRenderProps,
} from "react-countdown";

export interface BannerProps {
  url: string;
  id: string;
  alt: string;
  date: string;
  slug: string
}

const CountItem = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl">{value}</span>
      <span className="text-base block mx-2">{value > 1 ? `${label}s` : label}</span>
    </div>
  );
};

const renderCountDown = (props: CountdownRenderProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <div className="absolute top-1/2 right-1/2 translate-x-1/2 text-white text-2xl flex flex-row justify-between">
      <CountItem value={days} label="Dia" />
      <CountItem value={hours} label="Hora" />
      <CountItem value={minutes} label="Minuto" />
      <CountItem value={seconds} label="Segundo" />
    </div>
  );
};

const formateDate = (date: string): Date => {
  const [year, month, day] = date.split("-");

  return new Date(`${month}/${day}/${year}`);
};

export default function Banner(props: BannerProps) {
  return (
    <div className="relative">
      <div className="absolute object-center z-50 right-1/2 bottom-4 translate-x-2/4 top-1/3">
        <h3
          style={{ fontFamily: "'Cookie', cursive" }}
          className="text-white text-5xl font-bold text-center w-full whitespace-nowrap"
        >
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
      <ReactCountDown
        renderer={renderCountDown}
        date={formateDate(props.date)}
      />
    </div>
  );
}
