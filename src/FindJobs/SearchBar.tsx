import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState<[number, number]>([1, 100]);
  const dispatch = useDispatch();
  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };
  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            m="sm"
            radius="lg"
            variant="outline"
            autoContrast
            color="brightSun.4"
            className="align"
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
        <div className="lg-mx:!flex-wrap flex px-5 py-8">
          {dropdownData.map((item, index) => (
            <>
              <div
                key={index}
                className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%]"
              >
                <MultiInput {...item} />
              </div>
              <Divider
                className="sm-mx:hidden"
                mr="xs"
                size="xs"
                orientation="vertical"
              />
            </>
          ))}
          <div
            className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%]
      sm-mx:w-[48%]
       [&_.mantine-Slider-label]:!translate-y-10"
          >
            <div className="flex justify-between text-sm">
              <div>Salary</div>
              <div>
                {" "}
                &#8377;{value[0]} LPA -&#8377;{value[1]} LPA
              </div>
            </div>
            <RangeSlider
              onChangeEnd={handleChange}
              min={0}
              max={100}
              minRange={1}
              color="brightSun.5"
              size="xs"
              value={value}
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              onChange={setValue}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};
export default SearchBar;

function useSate<T>(arg0: number[]): [any, any] {
  throw new Error("Function not implemented.");
}
