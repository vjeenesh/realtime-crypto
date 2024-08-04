"use client";

import React, { useState } from "react";

interface ChangeSymbolModalProps {
  onChangeSymbol: (symbol: string) => void;
  onClose: () => void;
}

const ChangeSymbolModal: React.FC<ChangeSymbolModalProps> = ({
  onChangeSymbol,
  onClose,
}) => {
  const [newSymbol, setNewSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeSymbol(newSymbol);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Change Symbol</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
        </label>
        <button type="submit">Change</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ChangeSymbolModal;
