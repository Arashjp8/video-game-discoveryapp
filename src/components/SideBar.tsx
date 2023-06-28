import { List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <List fontSize={"1.4em"} spacing={4} margin={"20px"}>
      <ListItem>
        <NavLink to={"/"}>Home</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={"/reviews"}>Reviews</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={"/newreleases"}>New Releases</NavLink>
      </ListItem>
    </List>
  );
};

export default SideBar;
