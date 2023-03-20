import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SentimentAnalysis = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    setMessage("");
    event.preventDefault();
    console.log("button pressed");
    console.log(input);
    handleText(input);
    setTimeout(getText, 10000);
  };

  async function getText() {
    const payload = {
      bucketName: "computestorage",
      objectKey: "userdata.txt",
    };
    const result = await fetch(
      "https://uccsbicei1.execute-api.us-east-1.amazonaws.com/dev/sentiment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "*",
        },
        body: JSON.stringify(payload),
      }
    );

    if (result.status === 200) {
      const data = await result.json();
      console.log(data.body);
      const message = JSON.parse(data.body);
      console.log(message.message);
      setMessage(message.message);
    } else {
      console.log("Error Uploading data");
    }
  }

  async function handleText(data) {
    const payload = {
      message: data,
    };
    const response = await fetch(
      "https://292r85szw0.execute-api.us-east-1.amazonaws.com/prod/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "*",
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.status === 200) {
      console.log("Data Uploaded");
    } else {
      console.log("Error Uploading data");
    }
  }
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1
          style={{ alignSelf: "center", position: "absolute", bottom: "69%" }}
        >
          Sentiment Analysis
        </h1>
        <Box
          style={{ position: "relative", alignSelf: "center", width: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ width: "60%" }}
              id="outlined-multiline-static"
              label="Text Area"
              multiline
              rows={10}
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
              onSubmit={handleSubmit}
              value={input}
              required
            />

            <Button
              style={{
                alignSelf: "center",
                position: "absolute",
                top: "107%",
                width: "30%",
                right: "35%",
                borderRadius: "5rem",
              }}
              type={"submit"}
              variant="contained"
            >
              Submit
            </Button>
            <div
              style={{
                position: "absolute",
                top: "140%",
                width: "30%",
                right: "35%",
                fontSize: "3rem",
                color: "blue",
              }}
              value={message}
            >
              {message}
            </div>
          </form>
        </Box>
      </div>
    </>
  );
};
