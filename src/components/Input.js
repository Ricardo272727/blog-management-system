import styled from "styled-components";
import theme from "../theme";
import _ from "lodash";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: ${theme.secondary};
  color: ${theme.text};
  padding: 0.5rem 0.25rem;
`;
const StyledLabel = styled.label`
  width: 100%;
  padding-bottom: 0.5rem;
  color: ${theme.text};
  text-align: left;
  display: inline-block;
`;
const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.7rem;
  background: ${theme.secondary};
  color: ${theme.text};
  border: none;
`;

const Input = ({ label, name, type, value, ...otherProps }) => {
  switch (type) {
    case "select":
      return (
        <Wrapper>
          <StyledLabel>{label}</StyledLabel>
          <StyledSelect
            name={name}
            value={value}
            onChange={otherProps.onChange}
          >
            {_.map(otherProps.items, (item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </StyledSelect>
        </Wrapper>
      );
    case "file":
      return (
        <Wrapper>
          <StyledLabel>{label}</StyledLabel>
          <StyledInput type={type} name={name} {...otherProps} />
        </Wrapper>
      );
    case "checkbox":
      return (
        <Wrapper>
          <StyledLabel>{label}</StyledLabel>
          <StyledInput
            type={type}
            name={name}
            value={value}
            {...otherProps}
            onChange={(event) => {
              event.target.value = event.target.checked;
              otherProps.onChange(event)
            }}
          />
        </Wrapper>
      );
  }
  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type} name={name} value={value} {...otherProps} />
    </Wrapper>
  );
};

export default Input;
