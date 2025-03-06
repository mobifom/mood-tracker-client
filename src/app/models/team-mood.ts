import { MoodType } from './mood-type.enum';

export interface TeamMood {
  overallMood: MoodType | null;
  comments: string[];
  
}