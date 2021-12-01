import { OutcomeDescriptions } from "./OutcomeDescriptions";
import { OutDesc } from "./outDesc";
import { Suboutcome } from "./Suboutcome";
import { SuboutDesc } from "./suboutDesc";

export interface OutcomeDisplay {
    outcome: OutDesc,
    subs: SuboutDesc[]
}