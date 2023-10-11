import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast } from "components/toast";

import { FormStyled } from "./styles";

interface IForm {
  defaultValues?: {
    [key: string]: string;
  };
  children: any;
  onSubmit: (args: any) => any;
  schema: any;
  error?: any;
}
export function Form({
  defaultValues,
  children,
  onSubmit,
  schema,
  error,
}: IForm) {

  // useEffect(() => {
  //   if (error) reset();
  // }, [error]);

  const defaults = defaultValues || {};
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: defaults,
    resolver: yupResolver(schema),
  });

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit, () => errorToast("Favor inserir valores válidos"))}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                key: child.props.name,
                errors,
              },
            })
          : child;
      })}
    </FormStyled>
  );
}
