import { School, BookAIcon, MenuIcon } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import DarkMode from "@/pages/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import DarkMode from "@/pages/DarkMode";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutuserMutation } from "@/feautures/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
const Navbar = () => {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutuser, { data, isSuccess: loggedIsSuccess }] =
    useLogoutuserMutation();

  const logutOutHandler = async () => {
    await logoutuser();
    navigate("/login");
  };

  useEffect(() => {
    if (loggedIsSuccess) {
      toast.success(data?.message || "Logged Out Successfully");
    }
  }, [loggedIsSuccess]); //changed is Success to loggedisSuccess to avoid conflict with other isSuccess

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b border-b-gray-300 dark:border-b-gray-800 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* for Desktop devices */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              Platfrom-Educate
            </h1>
          </Link>
        </div>
        {/* user icons and dark mode icons  */}
        <div className="flex items-center gap-8">
          {/* //drop down menu  */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="rounded-lg">
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learnings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logutOutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* for mobile phones design  */}
      <div className="flex md:hidden justify-between items-center h-full px-4">
        <h1 className="font-extrabold text-2xl">Platform-Educate</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
          variant="outline"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row flex-start items-center gap-8 mt-2">
          <SheetTitle className="font-extrabold text-2xl">
            Platform-Educate
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <DropdownMenuSeparator />
        <nav className="flex flex-col space-y-4 mx-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log Out</span>
        </nav>
        {role === "instructor" ? (
          <SheetFooter>
            <Button type="submit">Dashboard</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
