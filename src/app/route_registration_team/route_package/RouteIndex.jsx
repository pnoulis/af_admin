import * as React from "react";
import styled from "styled-components";
import {
  Box,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";
import {
  useRegistrationContext,
  PACKAGE_SCHEMA,
} from "/src/app/route_registration_team";

const StyleRouteIndex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 50px;
`;

const StylePackagesList = styled.ul`
  width: 800px;
  background-color: green;
  height: 550px;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
`;

const StylePackagesListItem = styled.li``;

function PackagesTable() {
  const { state, dispatchRegistration } = useRegistrationContext();

  React.useEffect(() => {
    const newPkg = Math.random().toString(16).slice(2, 8);
    if (state.active.packages.length < 1) {
      dispatchRegistration({
        type: "set_packages",
        packages: [
          ...state.active.packages,
          {
            ...PACKAGE_SCHEMA,
            id: newPkg,
            name: `pkg_#${state.active.packages.length}`,
          },
        ],
      });
    }
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: "800px", height: "580px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>index</TableCell>
            <TableCell>pkg id</TableCell>
            <TableCell>type</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>price</TableCell>
            <TableCell>discount</TableCell>
            <TableCell>net price</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.active.packages.map((pkg, i) => (
            <TableRow key={pkg.id}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {pkg.id}
              </TableCell>
              <TableCell component="th" scope="row">
                "missions"
              </TableCell>
              <TableCell component="th" scope="row">
                "30 minutes"
              </TableCell>
              <TableCell component="th" scope="row">
                "30 euro"
              </TableCell>
              <TableCell component="th" scope="row">
                "10.35eur"
              </TableCell>
              <TableCell component="th" scope="row">
                "20 euro"
              </TableCell>
              <TableCell component="th" scope="row">
                "new"
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PackageItem() {
  return <StylePackagesListItem>list item</StylePackagesListItem>;
}

function RouteIndex() {
  return (
    <StyleRouteIndex>
      <PackagesTable />
    </StyleRouteIndex>
  );
}

const routeIndex = {
  path: "/registration/team/packages",
  element: <RouteIndex />,
};

const linkIndex = {
  path: "/registration/team/packages",
  label: "packages",
};

export { RouteIndex, routeIndex, linkIndex };
