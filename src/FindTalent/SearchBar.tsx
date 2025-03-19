import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");
  const handleChange = (name: any, event: any) => {
    if (name == "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
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
        <div className="flex lg-mx:!flex-wrap px-5 py-8 !text-mine-shaft-100 items-center">
          <div className="lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2 items-center">
              <IconUserCircle size={25} />
            </div>
            <Input
              defaultValue={name}
              onChange={(e) => handleChange("name", e)}
              className="[&_input]:placeholder-mine-shaft-100 font-semibold"
              variant="unstyled"
              size="s"
              placeholder="Talent Name"
            />
            <Divider
              className="sm-mx:hidden"
              mr="xs"
              size="xs"
              orientation="vertical"
            />
          </div>
          {searchFields.map((item, index) => (
            <React.Fragment key={index}>
              <div className="w-1/5">
                <MultiInput {...item} />
              </div>
              <Divider mr="xs" size="xs" orientation="vertical" />
            </React.Fragment>
          ))}
          <div
            className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%]
      sm-mx:w-[48%] [&_.mantine-Slider-label]:!translate-y-10"
          >
            <div className="flex justify-between text-sm">
              <div>Experience(Years)</div>
              <div>
                {" "}
                {value[0]} - {value[1]}
              </div>
            </div>
            <RangeSlider
              onChangeEnd={(e) => handleChange("exp", e)}
              min={0}
              max={50}
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
