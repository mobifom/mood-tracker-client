import { MoodType } from './mood-type.enum';

export interface MoodScore {
  type: MoodType;
  score: number;
  label: string;
}