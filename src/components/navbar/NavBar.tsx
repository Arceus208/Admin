import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { ShopLogo } from "./ShopLogo";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Box>
      <MenuToggle toggle={toggle} isOpen={isOpen}></MenuToggle>
      <NavBarContainer isOpen={isOpen}>
        <ShopLogo></ShopLogo>

        <MenuLinks></MenuLinks>
      </NavBarContainer>
    </Box>
  );
};
