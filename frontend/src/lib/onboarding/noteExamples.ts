// Copied from the Wisdom app (wisdom/app/constants/noteExamples.ts, v3). Keep in sync.
// Example notes for the "Say it in your own words" screen. Each feeling has its
// own six lines (no line is shared between feelings), first person, specific,
// labelled by the time of day the thought tends to arrive.
import type { NeedId, AgeId, StageId } from "./profile";
import { FEELING_LINES } from "./noteLines";

export type NoteExample = { tag: "Morning" | "Afternoon" | "Night"; text: string };

const M = "Morning", A = "Afternoon", N = "Night";
const set = (lines: string[]): NoteExample[] => lines.map((text, i) => ({ tag: [M, A, N][i % 3] as NoteExample["tag"], text }));

const BY_FEELING: Record<NeedId, NoteExample[]> = {
  // Restless: my mind won't settle
  quiet: set([
    "I check Slack before I've even sat up in bed.",
    "I open five tabs, finish none, and the day is gone.",
    "I replay every conversation from the day before I can sleep.",
    "My mind is at work before my feet touch the floor.",
    "I pick up my phone to check one thing and lose an hour.",
    "It's 2 a.m. and I'm planning tomorrow, again.",
  ]),
  // Stuck: I keep going over something
  nerve: set([
    "I woke up thinking about what I said to my sister last month.",
    "In every meeting I'm still going over the review I got.",
    "I keep rewriting a message I sent three days ago.",
    "The decision to quit is the first thing on my mind every day.",
    "I can't stop asking why I was passed over.",
    "I lie awake running the same argument with my father.",
  ]),
  // Uneasy: something doesn't sit right
  replay: set([
    "Things are fine on paper. So why do I wake up like this?",
    "Dad's surgery is next week and I'm eight thousand miles away.",
    "My chest feels tight and I can't say why.",
    "Something about this new job doesn't feel right.",
    "My partner and I are fine, but something has gone quiet.",
    "Every late call from home makes my stomach drop.",
  ]),
  // Determined: I'm ready to stick with it
  stick: set([
    "I want to wake at six and actually get up.",
    "This time I'm finishing the course I started in March.",
    "I want to put the phone down by ten, for good.",
    "I start every Monday strong. I want it to last past Thursday.",
    "I want to stay patient with my kids when I'm tired.",
    "I want to write for ten minutes every night.",
  ]),
  // Searching: I'm looking for something deeper
  faith: set([
    "I pray every morning, but my mind is somewhere else.",
    "I've done everything I was supposed to, and it still feels empty.",
    "I used to feel close to Krishna. Lately I feel nothing.",
    "I want my day to start with something that matters.",
    "My mother is in hospital and all I can do is pray.",
    "I keep asking what all of this is for.",
  ]),
  // Curious: I want to read the Gita
  gita: set([
    "I've heard 2.47 quoted all my life. I want to read the rest.",
    "My grandfather read the Gita every morning. I want to know why.",
    "I tried reading it once and got lost by chapter two.",
    "I want to understand what Krishna actually told Arjuna.",
    "My kids ask me about the Gita and I don't have answers.",
    "I want one verse a night that I actually understand.",
  ]),
};

// When several life stages are picked, the most specific one speaks.
const STAGE_PRIORITY: StageId[] = ["caring_parents", "raising_kids", "own_thing", "studying", "retired", "working"];

/**
 * Six example notes: three written for this exact feeling × age × life stage
 * (morning, afternoon, night), then three of the feeling's general notes.
 */
export function noteExamplesFor(need?: NeedId, age?: AgeId, stages: StageId[] = []): NoteExample[] {
  const feeling = need ?? "quiet";
  const general = BY_FEELING[feeling] ?? BY_FEELING.quiet;
  const a = age ?? "35_44";
  let stage = STAGE_PRIORITY.find((s) => stages.includes(s)) ?? "working";
  if (stage === "retired" && (a === "u25" || a === "25_34")) stage = "working";
  const own = FEELING_LINES[feeling]?.[`${a}|${stage}`];
  if (!own) return general;
  return [...set([...own]), ...general.slice(0, 3)];
}
