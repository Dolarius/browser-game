"use client";

import { FormEvent, useState } from "react";

type NicknameFormProps = {
  onSave: (nickname: string) => void;
};

export function NicknameForm({ onSave }: NicknameFormProps) {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = nickname.trim();

    if (!trimmed) {
      setMessage("Enter a nickname to continue.");
      return;
    }

    if (trimmed.length > 20) {
      setMessage("Use 20 characters or fewer.");
      return;
    }

    setMessage("");
    onSave(trimmed);
  }

  return (
    <form
      className="w-full max-w-sm rounded-lg border border-surface-border bg-surface p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="block text-sm font-semibold" htmlFor="nickname">
          Nickname
        </label>
        <input
          aria-describedby="nickname-feedback"
          autoComplete="nickname"
          className="h-12 w-full rounded-md border border-surface-border bg-tile-active px-3 text-base text-page-foreground shadow-inner"
          id="nickname"
          maxLength={40}
          name="nickname"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
        />
      </div>
      <p
        aria-live="polite"
        className="mt-3 min-h-6 text-sm text-danger"
        id="nickname-feedback"
      >
        {message}
      </p>
      <button
        className="game-control mt-3 h-12 w-full rounded-md bg-page-foreground px-4 text-sm font-bold uppercase tracking-wide text-page transition hover:opacity-90"
        type="submit"
      >
        Start
      </button>
    </form>
  );
}
