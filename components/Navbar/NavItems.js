import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Calendar, Settings, Info } from "react-feather";

const NavItems = ({ role }) => {
  let navigation = [];
  //console.log(role);
  switch (role) {
    case "Doctor": {
      console.log(role);
      navigation = [
        { name: "Patient Info", href: "/patient", icon: Info },
        // conditionally render krna hai acording to role above two
        { name: "Appointment", href: "/appointment", icon: Calendar },
        {
          name: "Edit Account",
          href: "/profile",
          icon: Settings,
        },
      ];
      break;
    }
    case "Patient": {
      console.log(role);
      navigation = [
        { name: "Doctor Info", href: "/doctor", icon: Info },
        // conditionally render krna hai acording to role above two
        { name: "Appointment", href: "/appointment", icon: Calendar },
        {
          name: "Edit Account",
          href: "/profile",
          icon: Settings,
        },
      ];
      break;
    }
  }
  const router = useRouter();

  return (
    <div className="w-full ">
      <ul className="lg:flex lg:flex-row flex flex-col lg:space-y-0 space-y-8 mt-12 lg:mt-0 justify-between lg:w-[50%] 2xl:w-[40%]">
        {navigation?.map((nav, index) => (
          <li key={index} className={``}>
            <Link
              className={`flex items-center font-semibold ${
                router.pathname.includes(nav.href)
                  ? "text-sky-600 lg:border-b lg:border-b-2 lg:border-sky-600"
                  : "text-gray-600"
              } hover:text-sky-500`}
              href={nav.href}
            >
              {nav.icon && <nav.icon className="mr-1 h-5 w-5" />}{" "}
              <span className="font-medium text-lg">{nav.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
