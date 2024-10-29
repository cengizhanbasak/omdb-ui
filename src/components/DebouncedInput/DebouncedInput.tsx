import React, { useEffect, useRef, useState } from "react";

type DebouncedInputProps = {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    debounceTime?: number;
    placeholder?: string;
};

function DebouncedInput({
    className,
    value,
    debounceTime = 300,
    placeholder,
    onChange,
}: DebouncedInputProps) {
    const [internalValue, setInternalValue] = useState(value);
    const lastDebouncedValue = useRef(value);

    useEffect(() => {
        // Only update internalValue when the value prop changes
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            // Only call onChange if the debounced value has changed
            if (lastDebouncedValue.current !== internalValue) {
                onChange(internalValue);
                lastDebouncedValue.current = internalValue;
            }
        }, debounceTime);

        return () => clearTimeout(handler);
    }, [internalValue, debounceTime, onChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
    };

    return (
        <input
            type="text"
            className={className}
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default DebouncedInput;
