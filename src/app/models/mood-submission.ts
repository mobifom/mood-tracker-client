import { MoodType } from './mood-type.enum';

export interface MoodSubmission {
  mood: MoodType;
  comment?: string;
}