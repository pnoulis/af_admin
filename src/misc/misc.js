function mapWristbandColorCode(wristbandColorCode) {
  switch (wristbandColorCode) {
    case 0:
      return "black";
    case 1:
      return "red";
    case 2:
      return "purple";
    case 3:
      return "green";
    case 4:
      return "yellow";
    case 5:
      return "blue";
    case 6:
      return "orange";
    default:
      throw new Error(`Unknown wristband color code:${wristbandColorCode}`);
  }
}

export { mapWristbandColorCode };
