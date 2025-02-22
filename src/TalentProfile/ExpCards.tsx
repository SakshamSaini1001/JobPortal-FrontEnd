import { formatDate } from "../Services/Utilities";

const ExpCard = (props: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className=" h-10"
              src={`/Icons/${props.company}.png`}
              alt=" "
            />
          </div>
          <div>
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300 flex flex-col gap-1">
          <div>{formatDate(props.startDate)}</div>
          <div>{formatDate(props.endDate)}</div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
    </div>
  );
};
export default ExpCard;
