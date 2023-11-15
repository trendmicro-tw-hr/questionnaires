import { Navbar, NavbarBrand, NavbarContent, Image } from "@nextui-org/react";

export default function Header({ h1 = "What's Your DevOps Story?" }) {
  return (
    <Navbar className="flex max-md:px-3 navbar">
      <NavbarBrand className="flex-none max-w-[150px]">
        <div className="max-sm:w-[35px] max-sm:relative overflow-hidden logo-div">
          <Image
            width={150}
            alt="Trend Micro"
            src={process.env.PUBLIC_URL + "/logo.png"}
          />
        </div>
      </NavbarBrand>
      <NavbarContent
        className="grow justify-end md:justify-center"
        justify="none"
      >
        <h1 className="text-2xl max-md:text-base font-bold text-inherit">
          {h1}
        </h1>
      </NavbarContent>
    </Navbar>
  );
}
