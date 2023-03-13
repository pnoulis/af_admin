import * as React from "react";
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
import { ButtonTextBasic } from "/src/components/buttons/index.js";
import styled from "styled-components";
import { SvgButton } from "/src/components/svgs";
import { ReactComponent as TrashIcon } from "/assets/icons/trash_1.svg";
import { ReactComponent as EditIcon } from "/assets/icons/edit_box_0.svg";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

const StyleToolbarActionButton = styled(ButtonTextBasic)`
  min-width: revert;
  height: 25px;
  padding: 0 10px;
  font-size: var(--text-sm);
  text-transform: lowercase;
  font-family: "Roboto";
`;

const StyleActiveToolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-right: 20px;
  gap: 15px;

  .nselected {
    margin-right: auto;
    font-family: NoirPro-Bold;
    font-size: var(--text-md);
    text-transform: uppercase;
    letter-spacing: 1px;
    word-spacing: 3px;
  }
`;

const StyleTooltipContent = styled(TooltipContent)`
  background-color: white;
  padding: 5px 8px;
  font-size: 1rem;
  box-shadow: var(--card-basic-shadow-2);
  border-radius: 4px;
  font-family: NoirPro-Light;
  letter-spacing: 2px;
`;

function RemoveTeam() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <StyleTrashSvgButton size="30px" color="white">
          <TrashIcon />
        </StyleTrashSvgButton>
      </TooltipTrigger>
      <StyleTooltipContent>remove teams</StyleTooltipContent>
    </Tooltip>
  );
}

function EditTeam() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <StyleTrashSvgButton size="30px" color="white">
          <EditIcon />
        </StyleTrashSvgButton>
        <StyleTooltipContent>edit team</StyleTooltipContent>
      </TooltipTrigger>
    </Tooltip>
  );
}

const StyleTrashSvgButton = styled(SvgButton)`
  background-color: var(--primary-strong);
`;

// const createData = (name, nplayers, npackages, status) => ({
//   name,
//   nplayers,
//   npackages,
//   status,
// });

// const rows = [
//   createData("team_name#1", 6, 1, "playing"),
//   createData("team_name#2", 6, 1, "playing"),
//   createData("team_name#3", 6, 1, "playing"),
//   createData("team_name#4", 6, 1, "playing"),
//   createData("team_name#5", 6, 1, "playing"),
//   createData("team_name#6", 6, 1, "playing"),
// ];

function TableTeamsToolbar({ numSelected }) {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      {numSelected > 0 ? (
        <StyleActiveToolbar>
          <div className="nselected">{numSelected} selected</div>
          <StyleToolbarActionButton>start</StyleToolbarActionButton>
          <StyleToolbarActionButton>stop</StyleToolbarActionButton>
          <EditTeam />
          <RemoveTeam />
        </StyleActiveToolbar>
      ) : (
        <div>Teams</div>
      )}
    </Toolbar>
  );
}

function TableTeamsHeaderRow({ numSelected, onSelectAllClick, rowCount }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell>name</TableCell>
        <TableCell># players</TableCell>
        <TableCell># packages</TableCell>
        <TableCell>status</TableCell>
      </TableRow>
    </TableHead>
  );
}

function TableTeams({ rows }) {
  const [selected, setSelected] = React.useState([]);

  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      // new item
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      // first item
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // last item
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      //  in the middle
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        border: "none",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "var(--panel-shadow-1)" }}>
        <TableTeamsToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{
              mb: 2,
            }}
          >
            <TableTeamsHeaderRow
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(e) => handleClick(e, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    aria-checked={isItemSelected}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      id={labelId}
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.nplayers}</TableCell>
                    <TableCell>{row.npackages}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export { TableTeams };
