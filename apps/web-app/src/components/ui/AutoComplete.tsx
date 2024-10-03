import { cx } from "styles/styles";
import { Command as CommandPrimitive } from "cmdk";
import { Check, Loader } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  onValueChange?: (value: Option) => void;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  isLoading,
  disabled,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);
      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={!options ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cx(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-md bg-white dark:bg-gray-900 outline-none shadow-xl shadow-black/[2.5%]",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList className="border rounded-md">
            {(isLoading || !options) && (
              <CommandPrimitive.Loading>
                <div className="flex items-center justify-center py-12">
                  <Loader className="animate-spin" />
                </div>
              </CommandPrimitive.Loading>
            )}

            {(!isLoading || (options && options.length > 0)) && (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cx("flex w-full items-center justify-between")}
                    >
                      {option.label}
                      {isSelected ? <Check className="w-4" /> : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {(!isLoading || !options.length) && (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
