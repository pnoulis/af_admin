import * as React from "react";
import styled from "styled-components";
import { Package } from "./Package";
import { AddPackage } from "./AddPackage";
import { useRegistrationContext } from "/src/app/route_registration_team";
import { NavLink } from "react-router-dom";

const StylePackagesList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // background-color: rgba(48, 25, 52);
  flex: 1;
  border-radius: var(--border-radius-1);
  box-shadow: var(--card-basic-shadow-2);
  padding: 10px;
`;

const StyleScrollableContent = styled.div`
  overflow-y: scroll;
  scrollbar-color: rgb(48, 25, 52) grey;
  scrollbar-gutter: stable both-edges;
  padding-right: 15px;
  display: flex;
  max-height: 550px;
  flex-flow: column nowrap;
  gap: 10px;
`;

const StyleScrollableContentItem = styled(NavLink)`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* Dimensions */
  flex: 0 0 65px;
  width: 100%;
  aspect-ratio: 3 / 1;
  // padding-left: 15%;
  padding: 0 15px 0 15px;
  gap: 10px;
  overflow: hidden;
  /* Position */
  position: relative;
  /* Fonts */

  font-size: var(--text-md);
  font-weight: bolder;
  text-transform: lowercase;
  letter-spacing: 2px;
  word-spacing: 1px;
  white-space: nowrap;

  color: var(--text-on-dark-basic);
  /* Effects */
  cursor: pointer;
  border-radius: var(--border-radius-0);
  background-color: rgba(48, 25, 52);

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 1;
    background: var(--primary-base);
  }

  &.active {
    background: var(--primary-base);
  }
  /* Children */
`;

const StyleStatus = styled.span`
  font-family: NoirPro-Medium;
  color: var(--secondary-strong);
  font-size: var(--text-sm);
  font-weight: bolder;
  line-height: 100%;
  text-transform: lowercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: auto;
`;

const StylePackagesListToolbar = styled.div`
  flex: 0 0 10%;
  background-color: red;
`;

function PackagesList({ className, ...props }) {
  const { state, dispatchRegistration } = useRegistrationContext();
  const pref = React.useRef(null);
  const ref = React.useRef(null);

  // React.useEffect(() => {
  //   if (state.active?.packages.length === 0) {
  //     dispatchRegistration({ type: "add_package" });
  //   }

  //   return () => dispatchRegistration({ type: "remove_package", name: "new" });
  // }, []);

  React.useEffect(() => {
    // console.log("mounting");
    // if (!ref.current) return;
    // console.log(ref.current.maxHeight);
    // console.log(pref.current.offsetHeight);
    // if (!ref.current.style.maxHeight) {
    //   ref.current.style.maxHeight = `${pref.current.offsetHeight - 20}px`;
    // }
  }, []);

  return (
    <StylePackagesList ref={pref} className={className} {...props}>
      <StyleScrollableContent ref={ref}>
        {state.active?.packages.map((afpackage, i) => (
          <StyleScrollableContentItem to={afpackage.id} key={afpackage.name}>
            {afpackage.name}
            <StyleStatus>new</StyleStatus>
          </StyleScrollableContentItem>
        ))}
      </StyleScrollableContent>
    </StylePackagesList>
  );
}

export { PackagesList };
