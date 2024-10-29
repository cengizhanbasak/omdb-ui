import React, { useState, useEffect } from "react";

type DebouncedInputProps = {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
  placeholder?: string;
};

function DebouncedInput({
    value,
    onChange,
    debounceTime = 300,
    placeholder = "Type here...",
}: DebouncedInputProps) {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(internalValue);
        }, debounceTime);

        // Clear timeout if input changes (during debounce delay)
        return () => clearTimeout(handler);
    }, [internalValue, debounceTime, onChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
    };

    return (
        <input
            type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default DebouncedInput;
