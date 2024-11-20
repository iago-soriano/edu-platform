"use client";

import { cx } from "styles/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { Input, InputProps } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Textarea, TextareaProps } from "./Textarea";
import { Label } from "./Label";
import { Switch } from "@components/ui/Switch";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@components/ui/RadioGroup";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cx("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    required?: boolean;
  }
>(({ className, required, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cx(
        { "text-destructive": error },
        { 'after:ml-0.5 after:text-destructive after:content-["*"]': required },
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cx("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cx("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormTextField = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    type?: string;
    disabled?: boolean;
    submitForm?: boolean;
    inputClassName?: string;
  }
>(
  (
    {
      name,
      label,
      placeholder,
      required,
      type,
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();
    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className={cx(className)}>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={placeholder}
                hasError={!!fieldState.error}
                inputClassName={cx(inputClassName)}
                type={type}
                {...field}
                ref={ref}
                {...props}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

const FormSelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  options,
  required,
  className,
  defaultValue,
  disabled,
}: {
  name: FieldPath<TFieldValues>;
  label?: string;
  options: { value: string; label: string; icon: any }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cx(className)}>
          {label && (
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={defaultValue}
              {...field}
            >
              <SelectTrigger
                id={name}
                hasError={!!fieldState.error}
                className="h-[38px]"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label, icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex gap-2 items-center">
                      <span>{icon}</span>
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormTextAreaField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  required,
  className,
  rows,
  textAreaClassName,
  ...props
}: {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  textAreaClassName?: string;
} & TextareaProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cx(className)}>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              hasError={!!fieldState.error}
              className={textAreaClassName}
              // rows={rows ?? 3}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormSwitchField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  // placeholder,
  // options,
  // required,
  // className,
  defaultChecked,
  labelOnTop,
  ...props
}: {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
} & { defaultChecked?: boolean; labelOnTop?: boolean }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl
            className={cx(
              "flex items-center justify-center gap-2",
              labelOnTop ? "flex-col" : "flex-row"
            )}
          >
            <Label htmlFor={name}>
              {label}
              <Switch
                id={name}
                defaultChecked={defaultChecked}
                size="small"
                checked={field.value}
                onCheckedChange={field.onChange}
                {...field}
                {...props}
              />
            </Label>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormRadioGroupField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  options,
  required,
  className,
  defaultValue,
  disabled,
  checkedIndex,
}: {
  name: FieldPath<TFieldValues>;
  label?: string;
  checkedIndex?: number;
  options: { value: string; label: string; isCorrect?: boolean }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();
  // console.log(options);
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cx(className)}>
          {label && (
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                if ((e.target as any).checked) field.onChange(e);
              }}
            >
              {options.map((opt, idx) => {
                const item = disabled ? (
                  <RadioGroupItem
                    checked={idx === checkedIndex}
                    value={opt.value}
                    id={opt.value}
                    disabled={true}
                  >
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                ) : (
                  <RadioGroupItem value={opt.value} id={opt.value}>
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                );
                return (
                  <div
                    className={cx(
                      "flex flex-row items-center gap-x-2 ml-2 p-1"
                    )}
                    key={idx}
                  >
                    {item}
                    <label htmlFor={opt.value}>{opt.label}</label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSelectField,
  FormTextAreaField,
  FormTextField,
  useFormField,
  FormSwitchField,
  FormRadioGroupField,
};
