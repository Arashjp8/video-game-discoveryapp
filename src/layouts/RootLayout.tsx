import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <>
      <Grid templateColumns={"repeat(6, 1fr)"} background={"blackAlpha.900"}>
        <GridItem
          as={"aside"}
          minHeight={{ lg: "100vh" }}
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          color={"white"}
          padding={{ base: "20px", lg: "30px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem
          as={"main"}
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          color={"white"}
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
