import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  const textColor = useColorModeValue("black", "white");

  return (
    <>
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <GridItem
          as={"aside"}
          minHeight={{ lg: "100vh" }}
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          color={textColor}
          padding={{ base: "20px", lg: "30px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem
          as={"main"}
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          color={textColor}
          padding={"40px"}
        >
          <NavBar />
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default RootLayout;
