import React, { useState } from "react";
import axios from "axios";

type Props = {};

const Candidate = (props: Props) => {
  const [string, setString] = useState("button");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/findUser",
        {
          withCredentials: true,
        }
      );
      setString(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <p>{string}</p>
      <button onClick={fetchUser}>button</button>
    </div>
  );
};

export default Candidate;
