import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
const PlacesAutoSuggestion = ({ value, onChange, onSelect, place }) => {
  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            style={{ outline: "none" }}
            {...getInputProps({
              placeholder: place,
            })}
          />
          <div className="suggestions">
            {loading ? <div>...loading </div> : null}
            {suggestions.map((suggestions) => {
              const style = suggestions.active
                ? {
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                  }
                : {
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestions, {
                    style,
                  })}
                >
                  {suggestions.description}{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlacesAutoSuggestion;
