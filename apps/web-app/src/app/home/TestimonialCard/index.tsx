import { Avatar, AvatarImage } from "@components/ui/Avatar";

export const TestimonialCard = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center">
      <p className="text-center">
        {" "}
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum
        iusto ipsum numquam optio voluptatem quo, cum et in, repellat blanditiis
        explicabo! Magnam recusandae quos debitis ea dolor ipsa nihil?"
      </p>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://picsum.photos/40/40"></AvatarImage>
        </Avatar>
        <p>João Antônio</p>
      </div>
    </div>
  );
};
