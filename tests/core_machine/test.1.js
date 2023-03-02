const data = {
  session: {
    id: "",
    name: "",
    permissions: "admin",
  },
  players: [],
  packages: [
    {
      name: "Per Time 5",
      amount: 5,
      type: "time",
      cost: 100,
    },
    {
      name: "Per Mission 5",
      amount: 5,
      type: "mission",
      cost: 100,
    },
  ],
  coupons: [],
  rooms: [],
  teams: [],
};

export function test1(coreMachine) {
  console.log("[TEST]:coreMachine");
  const afm = new coreMachine.AgentFactoryMachine(data);
  afm.init();

  const team = {
    name: "the_tigers",
  };
  afm.createTeam(team);
  afm.removeTeam(team);
}
