import React from "react";
import getMessage from "../../hooks/getMessage";
import MessageBox from "./messageBox";

function MessageDialog() {
  const { data, error } = getMessage();

  return (
    <React.Fragment>
      {data.map((message, index) => (
        <MessageBox
          key={index}
          message={message.message}
          messageHint={message.hint}
        />
      ))}
    </React.Fragment>
  );
}

export default MessageDialog;
