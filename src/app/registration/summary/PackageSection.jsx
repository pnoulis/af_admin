import { Card_0 as Card } from '/src/components/cards';
import { Icon_0 as Icon } from '/src/components/icons';
import styled from 'styled-components';

import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";
import { ReactComponent as AddPlayerIcon } from "/assets/icons/add_player.svg";
import { ReactComponent as CreateTeamIcon } from "/assets/icons/merge_team.svg";
import { ReactComponent as addPackageIcon } from "/assets/icons/add_package.svg";

const RoundedIcon = styled(Icon)`
background-color: var(--grey-1);
border-radius: 50%;
`


function PackageSection() {
  return (
    <Card>
      <div>this is the package section</div>
      <RoundedIcon size="10"><DiscountIcon/></RoundedIcon>
      <RoundedIcon size="2"><AddPlayerIcon/></RoundedIcon>
      <RoundedIcon size="2"><CreateTeamIcon/></RoundedIcon>
      <RoundedIcon size="2"><addPackageIcon/></RoundedIcon>
    </Card>
  );
}

export default PackageSection;
