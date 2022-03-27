import React from "react";
import {FormInputLabel, Input, Group} from "./form-input.styles.js";

function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}> {/* Instead of passinga className with a ternary, we just the length of the array... on the styled component definition, if the value is trudy (there's at least one character), it will apply shrink styles*/}
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInput;
