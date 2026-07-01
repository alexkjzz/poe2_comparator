import React, { useState } from "react";
import { Input, Button, Icon } from "../atoms";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBox({
  onSearch,
  placeholder = "Search for an item...",
}: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit" size="md" variant="primary">
          <Icon name="search" size={18} />
        </Button>
      </div>
    </form>
  );
}
