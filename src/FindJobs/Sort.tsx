import { useEffect, useState } from "react";
import {
  Button,
  Combobox,
  useCombobox,
  Text,
  Box,
  ActionIcon,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSort } from "../Slices/SortSlice";

const Opt = [
  "Relevance",
  "Most Recent",
  "Salary(Low to High)",
  "Salary(High to Low)",
];

const talentSort = [
  "Relevance",
  "Experience(Low to High)",
  "Experience(High to Low)",
];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const sort = useSelector((state: any) => state.sort);

  useEffect(() => {
    console.log("Sort Updated:", sort);
  }, [sort]);

  const options =
    props.sort == "job"
      ? Opt.map((item) => (
          <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ))
      : talentSort.map((item) => (
          <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ));

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        dispatch(updateSort(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() => combobox.toggleDropdown()}
          className="cursor-pointer border border-bright-sun-400 flex items-center px-2 py-1 gap-2 text-sm rounded-xl"
        >
          {selectedItem}
          <ActionIcon
            color="brightSun.4"
            variant="transparent"
            aria-label="Settings"
          >
            <IconAdjustments className="text-bright-sun-400 w-5 h-5" />
          </ActionIcon>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
export default Sort;
