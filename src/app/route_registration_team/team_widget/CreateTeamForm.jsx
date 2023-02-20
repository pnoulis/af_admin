import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { TextInput_1 } from '/src/components/textInputs';
import { ReactComponent as CreateTeam } from '/assets/icons/merge_team-cropped.svg';
import { SvgButton } from '/src/components/svgs';
import { Tooltip, TooltipTrigger, TooltipContent } from '/src/components/tooltips';
import { useMqtt } from '/src/mqtt';
import { FormStore } from "/src/stores";
import { useRegistrationContext } from "/src/app/route_registration_team";
import { FlashMessage } from '/src/flash_messages';

const TextInput = styled(TextInput_1)`
height: 50px;
font-size: var(--text-sm);
.input {
  border: none;
  background-color: var(--grey-2);
  border-radius: var(--border-radius-1);
}

`;

const StyleCreateTeamForm = styled.form`
  unset: all;
  display: flex;
  position: relative;
  flex-flow: row owrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 450px;
  gap: 15px;

  .input {
    border: ${({ error }) => error ? '4px solid var(--error)' : 'none'};
  }

  & > legend {
    display: none;
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

const animate = keyframes`
50% {
background-color: var(--grey-1);
}
`;
const animateSubmitting = css`
  background-color: var(--success);
  animation: ${animate} 1s infinite;
`;

const StyleSvgButton = styled(SvgButton)`
width: 55px;
height: 55px;
padding: 2px;

&:hover {
    cursor: ${({ disabled }) => (disabled ? "revert" : "pointer")};
    opacity: 0.7;
  }

  ${({ disabled }) => (disabled ? animateSubmitting : "")};
`

const StyleError = styled.p`
position: absolute;
width: 100%;
bottom: calc(-100%);
left: 0;
display: flex;
flex-flow: row nowrap;
justify-content: flex-start;
font-size: 1.1rem;
font-family: NoirPro-Light;
color: var(--error-2);
letter-spacing: 2px;
`;

function SubmitButton({ form, disabled, ...props }) {
  return (
    <Tooltip>
      <TooltipTrigger form={form}>
        <StyleSvgButton disabled={disabled}>
          <CreateTeam />
        </StyleSvgButton>
      </TooltipTrigger>
      <StyleTooltipContent>create team</StyleTooltipContent>
    </Tooltip>
  );
}

function CreateTeamForm() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      teamName: '',
    }
  });

  const { client } = useMqtt();
  const unsubscribe = React.useRef(null);

  React.useEffect(() => {
    if (!form.submitting) return;
    unsubscribe.current = client.publish('team/merge', {
      teamName: form.fields.teamName,
      usernames: state.active?.roster.map((player) => player.username),
    }, (err, res) => {
      if (err) {
        throw new Error("500 - Internal server error page");
      } else if (res.result === "NOK") {
        setForm("setError", 'Failed to merge team, team name already registered');
        setForm("setSubmit", false);
      } else {
        setForm("reset");
        dispatchRegistration({type: 'merge_team', ...form.fields});
        FlashMessage.info(`Successfully created team ${form.fields.teamName}`, {
          timeout: 5000,
        });
      }
    })

    return () => unsubscribe.current && unsubscribe.current();
  }, [form.submitting]);

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleCreateTeamForm
        id='createTeamForm'
        error={form.error}
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(form.fields).some((field) => !field)) return;
          setForm('setSubmit', true);
        }}
      >
        <legend>team name</legend>
        <TextInput
          disabled={form.submitting}
          name="teamName" autoComplete='off' placeholder='team name' />
        <SubmitButton form="createTeamForm" disabled={form.submitting} />
        <StyleError>{form.error}</StyleError>
      </StyleCreateTeamForm>
    </FormStore.Provide>
  );
}

export { CreateTeamForm };
