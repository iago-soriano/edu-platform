import { twMerge } from 'tailwind-merge';
export const Frame = (props) => {
  return (
    <div
      {...props}
      className={twMerge(
        'rounded-2xl bg-black bg-opacity-5 p-5',
        props.className,
      )}
    ></div>
  );
};
