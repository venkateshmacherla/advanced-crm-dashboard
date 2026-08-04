/**
 * Small helpers for turning a person's name into a deterministic
 * "initials avatar" — same idea as the colored circle avatars shown
 * in the reference design (each customer gets a stable color based
 * on their name, not a random one on every render).
 */

// A palette of readable, distinct colors on a dark background.
// [background, text] pairs.
const AVATAR_PALETTE: Array<{ bg: string; text: string }> = [
  { bg: "bg-blue-500/20", text: "text-blue-400" },
  { bg: "bg-green-500/20", text: "text-green-400" },
  { bg: "bg-purple-500/20", text: "text-purple-400" },
  { bg: "bg-pink-500/20", text: "text-pink-400" },
  { bg: "bg-amber-500/20", text: "text-amber-400" },
  { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  { bg: "bg-rose-500/20", text: "text-rose-400" },
  { bg: "bg-indigo-500/20", text: "text-indigo-400" },
  { bg: "bg-teal-500/20", text: "text-teal-400" },
  { bg: "bg-orange-500/20", text: "text-orange-400" },
];

/**
 * Returns the first letter of the first and last "word" in a name.
 * "Alice Green" -> "AG", "Bob" -> "B"
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministically maps a string to one of the palette entries,
 * so the same customer always renders with the same avatar color.
 */
export function getAvatarColor(seed: string): { bg: string; text: string } {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_PALETTE.length;

  return AVATAR_PALETTE[index];
}
