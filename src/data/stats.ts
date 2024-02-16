import { StatType, Stat } from '../types';

const wit: Stat = {
    type: StatType.Wit,
    counter: StatType.Charm,
    description: '',
}

const imagery: Stat = {
    type: StatType.Imagery,
    counter: StatType.Observation,
    description: '',
}

const insight: Stat = {
    type: StatType.Insight,
    counter: StatType.Imagery,
    description: '',
}

const observation: Stat = {
    type: StatType.Observation,
    counter: StatType.Insight,
    description: '',
}

const charm: Stat = {
    type: StatType.Charm,
    counter: StatType.Intuition,
    description: '',
}

const intuition: Stat = {
    type: StatType.Intuition,
    counter: StatType.Wit,
    description: '',
}

export const Stats: Record<StatType, Stat> = {
    charm,
    imagery,
    insight,
    intuition,
    observation,
    wit,
}