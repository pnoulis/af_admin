import styled from "styled-components";

export const StyleMqttPage = styled.div`
  background-color: white;

  .menu {
    padding: 15px;
    background-color: transparent;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    a {
      display: block;
      padding: 10px;
      font-size: 1.2em;
    }

    a:hover {
      color: blue;
    }
    a.active {
      color: blue;
    }
  }

  hr {
    height: 2px;
    width: 100%;
    background-color: black;
    margin-bottom: 50px;
  }
`;
export const StyleTopicList = styled.ul`
  // background-color: green;
  display: flex;
  flex-flow: column nowrap;
  gap: 50px;
`;
export const StyleTopic = styled.li`
  background-color: white;
  border-radius: 25px;
  width: 800px;
  margin: auto;
  box-shadow: 0 0 0.2rem grey;
  padding: 30px 20px;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
`;
export const StyleHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  h1 {
    flex: 1;
    font-size: 1.5rem;
    text-align: center;
  }

  .topic-header-info {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }

  .pending-alert {
    width: 50px;
    height: 50px;
    background-color: ${({ pending }) => (pending ? "red" : "green")};
    border-radius: 50%;
  }
`;
export const StylePubSection = styled.section`
display: flex;
flex-flow: column nowrap;
gap: 20px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
margin-bottom: 15px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
margin-bottom: 15px;
  }

  .topic {
    padding: 3px 10px;
    background-color: #1e90ff;
    border-radius: 6px;
margin-bottom: 5px;
width: max-content;
  }

.publish-button {
width: 100%;
padding: 10px 0;
    background-color: #1e90ff;
border-radius: 6px;
text-align: center;
font-size: 1.5rem;
color: white;
text-transform: capitalize;
cursor: pointer;
}

}
`;
export const StyleSubSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 15px;
  }

  .topic {
    padding: 3px 10px;
    background-color: #1e90ff;
    border-radius: 6px;
    margin-bottom: 5px;
    width: max-content;
  }
`;
export const StyleSamplePayloadsList = styled.ul`
  li:not(:last-child) {
    margin-bottom: 20px;
  }
`;
export const CodeSectionStyle = styled.pre`
  all: revert;
  background-color: var(--grey-1);
  padding: 20px;
  border-radius: 6px;
`;

export const StyleLog = styled.ul`
  max-height: 500px;
  overflow: scroll;
  display: flex;
  flex-flow: column nowrap;
  gap: 40px;
  min-height: 100px;
  width: 100%;
  box-shadow: 0 0 0.2rem grey;
`;

export const StyleClientSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 100px;

  button {
    padding: 5px 10px;
    border-radius: 6px;
    border: 2px solid black;
    cursor: pointer;
  }

  .connection-status {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: grey;
  }
`;
