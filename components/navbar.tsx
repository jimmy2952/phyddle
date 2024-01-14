"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex w-screen justify-between px-16 py-3">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              Phyddle
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div className="flex">
          <NavigationMenuItem>
            <Link href="/upload" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Upload
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Log in
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signup" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sign up
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
