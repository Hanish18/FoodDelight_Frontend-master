import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, props) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["geocode"], componentRestrictions: { country: "aus" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, props)
  );
}

async function handlePlaceSelect(updateQuery, props) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
  props.setAddress(addressObject.formatted_address);
}

export default (props) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef, props)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a Address"
        defaultValue={props.existingAddress}
      />
    </div>
  );
};
