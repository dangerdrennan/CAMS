import { OutcomeDescriptions } from "./OutcomeDescriptions";
import { Suboutcome } from "./Suboutcome";

export interface NewRequirement {
    new_outcome: OutcomeDescriptions,
    new_subs: Suboutcome[]
}