export type Location = "home" | "work" | "school" | "outside";

export type Task = {
  id: string;
  name: string;
  minutes: number;
  locations: Location[];
};

export const LOCATIONS: { value: Location; label: string }[] = [
  { value: "work", label: "At Work" },
  { value: "school", label: "At School" },
  { value: "home", label: "At Home" },
  { value: "outside", label: "Outside" },
];

const ANYWHERE: Location[] = ["home", "work", "school", "outside"];

export const TASKS: Task[] = [
  { id: "breathe", name: "Take 5 slow, deep breaths", minutes: 2, locations: ANYWHERE },
  { id: "20-20-20", name: "Look at something 20 feet away for 20 seconds", minutes: 1, locations: ANYWHERE },
  { id: "water", name: "Drink a full glass of water, slowly", minutes: 3, locations: ANYWHERE },
  { id: "fresh-air", name: "Step outside for fresh air", minutes: 5, locations: ANYWHERE },
  { id: "walk", name: "Go for a short walk", minutes: 10, locations: ["home", "outside"] },
  { id: "stretch", name: "Stretch your neck, arms, and back", minutes: 5, locations: ANYWHERE },
  { id: "pushups", name: "Do 10 push-ups or squats", minutes: 3, locations: ["home", "work", "outside"] },
  { id: "shower", name: "Take a warm shower", minutes: 10, locations: ["home"] },
  { id: "cold-water", name: "Wash your face with cold water", minutes: 2, locations: ["home", "work", "school"] },
  { id: "tidy-desk", name: "Tidy one small area (desk, table, bag)", minutes: 8, locations: ["home", "work", "school"] },
  { id: "make-bed", name: "Make your bed", minutes: 5, locations: ["home"] },
  { id: "dishes", name: "Do the dishes", minutes: 12, locations: ["home"] },
  { id: "plants", name: "Water your plants", minutes: 5, locations: ["home"] },
  { id: "read", name: "Read a few pages of a book or article", minutes: 10, locations: ANYWHERE },
  { id: "read-chapter", name: "Read one full chapter of a book", minutes: 15, locations: ANYWHERE },
  { id: "read-poem", name: "Read a poem, twice", minutes: 3, locations: ANYWHERE },
  { id: "podcast", name: "Listen to a podcast or video segment", minutes: 10, locations: ANYWHERE },
  { id: "new-word", name: "Learn one new word and use it in a sentence", minutes: 3, locations: ANYWHERE },
  { id: "puzzle", name: "Solve a quick puzzle (crossword, sudoku, riddle)", minutes: 8, locations: ANYWHERE },
  { id: "look-up", name: "Look up something you've been curious about", minutes: 5, locations: ANYWHERE },
  { id: "brain-dump", name: "Write down 3 things on your mind", minutes: 8, locations: ANYWHERE },
  { id: "gratitude", name: "Write 3 things you're grateful for", minutes: 5, locations: ANYWHERE },
  { id: "plan", name: "Plan your next 3 tasks", minutes: 5, locations: ANYWHERE },
  { id: "song", name: "Listen to one full song, no multitasking", minutes: 4, locations: ANYWHERE },
  { id: "text-someone", name: "Text or call someone you like", minutes: 8, locations: ANYWHERE },
  { id: "meditate", name: "Meditate quietly", minutes: 5, locations: ANYWHERE },
  { id: "declutter-phone", name: "Declutter your phone home screen", minutes: 5, locations: ANYWHERE },
  { id: "doodle", name: "Doodle or sketch something", minutes: 8, locations: ANYWHERE },
  { id: "stairs", name: "Take the stairs a few times", minutes: 5, locations: ["work", "school", "outside"] },
  { id: "organize-drawer", name: "Organize one drawer or shelf", minutes: 10, locations: ["home"] },
  { id: "journal", name: "Journal for a few minutes", minutes: 8, locations: ANYWHERE },
  { id: "yoga", name: "Do a quick standing stretch or yoga set", minutes: 6, locations: ["home", "work", "outside"] },
  { id: "clean-glasses", name: "Clean your glasses or screen", minutes: 3, locations: ["home", "work", "school"] },
  { id: "change-scenery", name: "Change your seating or scenery for a bit", minutes: 5, locations: ANYWHERE },
  { id: "hum", name: "Hum or sing along to a song", minutes: 3, locations: ["home", "outside"] },
  { id: "cold-wrists", name: "Splash cold water on your wrists", minutes: 2, locations: ["home", "work", "school"] },
  { id: "call-family", name: "Call a family member", minutes: 10, locations: ANYWHERE },
  { id: "compliment", name: "Give someone a genuine compliment", minutes: 2, locations: ["work", "school", "outside"] },
  { id: "proud-of", name: "Write down one thing you're proud of", minutes: 3, locations: ANYWHERE },
  { id: "photos", name: "Take 3 photos of things that catch your eye", minutes: 5, locations: ANYWHERE },
  { id: "snack", name: "Prepare and enjoy a small snack", minutes: 10, locations: ["home"] },
  { id: "laundry", name: "Fold a load of laundry", minutes: 10, locations: ["home"] },
  { id: "sweep", name: "Sweep or vacuum a room", minutes: 10, locations: ["home"] },
  { id: "bag-tidy", name: "Tidy out your bag or backpack", minutes: 5, locations: ["home", "work", "school"] },
  { id: "instrument", name: "Practice a musical instrument", minutes: 10, locations: ["home"] },
  { id: "bookshelf", name: "Rearrange or dust your bookshelf", minutes: 10, locations: ["home"] },
  { id: "review-calendar", name: "Review tomorrow's calendar", minutes: 5, locations: ANYWHERE },
];

export function pickRandomTask(pool: Task[], excludeId?: string): Task {
  const candidates = pool.length > 1 && excludeId ? pool.filter((t) => t.id !== excludeId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
