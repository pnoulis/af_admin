import styled from "styled-components";

const StyleLayoutFlashMessage = styled.div`
  padding: 10px 20px;
  min-width: 350px;
  width: max-content;
  margin: auto;
  border-radius: var(--border-radius-0);
  font-size: var(--text-md);
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  gap: 20px;
  box-shadow: 2px 8px 50px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);

  background-color: ${({ variant }) => {
    switch (variant) {
      case "info":
        return "var(--info)";
      case "success":
        return "var(--success - strong)";
      case "warning":
        return "var(--warn)";
      case "error":
        return "var(--error-2)";
      default:
        return "black";
    }
  }};
`;

const StyleLayoutFmItemIcon = styled.section`
  flex: 0 0 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyleLayoutFmItemMessage = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyleLayoutFlashMessage,
  StyleLayoutFmItemIcon,
  StyleLayoutFmItemMessage,
};
