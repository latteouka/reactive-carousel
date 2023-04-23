import { type NextPage } from "next";
import Image from "next/image";
import { persons } from "@/persons";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";

const Home: NextPage = () => {
  const [active, setActive] = useState(3);
  const wrapper = useRef<HTMLUListElement>(null);
  const timeId = useRef<number>(0);

  useEffect(() => {
    if (!wrapper.current) return;

    wrapper.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );

    timeId.current = window.setTimeout(() => {
      wrapper.current?.style.removeProperty("--transition");
    }, 900);

    return () => {
      clearTimeout(timeId.current);
    };
  }, [active]);
  return (
    <div className="w-[1200px] max-w-full">
      <ul
        className="group flex flex-col gap-3 p-4 md:h-[640px] md:flex-row md:gap-[1.42%] md:p-0"
        ref={wrapper}
      >
        {persons.map((person, index) => {
          return (
            <li
              key={person.name}
              onClick={() => setActive(index)}
              aria-current={active === index}
              className={cn(
                "relative w-full rounded-2xl",
                "md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:hover:w-[12%] md:[&[aria-current='true']]:w-[48%]",
                "before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:bg-white",
                "md:[transition:width_var(--transition,400ms_ease-in)]",
                "md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%]",
                "md:first:pointer-events-none md:last:pointer-events-none",
                "md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0"
              )}
            >
              <ImageCard
                title={person.title}
                name={person.name}
                img={person.img}
                isActive={active === index}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

const ImageCard = ({
  title,
  name,
  img,
  isActive,
}: {
  title: string;
  name: string;
  img: string;
  isActive: boolean;
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
      <Image
        src={img}
        alt={name}
        className={cn(
          "absolute right-0 top-1/2 h-auto w-24 max-w-none",
          "-translate-y-1/2 object-cover grayscale",
          "md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
        )}
        draggable="false"
        width={590}
        height={640}
      />
      <div
        className={cn(
          "left-8 top-8 w-[590px] p-4 md:absolute md:p-0 md:[transition:transform_1s,opacity_1s]",
          isActive
            ? "md:translate-x-0 md:opacity-100"
            : "md:translate-x-4 md:opacity-0"
        )}
      >
        <p className="text-sm uppercase text-purple-400 md:text-lg">{title}</p>
        <p className="text-lg font-bold md:text-4xl">{name}</p>
      </div>
    </div>
  );
};
